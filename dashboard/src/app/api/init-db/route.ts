import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
    try {
        // Create users table
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Generate password hash
        const passwordHash = await hashPassword('CLF#2026!Dashboard$Secure');

        // Insert or update admin user
        await sql`
            INSERT INTO users (email, password_hash, name, role)
            VALUES ('liscetaguilera2022@gmail.com', ${passwordHash}, 'Lisceta Guilera', 'admin')
            ON CONFLICT (email) DO UPDATE SET 
                password_hash = ${passwordHash},
                name = 'Lisceta Guilera',
                role = 'admin'
        `;

        return NextResponse.json({
            success: true,
            message: 'Database initialized successfully',
            credentials: {
                email: 'liscetaguilera2022@gmail.com',
                password: 'CLF#2026!Dashboard$Secure'
            }
        });
    } catch (error) {
        console.error('Database initialization error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to initialize database' },
            { status: 500 }
        );
    }
}