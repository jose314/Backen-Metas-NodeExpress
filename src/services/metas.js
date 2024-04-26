const db = require("../config/db");
const { formatDateTime } = require("../helpers/utils/constant");

// Función para obtener todas las metas
async function getMetas(req, res) {
  const client = await db.connect();
  try {
    const { rows } = await client.query("SELECT * FROM metas");
    // Aplicar formato a las fechas en cada objeto del array
    const updatedMetas = rows.map((meta) => ({
      ...meta,
      created_at: formatDateTime(meta.created_at),
      updated_at: formatDateTime(meta.updated_at),
    }));

    res.json(updatedMetas); // Devolver el array modificado
  } catch (error) {
    console.error("Error al obtener las metas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

// Función para obtener una meta por su ID
async function getMetaById(req, res) {
  const client = await db.connect();
  const { codigo } = req.params;
  try {
    const { rows } = await client.query("SELECT * FROM metas WHERE codigo = $1", [
      codigo,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }
    const updatedMeta = {
      ...rows[0],
      created_at: formatDateTime(rows[0].created_at),
      updated_at: formatDateTime(rows[0].updated_at),
    };
    res.status(200).json(updatedMeta);
  } catch (error) {
    console.error("Error al obtener la meta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

// Función para crear un nuevo usuario
async function createMetas(req, res) {
  const client = await db.connect();
  const { codigo, titulo, descripcion, estado } = req.body;
  try {
    // Verificar si el código ya existe en la base de datos
    const existingMeta = await client.query(
      "SELECT * FROM metas WHERE codigo = $1",
      [codigo]
    );
    if (existingMeta.rows.length > 0) {
      return res.status(409).json({ message: "El código ya está en uso" });
    }

    // Si el código no existe, insertar la nueva meta
    const { rows } = await client.query(
      "INSERT INTO metas (codigo, titulo, descripcion, estado) VALUES ($1, $2, $3, $4) RETURNING *",
      [codigo, titulo, descripcion, estado]
    );
    const updatedMeta = {
      ...rows[0],
      created_at: formatDateTime(rows[0].created_at),
      updated_at: formatDateTime(rows[0].updated_at),
    };
    res.status(200).json(updatedMeta);
  } catch (error) {
    console.error("Error al crear la meta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

// Función para actualizar un usuario por su ID
async function updateMetas(req, res) {
  const client = await db.connect();
  const { codigo, titulo, descripcion, estado } = req.body;
  const { id } = req.params;
  const updateFields = ['codigo = $2', 'titulo = $3','descripcion = $4', 'estado = $5'];
  const queryParams = [id]; // El ID siempre se pasa como último parámetro
// Obtener la información actual de la meta
const currentMeta = await client.query('SELECT * FROM metas WHERE codigo = $1', [id]);
if (currentMeta.rows.length === 0) {
  return res.status(404).json({ message: 'La meta no existe' });
}
const currentData = currentMeta.rows[0]; // Información actual de la meta


// Verificar y agregar los campos presentes y no vacíos en req.body
if (codigo !== undefined && codigo !== '') {
  queryParams.push(codigo);
} else {
  // Si el campo no se proporciona o está vacío, mantener el valor existente
  queryParams.push(currentData.codigo);
}
if (titulo !== undefined && titulo !== '') {
  queryParams.push(titulo);
} else {
  queryParams.push(currentData.titulo);
}
if (descripcion !== undefined && descripcion !== '') {
  queryParams.push(descripcion);
} else {
  queryParams.push(currentData.descripcion);
}
if (estado !== undefined && estado !== '') {
  queryParams.push(estado);
} else {
  queryParams.push(currentData.estado);
}

// Verificar si hay algún campo para actualizar
if (updateFields.length === 0) {
  return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
}

// Construir la consulta SQL dinámica
const updateQuery = `
  UPDATE metas 
  SET ${updateFields.join(", ")}, updated_at = now() 
  WHERE codigo = $1
  RETURNING *
`;

  try {
    const { rows } = await client.query(updateQuery, queryParams);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }
    const updatedMeta = {
      ...rows[0],
      created_at: formatDateTime(rows[0].created_at),
      updated_at: formatDateTime(rows[0].updated_at),
    };
    res.status(200).json(updatedMeta);
  } catch (error) {
    console.error("Error al actualizar la meta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

// Función para eliminar un usuario por su ID
async function deleteMetas(req, res) {
  const client = await db.connect();
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const { rows } = await client.query(
      "UPDATE metas SET estado = $1 WHERE codigo = $2 RETURNING *",
      [estado, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }
    res.json({ message: "Meta eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la meta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

module.exports = {
  createMetas,
  getMetas,
  getMetaById,
  updateMetas,
  deleteMetas,
};
