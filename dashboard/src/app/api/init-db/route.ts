import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
    try {
        console.log('🔄 Initializing database...');

        // Create users table
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Users table created');

        // Generate password hash
        const password = 'CLF#2026!Dashboard$Secure';
        const passwordHash = await hashPassword(password);

        // Insert or update admin user
        await sql`
            INSERT INTO users (email, password_hash, name, role)
            VALUES ('liscetaguilera2022@gmail.com', ${passwordHash}, 'Lisceta Guilera', 'admin')
            ON CONFLICT (email) 
            DO UPDATE SET 
                password_hash = ${passwordHash},
                name = 'Lisceta Guilera',
                role = 'admin',
                updated_at = CURRENT_TIMESTAMP
        `;
        console.log('✅ Admin user created/updated');

        return NextResponse.json({
            success: true,
            message: 'Database initialized successfully',
            credentials: {
                email: 'liscetaguilera2022@gmail.com',
                password: 'CLF#2026!Dashboard$Secure'
            }
        });
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'Error initializing database',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}