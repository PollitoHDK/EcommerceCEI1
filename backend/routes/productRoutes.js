const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'public/uploads/products';
        // Crear el directorio si no existe
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Crear un nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen (jpeg, png, gif)'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB máximo
    }
});

// Endpoint para crear un nuevo producto
router.post('/products', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file 
            ? `/uploads/products/${req.file.filename}`  // Si hay imagen, guarda la ruta
            : ''; // Si no hay imagen, guarda string vacío

        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: imageUrl
        };

        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: error.message });
    }
});

// Los demás endpoints se mantienen igual...
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
    try {
        const productData = { ...req.body };
        
        // Si se subió una nueva imagen, actualizar la ruta
        if (req.file) {
            productData.image = `/uploads/products/${req.file.filename}`;
            
            // Opcional: Eliminar la imagen anterior
            const oldProduct = await Product.findById(req.params.id);
            if (oldProduct && oldProduct.image) {
                const oldImagePath = path.join(__dirname, '../public', oldProduct.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            productData,
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Eliminar la imagen si existe
        if (product.image) {
            const imagePath = path.join(__dirname, '../public', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;