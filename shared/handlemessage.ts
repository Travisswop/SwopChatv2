import { handleUniswapCommand } from '../agents/uniswapAgent';
import { handleAaveCommand } from '../agents/aaveAgent';
import { handlePolymarketCommand } from '../agents/polymarketAgent';

export async function handleUserMessage(message: string, senderAddress: string) {
  const lower = message.toLowerCase();

  if (lower.includes('swap')) {
    return await handleUniswapCommand(message, senderAddress);
  }

  if (lower.includes('borrow') || lower.includes('lend')) {
    return await handleAaveCommand(message, senderAddress);
  }

  if (lower.includes('predict') || lower.includes('bet')) {
    return await handlePolymarketCommand(message, senderAddress);
  }

  return `🤖 Sorry, I don’t understand that. Try something like: \"Swap 1 ETH to USDC\"`;
}
