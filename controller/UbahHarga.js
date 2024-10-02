import UbahHarga from "../models/UbahHargaModel.js";

export const getUbahHarga = async (req, res) => {
  try {
    const response = await UbahHarga.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data Tidak Ada" });
  }
};
export const getUbahHargabyId = async (req, res) => {
  try {
    const response = await UbahHarga.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data Tidak Ada" });
  }
};
export const createUbahHarga = async (req, res) => {
  try {
    const {
      pertamax,
      pertamax_turbo,
      pertalite,
      pertamina_dex,
      dexlite,
      solar,
    } = req.body;
    await UbahHarga.create({
      pertamax,
      pertalite,
      pertamax_turbo,
      dexlite,
      pertamina_dex,
      solar,
    });
    res.status(200).json({ msg: "Data Berhasil Dibuat" });
  } catch (error) {
    res.status(404).json({ msg: "Data Gagal Dibuat" });
  }
};
export const updateUbahHarga = async (req, res) => {
  const { pertamax, pertamax_turbo, pertalite, pertamina_dex, dexlite, solar } =
    req.body;
  try {
    await UbahHarga.update(
      {
        pertamax,
        pertamax_turbo,
        pertalite,
        pertamina_dex,
        dexlite,
        solar,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: "Gagal" });
  }
};
export const deleteUbahHarga = async (req, res) => {
  try {
    await UbahHarga.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Gagal" });
  }
};
