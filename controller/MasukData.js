import MasukData from "../models/MasukDataModel.js";
import path from "path";
import { promisify } from "util";

export const getMasukData = async (req, res) => {
  try {
    const response = await MasukData.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data Tidak Ada" });
  }
};
export const getMasukDatabyId = async (req, res) => {
  try {
    const response = await MasukData.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data Tidak Ada" });
  }
};

export const createMasukData = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).json({ msg: "no File UPLOAD" });
  const bagian = req.body.bagian;
  const plat = req.body.plat;
  const km_awal = req.body.km_awal;
  const km_akhir = req.body.km_akhir;
  const selisih_km = req.body.selisih_km;
  const jumlah_cc = req.body.jumlah_cc;
  const jenis_bensin = req.body.jenis_bensin;
  const pembayaran = req.body.pembayaran;
  const harga_disetujui = req.body.harga_disetujui;
  const keterangan = req.body.keterangan;
  const validasi = req.body.validasi;
  const foto_nota = req.files.foto_nota;
  const foto_km_awal = req.files.foto_km_awal;
  const foto_km_akhir = req.files.foto_km_akhir;

  const fileSize1 = foto_nota.data.length;
  const fileSize2 = foto_km_awal.data.length;
  const fileSize3 = foto_km_akhir.data.length;

  const ext1 = path.extname(foto_nota.name);
  const ext2 = path.extname(foto_km_awal.name);
  const ext3 = path.extname(foto_km_akhir.name);

  const file1 = foto_nota.md5 + ext1;
  const file2 = foto_km_awal.md5 + ext2;
  const file3 = foto_km_akhir.md5 + ext3;

  const url_nota = `${req.protocol}://${req.get("host")}/img/${file1}`;
  const url_km_awal = `${req.protocol}://${req.get("host")}/img/${file2}`;
  const url_km_akhir = `${req.protocol}://${req.get("host")}/img/${file3}`;

  const allowedType = [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"];

  if (
    !allowedType.includes(ext1.toLowerCase()) ||
    !allowedType.includes(ext2.toLowerCase()) ||
    !allowedType.includes(ext3.toLowerCase())
  )
    return res.status(422).json({ msg: "invalid images" });
  if (fileSize1 > 5000000 || fileSize2 > 5000000 || fileSize3 > 5000000)
    return res.status(422).json({ msg: " file harus kurang dari 5 MB" });
  try {
    await Promise.all([
      promisify(foto_nota.mv)(`./public/img/${file1}`),
      promisify(foto_km_awal.mv)(`./public/img/${file2}`),
      promisify(foto_km_akhir.mv)(`./public/img/${file3}`),
    ]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }

  try {
    await MasukData.create({
      bagian: bagian,
      plat: plat,
      km_awal: km_awal,
      km_akhir: km_akhir,
      selisih_km: km_akhir - km_awal,
      jumlah_cc: jumlah_cc,
      jenis_bensin: jenis_bensin,
      pembayaran: pembayaran,
      harga_disetujui: harga_disetujui,
      validasi: validasi,
      keterangan: keterangan,
      foto_nota: file1,
      foto_km_awal: file2,
      foto_km_akhir: file3,
      url_nota: url_nota,
      url_km_awal: url_km_awal,
      url_km_akhir: url_km_akhir,
    });
    res.status(201).json({ message: "Data berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateMasukData = async (req, res) => {
  try {
  } catch (error) {}
};
export const deleteMasukData = async (req, res) => {
  try {
  } catch (error) {}
};
