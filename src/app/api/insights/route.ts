import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.SINGLESTORE_HOST,
      port: parseInt(process.env.SINGLESTORE_PORT || '3306'),
      user: process.env.SINGLESTORE_USER,
      password: process.env.SINGLESTORE_PASSWORD,
      database: process.env.SINGLESTORE_DATABASE,
    });

    const [rows] = await connection.execute('SELECT * FROM customer_incidents LIMIT 1');
    await connection.end();

    if (Array.isArray(rows) && rows.length > 0) {
      const insightData = rows[0];
      return NextResponse.json(insightData);
    } else {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching insight data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}