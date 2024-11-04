import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/api'; // Ajusta la ruta según sea necesario

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log('Inicio de sesión exitoso:', response.data);
      // Almacenar el token o redirigir al usuario
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar el error (mostrar un mensaje al usuario)
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Este campo es obligatorio' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Este campo es obligatorio' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
