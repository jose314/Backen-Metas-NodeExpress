const {
  getMetas,
  getMetaById,
  createMetas,
  updateMetas,
  deleteMetas,
  getAllMetasWithSubMetas
} = require("../services/metas");

const getMetasController = (req, res) => {
  return getMetas(req, res);
};

const getMetasIdController = (req, res) => {
  return getMetaById(req, res);
};

const getMetasWithALLController = (req, res) => {
  return getAllMetasWithSubMetas(req, res);
};
const postMetasController = (req, res) => {
  return createMetas(req, res);
};

const putMetasController = (req, res) => {
  return updateMetas(req, res);
};

const deleteMetasController = (req, res) => {
  return deleteMetas(req, res);
};

module.exports = {
  getMetasController,
  getMetasIdController,
  getMetasWithALLController,
  postMetasController,
  putMetasController,
  deleteMetasController,
};
