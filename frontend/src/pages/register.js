import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/api'; // Ajusta la ruta según sea necesario

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log('Usuario registrado:', response.data);
      // Redirigir o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Manejar el error (mostrar un mensaje al usuario)
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Este campo es obligatorio' })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
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
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            {...register('role', { required: 'Este campo es obligatorio' })}
          />
          {errors.role && <p>{errors.role.message}</p>}
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
