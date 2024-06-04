"use client";

import { lusitana } from '@/app/ui/fonts';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import styles from './page.module.css';

const ComerciosPage = () => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/search', {
        query: search,
        city: city,
        radius: 2000
      });
      setMessage('Data successfully saved and exported to Google Sheets');
    } catch (error) {
      setMessage('An error occurred');
      console.error(error);
    }
  };

  return (
    <div className={`${styles.container} ${lusitana.className}`}>
      <h1>Search and Export</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="search">Search Query:</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Send</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ComerciosPage;
