const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Encriptar la contraseña
    const hashedPassword =  await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña encriptada
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Guardar el usuario en la base de datos
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Usa una clave secreta que debe estar en tus variables de entorno
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    // Responder con el token y el rol del usuario
    res.status(200).json({ message: 'Login successful', token, role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Agregar esta ruta en tu archivo de rutas (por ejemplo, userRoutes.js)
router.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password'); // No devolver la contraseña

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;