import 'dotenv/config'
import {deepseek} from "@llamaindex/deepseek";
import {agent} from "@llamaindex/workflow";
import {tool} from "llamaindex";
import {} from "@llamaindex/core/vector-store"

// 检查环境变量
if (!process.env.DEEPSEEK_API_KEY) {
  console.error("❌ DEEPSEEK_API_KEY 环境变量未设置！");
  console.log("请在 .env 文件中设置 DEEPSEEK_API_KEY");
  process.exit(1);
}

const sumNumbers = tool({
  name: "sumNumbers",
  description: "Sum two numbers",
  parameters: {
    type: "object",
    properties: {
      a: { type: "number", description: "The first number to sum" },
      b: { type: "number", description: "The second number to sum" }
    },
    required: ["a", "b"]
  } as any,
  execute: ({a, b}: {a: number, b: number}) => a + b,
});

const divideNumbers = tool({
    name: "divideNumbers",
    description: "Use this function to divide two numbers",
    parameters: {
      type: "object",
      properties: {
        a: { type: "number", description: "The dividend a to divide" },
        b: { type: "number", description: "The divisor b to divide by" }
      },
      required: ["a", "b"]
    } as any,
    execute: ({ a, b }: { a: number; b: number }) => `${a / b}`,
});

async function main() {
  console.log("🚀 启动 DeepSeek 数学代理...");
  
  const mathAgent = agent({
    tools: [sumNumbers, divideNumbers],
    llm: deepseek({ 
      model: "deepseek-chat",
      apiKey: process.env.DEEPSEEK_API_KEY 
    }),
    verbose: true, // 开启详细日志
  });

  console.log("🤖 询问: How much is 5 + 5? then divide by 2");
  const response = await mathAgent.run("How much is 5 + 5? then divide by 2");
  
  console.log("📝 回答:", response.data);
}

void main().catch((error) => {
  console.error("❌ 运行出错:", error.message);
  process.exit(1);
}).then(() => {
  console.log("✅ 完成");
});