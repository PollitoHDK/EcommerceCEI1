// src/pages/StockManagement.js
import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, patchProduct, deleteProduct } from '../../services/api'; // Ajusta el path según tu estructura

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: null });
  const [editProduct, setEditProduct] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("Error al cargar productos:", err.message);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      // Validación básica de campos
      if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.image) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', parseFloat(newProduct.price));
      formData.append('stock', parseInt(newProduct.stock, 10));
      formData.append('image', newProduct.image);

      // Llamada al backend para agregar el producto
      const response = await createProduct(formData);
      setProducts([...products, response.data]); // Agrega el nuevo producto a la lista
      setNewProduct({ name: '', price: '', stock: '', image: null }); // Limpia el formulario
    } catch (error) {
      console.error("Error al agregar producto:", error.response?.data || error);
      alert(`Hubo un problema al agregar el producto: ${error.response?.data?.message || "Error desconocido"}`);
    }
  };

  const handleEditProduct = async () => {
    try {
      if (!editProduct) {
        alert("No hay un producto seleccionado para editar.");
        return;
      }

      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('price', parseFloat(editProduct.price));
      formData.append('stock', parseInt(editProduct.stock, 10));
      if (editImage) {
        formData.append('image', editImage);
      }

      // Llamada al backend para actualizar el producto
      await patchProduct(editProduct._id, formData);

      // Actualiza el estado de los productos
      setProducts(products.map((p) => (p._id === editProduct._id ? { ...p, ...editProduct, image: editImage ? editImage.name : p.image } : p)));
      setEditProduct(null); // Restablece el estado de edición
      setEditImage(null); // Limpia la imagen editada
    } catch (error) {
      console.error("Error al actualizar producto:", error.response?.data || error);
      alert(`Hubo un problema al actualizar el producto: ${error.response?.data?.message || "Error desconocido"}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-blue-600">Stock Management</h1>

      {/* Sección para añadir producto */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Add New Product</h2>
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded p-2"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full border border-gray-300 rounded p-2"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            className="w-full border border-gray-300 rounded p-2"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Sección para editar producto */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Edit Product</h2>
        {editProduct ? (
          <div className="space-y-4 mt-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            />
            <input
              type="number"
              className="w-full border border-gray-300 rounded p-2"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            />
            <input
              type="number"
              className="w-full border border-gray-300 rounded p-2"
              value={editProduct.stock}
              onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded p-2"
              onChange={(e) => setEditImage(e.target.files[0])}
            />
            <button
              onClick={handleEditProduct}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select a product to edit.</p>
        )}
        <div className="mt-4 space-y-2">
          {products.map((product) => (
            <button
              key={product._id}
              onClick={() => setEditProduct(product)}
              className="block w-full text-left text-blue-500 hover:underline"
            >
              Edit {product.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sección para eliminar producto */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Delete Product</h2>
        <ul className="space-y-2 mt-4">
          {products.map((product) => (
            <li key={product._id} className="flex justify-between items-center">
              <span>{product.name}</span>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockManagement;
