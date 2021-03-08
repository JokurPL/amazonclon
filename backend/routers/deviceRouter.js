import express from "express";
import expressAsyncHandler from "express-async-handler";

import Device from "../models/deviceModel.js";

const deviceRouter = express.Router();

deviceRouter.get(
  "/lamp",
  expressAsyncHandler(async (req, res) => {
    const device = await Device.findOne({
      name: "lampka",
    });
    if (device) {
      res.send({ state: device.value });
    } else {
      res.status(404).send({ message: "Device not found" });
    }
  })
);

export default deviceRouter;
