import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({
		name: "Authless Calculator",
		version: "1.0.0",
	});

	server.registerTool(
		"add",
		{ inputSchema: z.object({ a: z.number(), b: z.number() }) },
		async ({ a, b }) => ({
			content: [{ type: "text", text: String(a + b) }],
		}),
	);

	server.registerTool(
		"calculate",
		{
			inputSchema: z.object({
				operation: z.enum(["add", "subtract", "multiply", "divide"]),
				a: z.number(),
				b: z.number(),
			}),
		},
		async ({ operation, a, b }) => {
			let result: number;
			switch (operation) {
				case "add":
					result = a + b;
					break;
				case "subtract":
					result = a - b;
					break;
				case "multiply":
					result = a * b;
					break;
				case "divide":
					if (b === 0)
						return {
							content: [
								{
									type: "text",
									text: "Error: Cannot divide by zero",
								},
							],
						};
					result = a / b;
					break;
			}
			return { content: [{ type: "text", text: String(result) }] };
		},
	);

	// ハンズオンで追加するツール: サイコロを振る
	server.registerTool(
		"roll_dice",
		{
			description: "サイコロを振って出た目を返す。sides で面の数、count で個数を指定できる",
			inputSchema: z.object({
				sides: z.number().int().min(2).default(6),
				count: z.number().int().min(1).max(10).default(1),
			}),
		},
		async ({ sides, count }) => {
			const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
			return {
				content: [{ type: "text", text: `出た目: ${rolls.join(", ")}（合計 ${rolls.reduce((a, b) => a + b, 0)}）` }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
