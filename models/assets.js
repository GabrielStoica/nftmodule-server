const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const asset = new Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    owned_by: {
      type: String,
      required: true,
    },
    data: {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      nft: {
        type: {
          chain_id: {
            type: String,
            required: true,
          },
          chain_name: {
            type: String,
            required: true,
          },
          contract_address: {
            type: String,
            required: true,
          },
          transaction_hash: {
            type: String,
            required: true,
          },
          token_id: {
            type: Number,
            required: true,
          },
        },
        required: false,
      },
    },
    minted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Assets = mongoose.model("assets", asset);
module.exports = Assets;
