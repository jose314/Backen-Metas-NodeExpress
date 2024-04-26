const { getMetas, getMetaById, createMetas, updateMetas, deleteMetas } = require("../services/metas");

const getMetasController = (req, res) => {
  return getMetas(req, res);
};

const getMetasIdController = (req, res) => {
    return getMetaById(req, res);
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


module.exports = { getMetasController, getMetasIdController, postMetasController, putMetasController, deleteMetasController };