const { getSubMetas, getSubMetaById, createSubMetas, updateSubMetas, deleteSubMetas } = require("../services/submetas");

const getSubMetasController = (req, res) => {
  return getSubMetas(req, res);
};

const getSubMetasIdController = (req, res) => {
    return getSubMetaById(req, res);
  };

  const postSubMetasController = (req, res) => {
    return createSubMetas(req, res);
  };

  const putSubMetasController = (req, res) => {
    return updateSubMetas(req, res);
  };

  const deleteSubMetasController = (req, res) => {
    return deleteSubMetas(req, res);
  };


module.exports = { getSubMetasController, getSubMetasIdController, postSubMetasController, putSubMetasController, deleteSubMetasController };