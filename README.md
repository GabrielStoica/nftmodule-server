# NFT Server Module

This is the back-end component of the [nftmodule-client](https://github.com/gabrielstoica/nftmodule-server) app, a simple app for minting assets on the Rinkeby or Goerli networks based on two pre-deployed ERC721-compatible smart contracts. Built using MongoDB as the primary database for storing asset details, the back-end provides dedicated endpoints for creating, updating, and deleting asset entries, making it easy for developers to integrate asset management functionality into their applications.

## Installation

To install this app, follow these steps:

1. Clone the repository to your local machine
```bash
git clone github.com/gabrielstoica/nftmodule-server/
```
2. Install dependencies using 
```bash
yarn install
```
3. Set the required environment variables (see .env.example for an example)
4. Start the server using 
```bash
yarn dev
```

## Environment variables
The current version requires the following environment variables to be set:

- `MONGODB_URI`: The URI for the MongoDB cluster
- `PORT`: The port of the Node.js server
