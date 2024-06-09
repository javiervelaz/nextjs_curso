"use client";

import { lusitana } from '@/app/ui/fonts';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Cambia 'next/router' por 'next/navigation'
import { FormEvent, useEffect, useState } from 'react';
import styles from './page.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      console.log("hola")
      router.push('/dashboard/comercios'); // Redirige al login si no hay token
    }
  }, [router]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard/comercios'); // Redirige a tu pantalla de búsqueda o dashboard
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={`${styles.container} ${lusitana.className}`}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
      <div className={styles['form-group']}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div> 
      <div className={styles['form-group']}>
      <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

        <button type="submit" className={styles.button}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
