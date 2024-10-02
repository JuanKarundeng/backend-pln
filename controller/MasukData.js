import MasukData from "../models/MasukDataModel.js";
import path from "path";

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
  const {
    bagian,
    plat,
    km_awal,
    km_akhir,
    selisih_km,
    jumlah_cc,
    jenis_bensin,
    pembayaran,
    harga_disetujui,
    keterangan,
    validasi,
  } = req.body;

  const allowedTypes = [".png", ".jpg", ".jpeg", ".pdf", ".docx"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const { foto_km_awal, foto_km_akhir, foto_nota } = req.files;

  // Check if files are present
  if (!foto_km_awal || !foto_km_akhir || !foto_nota) {
    return res.status(422).json({
      msg: "All three files (foto_km_awal, foto_km_akhir, foto_nota) are required.",
    });
  }

  // Validate file types and sizes
  const files = [foto_km_awal, foto_km_akhir, foto_nota];
  for (let file of files) {
    const ext = path.extname(file.name).toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return res.status(422).json({ msg: "Invalid file format" });
    }
    if (file.size > maxFileSize) {
      return res.status(422).json({ msg: "File cannot exceed 5MB" });
    }
  }

  const fileAwal = `${foto_km_awal.md5}${path.extname(foto_km_awal.name)}`;
  const fileAkhir = `${foto_km_akhir.md5}${path.extname(foto_km_akhir.name)}`;
  const fileNota = `${foto_nota.md5}${path.extname(foto_nota.name)}`;

  const url_km_awal = `${req.protocol}://${req.get(
    "host"
  )}/public/img/${fileAwal}`;
  const url_km_akhir = `${req.protocol}://${req.get(
    "host"
  )}/public/img/${fileAkhir}`;
  const url_nota = `${req.protocol}://${req.get(
    "host"
  )}/public/img/${fileNota}`;

  // Move files to the public folder
  foto_km_awal.mv(`./public/img/${fileAwal}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });
  foto_km_akhir.mv(`./public/img/${fileAkhir}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });
  foto_nota.mv(`./public/img/${fileNota}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });

  // Save to the database
  try {
    // Move files to the public folder using Promises
    await foto_km_awal.mv(`./public/img/${fileAwal}`);
    await foto_km_akhir.mv(`./public/img/${fileAkhir}`);
    await foto_nota.mv(`./public/img/${fileNota}`);

    // Save to the database after files are successfully uploaded
    await MasukData.create({
      bagian,
      plat,
      km_awal,
      km_akhir,
      selisih_km,
      jumlah_cc,
      jenis_bensin,
      pembayaran,
      foto_km_awal: fileAwal,
      url_km_awal,
      foto_km_akhir: fileAkhir,
      url_km_akhir,
      foto_nota: fileNota,
      url_nota,
      harga_disetujui,
      keterangan,
      validasi,
    });

    res.status(200).json({ msg: "Files successfully uploaded" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
