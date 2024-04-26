const db = require("../config/db");
const { formatDateTime } = require("../helpers/utils/constant");

// Función para obtener todas las subMetas
async function getSubMetas(req, res) {
  const client = await db.connect();
  try {
    const { rows } = await client.query("SELECT * FROM submetas");
    // Aplicar formato a las fechas en cada objeto del array
    const updatedSubMetas = rows.map((subMeta) => ({
      ...subMeta,
      created_at: formatDateTime(subMeta.created_at),
      updated_at: formatDateTime(subMeta.updated_at),
    }));

    res.json(updatedSubMetas); // Devolver el array modificado
  } catch (error) {
    console.error("Error al obtener las subMetas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

// Función para obtener una subMeta por su ID
async function getSubMetaById(req, res) {
  const client = await db.connect();
  const { codigo } = req.params;
  try {
    const { rows } = await client.query("SELECT * FROM submetas WHERE codigo = $1", [
        codigo,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "SubMeta no encontrada" });
    }
    const updatedSubMeta = {
      ...rows[0],
      created_at: formatDateTime(rows[0].created_at),
      updated_at: formatDateTime(rows[0].updated_at),
    };
    res.status(200).json(updatedSubMeta);
  } catch (error) {
    console.error("Error al obtener la subMeta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

// Función para crear una nueva subMeta
async function createSubMetas(req, res) {
  const client = await db.connect();
  const { codigo, descripcion, estado, accion, frecuencia, meta_id } = req.body;
  try {
    // Verificar si el código ya existe en la base de datos
    const existingSubMeta = await client.query(
      "SELECT * FROM submetas WHERE codigo = $1",
      [codigo]
    );
    if (existingSubMeta.rows.length > 0) {
      return res.status(409).json({ message: "El código ya está en uso" });
    }

    // Si el código no existe, insertar la nueva subMeta
    const { rows } = await client.query(
      "INSERT INTO submetas (codigo, descripcion, estado, accion, frecuencia, meta_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [codigo, descripcion, estado, accion, frecuencia, meta_id]
    );
    const updatedSubMeta = {
      ...rows[0],
      created_at: formatDateTime(rows[0].created_at),
      updated_at: formatDateTime(rows[0].updated_at),
    };
    res.status(200).json(updatedSubMeta);
  } catch (error) {
    console.error("Error al crear la subMeta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

// Función para actualizar una subMeta por su ID
async function updateSubMetas(req, res) {
    const client = await db.connect();
    const { id } = req.params;
    const { codigo, descripcion, estado, accion, frecuencia, meta_id } = req.body;
    const updateFields = ['codigo = $1', 'descripcion = $2', 'estado = $3', 'accion = $4', 'frecuencia = $5', 'meta_id = $6'];
    const queryParams = []; // El ID no se agrega aquí, ya que se agrega al final
  
    // Obtener la información actual de la submeta
    const currentSubMeta = await client.query('SELECT * FROM submetas WHERE codigo = $1', [id]);
    if (currentSubMeta.rows.length === 0) {
      return res.status(404).json({ message: 'La submeta no existe' });
    }
    const currentData = currentSubMeta.rows[0]; // Información actual de la submeta
  
    // Verificar y agregar los campos presentes y no vacíos en req.body
    if (codigo !== undefined && codigo !== '') {
      queryParams.push(codigo);
    } else {
      // Si el campo no se proporciona o está vacío, mantener el valor existente
      queryParams.push(currentData.codigo);
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
    if (accion !== undefined && accion !== '') {
      queryParams.push(accion);
    } else {
      queryParams.push(currentData.accion);
    }
    if (frecuencia !== undefined && frecuencia !== '') {
      queryParams.push(frecuencia);
    } else {
      queryParams.push(currentData.frecuencia);
    }
    if (meta_id !== undefined && meta_id !== '') {
      queryParams.push(meta_id);
    } else {
      queryParams.push(currentData.meta_id);
    }
  
    // Agregar el ID al final de los parámetros
    queryParams.push(id);
  
    // Verificar si hay algún campo para actualizar
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
    }
  
    // Construir la consulta SQL dinámica
    const updateQuery = `
      UPDATE submetas 
      SET ${updateFields.join(", ")}, updated_at = now() 
      WHERE codigo = $${queryParams.length} 
      RETURNING *
    `;
  
    try {
      const { rows } = await client.query(updateQuery, queryParams);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Submeta no encontrada" });
      }
      const updatedSubMeta = {
        ...rows[0],
        created_at: formatDateTime(rows[0].created_at),
        updated_at: formatDateTime(rows[0].updated_at),
      };
      res.status(200).json(updatedSubMeta);
    } catch (error) {
      console.error("Error al actualizar la subMeta:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    } finally {
      await client.release(); // Liberar el cliente después de usarlo
    }
  }
  

// Función para eliminar una subMeta por su ID
async function deleteSubMetas(req, res) {
  const client = await db.connect();
  const { codigo_submeta } = req.params;
  const { estado } = req.body;
  try {
    const { rows } = await client.query(
      "UPDATE submetas SET estado = $1 WHERE codigo = $2 RETURNING *",
      [estado, codigo_submeta]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "SubMeta no encontrada" });
    }
    res.json({ message: "SubMeta eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la subMeta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await client.release(); // Liberar el cliente después de usarlo
  }
}

module.exports = {
  createSubMetas,
  getSubMetas,
  getSubMetaById,
  updateSubMetas,
  deleteSubMetas,
};
