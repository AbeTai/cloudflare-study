// Workers AI を使ったチャット API
//   GET  /      → ブラウザで試せるチャット画面（HTML）
//   POST /chat  → {"message": "..."} を送ると {"reply": "..."} が返る

const MODEL = "@cf/google/gemma-4-26b-a4b-it";

const SYSTEM_PROMPT = "あなたは親切なアシスタントです。日本語で簡潔に答えてください。";

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "POST" && url.pathname === "/chat") {
			const body = await request.json<{ message?: string }>().catch(() => ({ message: undefined }));
			if (!body.message) {
				return Response.json({ error: "message を指定してください" }, { status: 400 });
			}

			// env.AI は wrangler.jsonc の "ai" バインディングで使えるようになる
			const result: any = await env.AI.run(MODEL, {
				messages: [
					{ role: "system", content: SYSTEM_PROMPT },
					{ role: "user", content: body.message },
				],
			});

			// モデルによって返り値の形が違うので両方に対応する
			const reply = result.response ?? result.choices?.[0]?.message?.content ?? "";
			return Response.json({ reply });
		}

		if (request.method === "GET" && url.pathname === "/") {
			return new Response(HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
		}

		return new Response("Not Found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;

const HTML = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Workers AI チャット</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 640px; margin: 40px auto; padding: 0 16px; background: #fff; color: #222; }
  h1 { font-size: 20px; color: #f38020; }
  #log { border: 1px solid #ddd; border-radius: 8px; padding: 12px; min-height: 240px; white-space: pre-wrap; }
  .me { color: #555; margin: 8px 0; }
  .ai { margin: 8px 0 16px; }
  form { display: flex; gap: 8px; margin-top: 12px; }
  input { flex: 1; padding: 8px; font-size: 16px; }
  button { padding: 8px 16px; font-size: 16px; }
</style>
</head>
<body>
<h1>Workers AI チャット</h1>
<div id="log"></div>
<form id="f">
  <input id="q" placeholder="質問を入力" autocomplete="off">
  <button>送信</button>
</form>
<script>
  const log = document.getElementById("log");
  document.getElementById("f").addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = document.getElementById("q");
    const message = q.value.trim();
    if (!message) return;
    q.value = "";
    log.insertAdjacentHTML("beforeend", '<div class="me"></div><div class="ai">考え中…</div>');
    log.querySelectorAll(".me")[log.querySelectorAll(".me").length - 1].textContent = "あなた: " + message;
    const ai = log.querySelectorAll(".ai")[log.querySelectorAll(".ai").length - 1];
    const res = await fetch("/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message }) });
    const data = await res.json();
    ai.textContent = "AI: " + (data.reply ?? data.error);
  });
</script>
</body>
</html>`;
