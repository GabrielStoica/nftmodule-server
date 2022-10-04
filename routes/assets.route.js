const express = require("express");
const bodyEncodedParser = require("../middleware/bodyParser");
const Assets = require("../models/assets");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { owned_by } = req.query;
    if (!owned_by) res.status(400).json({ status: "error", message: "Invalid query params" });

    const data = await Assets.find({ owned_by: owned_by }).sort({ _id: -1 }).exec();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Error" });
  }
});

router.post("/", bodyEncodedParser, async (req, res) => {
  try {
    const { owned_by, image, title, description } = req.body;

    if (!owned_by || !image || !title || !description) {
      res.status(400).json({ status: "error", message: "Validation error" });
      return;
    }

    const data = new Assets({
      owned_by: owned_by,
      data: {
        image: image,
        title: title,
        description: description,
      },

      minted: false,
    });
    const response = await data.save();

    if (!response) res.status(400).json({ status: "error", message: "Data could not be saved" });

    res.json({ status: "ok", message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Error" });
  }
});

router.post("/:asset_id/mint", bodyEncodedParser, async (req, res) => {
  try {
    const { asset_id } = req.params;

    if (!asset_id) {
      res.status(400).json({ status: "error", message: "Invalid asset id" });
      return;
    }
    console.log(req.body);
    const { chain_id, chain_name, contract_address, transaction_hash, token_id } = req.body;

    if (!chain_id || !chain_name || !contract_address || !transaction_hash || !token_id) {
      res.status(400).json({ status: "error", message: "Validation error" });
      return;
    }

    let asset = await Assets.findById(asset_id);

    const nft = {
      chain_id: chain_id,
      chain_name: chain_name,
      contract_address: contract_address,
      transaction_hash: transaction_hash,
      token_id: token_id,
    };

    asset.data.nft = nft;
    asset.minted = true;
    const response = await asset.save();
    if (!response) {
      res.status(400).json({ status: "error", message: "Asset could not be updated" });
      return;
    }

    res.json({ status: "ok", message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Error" });
  }
});

router.put("/:asset_id", bodyEncodedParser, async (req, res) => {
  try {
    const { asset_id } = req.params;
    if (!asset_id) {
      res.status(400).json({ status: "error", message: "Invalid asset id" });
      return;
    }

    const { image, title, description } = req.body;
    if (!image || !title || !description)
      res.status(400).json({ status: "error", message: "Validation error" });

    let asset = await Assets.findById(asset_id);

    //if asset is minted, can't be edited anymore
    if (asset.minted) {
      res.status(400).json({ status: "error", message: "Validation error" });
      return;
    }

    if (asset.data.image !== image) {
      asset.data.image = image;
    }
    if (asset.data.title !== title) {
      asset.data.title = title;
    }
    if (asset.data.description !== description) {
      asset.data.description = description;
    }

    const response = await asset.save();
    if (!response) {
      res.status(400).json({ status: "error", message: "Asset could not be updated" });
      return;
    }

    res.json({ status: "ok", message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Error" });
  }
});

router.delete("/:asset_id", bodyEncodedParser, async (req, res) => {
  try {
    const { asset_id } = req.params;
    if (!asset_id) {
      res.status(400).json({ status: "error", message: "Invalid asset id" });
      return;
    }

    const asset = await Assets.findById(asset_id);

    const { owned_by } = req.body;
    if (!owned_by || owned_by !== asset.data.owned_by)
      if (!asset_id) {
        res.status(400).json({ status: "error", message: "Unauthorised" });
        return;
      }

    const response = await Assets.deleteOne({ _id: asset_id });
    if (!response) {
      res.status(400).json({ status: "error", message: "Asset could not be deleted" });
      return;
    }

    res.json({ status: "ok", message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Error" });
  }
});

module.exports = router;
