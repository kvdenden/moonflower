import { base, baseSepolia, anvil } from "viem/chains";

function getChain() {
  switch (process.env.NEXT_PUBLIC_CHAIN) {
    case "mainnet":
      return base;
    case "testnet":
      return baseSepolia;
    default:
      return anvil;
  }
}

function getRPC() {
  switch (process.env.NEXT_PUBLIC_CHAIN) {
    case "mainnet":
      return `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
    case "testnet":
      return `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
    default:
      return "http://127.0.0.1:8545";
  }
}

export const chain = getChain();
export const rpc = getRPC();
