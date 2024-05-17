const { Pool } = require('pg');

const pool = new Pool({
  user: 'notessimpledb_user',
  host: 'postgres://notessimpledb_user:mlKQ61wvErytUB88eppqHaiN643yNyWq@dpg-cp2d2mun7f5s73ffjjug-a.ohio-postgres.render.com/notessimpledb',
  database: 'notessimpledb',
  password: 'mlKQ61wvErytUB88eppqHaiN643yNyWq',
  port: 5432, 
});

(async () => {

  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute a query
    const res = await client.query('SELECT * FROM Accounts');
    
    const rows = res.rows;

    console.log('Query results:', rows);
    console.log('did this work');

    // Release the client connection back to the pool
    client.release();

  } catch (error) {
    console.error('Error connecting to database:', error);
    console.log('did this work');
  } finally {
    // Close the connection pool when finished (optional)
    await pool.end();
  }

});


