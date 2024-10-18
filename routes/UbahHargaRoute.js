import express from "express";
import {
  getUbahHarga,
  getUbahHargabyId,
  createUbahHarga,
  updateUbahHarga,
  deleteUbahHarga,
} from "../controller/UbahHarga.js";

const router = express.Router();
router.get("/ubah-harga", getUbahHarga);
router.get("/ubah-harga/:id", getUbahHargabyId);
router.post("/ubah-harga", createUbahHarga);
router.put("/ubah-harga/:id", updateUbahHarga);
router.delete("/ubah-harga/:id", deleteUbahHarga);

export default router;
