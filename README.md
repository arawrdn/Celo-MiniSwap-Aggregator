# Celo MiniSwap Aggregator

A simple swap aggregator on the Celo network. Users can swap CELO ↔ cUSD ↔ cEUR using a basic AMM formula.

## Features

- Swap CELO ↔ cUSD ↔ cEUR
- WalletConnect / MetaMask Celo support
- Simple frontend demo using React + Tailwind
- Designed for testnet / learning purposes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Hardhat
- MetaMask or Celo Wallet extension

### Installation

```bash
git clone https://github.com/yourusername/celo-mini-swap.git
cd celo-mini-swap
npm install

1. Deploy Smart Contract

2. Update scripts/deploy.js with testnet cUSD & cEUR addresses.

Run:
npx hardhat run scripts/deploy.js --network alfajores

Run frontend:
cd frontend
npm install
npm run dev

Open http://localhost:3000
 and connect your wallet to start swapping CELO ↔ cUSD ↔ cEUR.

Notes

This is a demo project; no fees, slippage, or oracle protection.

Always test on Celo Alfajores testnet before mainnet.
