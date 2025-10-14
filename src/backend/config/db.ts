import { Pool } from 'pg';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5000'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

console.log('Loaded DB config:', dbConfig);

const pool = new Pool(dbConfig);

pool.connect()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch((err) => {
    console.error('Database connection error:', err.message);
    if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused — check if PostgreSQL is running and port is correct.');
    }
    if (!dbConfig.user || !dbConfig.password || !dbConfig.database) {
      console.error('Missing DB credentials — check your .env file.');
    }
  });

export default pool;
