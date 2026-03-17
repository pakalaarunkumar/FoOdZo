const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/create", async (req, res) => {
  try {
    const { items, totalItems, totalAmount } = req.body;

    const order = new Order({
      items,
      totalItems,
      totalAmount,
    });

    await order.save();

    res.json({
      message: "Order saved successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
