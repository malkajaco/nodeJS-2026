export const getAllCategories = (req, res) => {
  res.json({ message: "Listado de categorías" });
};

export const getCategoryById = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Categoría con ID: ${id}` });
};

export const createCategory = (req, res) => {
  const { title } = req.body;
  res.status(201).json({ message: `Categoría '${title}' creada` });
};

export const updateCategory = (req, res) => {
  const { id } = req.params; //validar si existe el id.
  if (id != 1) { //s un ejemplo aca va la validacion de si el id existe
    return res.status(422).json({ message: "Categoría no encontrada" });
  }
  const { title } = req.body;
  res.json({
    message: `Categoría con ID: ${id} actualizada con título: ${title}`,
  });
};

//createdAt, updatedAt, deketedAt = null -> fecha de eliminacion logica.
export const deleteCategory = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Categoría con ID: ${id} eliminada` });
};
