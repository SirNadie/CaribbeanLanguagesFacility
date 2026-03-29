import { hashPassword } from '../src/lib/auth';

// This script should be run once to initialize the database
// Usage: npx tsx scripts/init-db.ts

const NEON_DATABASE_URL = process.env.DATABASE_URL;

async function initDatabase() {
    if (!NEON_DATABASE_URL) {
        console.error('❌ DATABASE_URL is not set in environment variables');
        process.exit(1);
    }

    try {
        // Import neon dynamically
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(NEON_DATABASE_URL);

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

        console.log('\n========================================');
        console.log('✅ Database initialized successfully!');
        console.log('========================================');
        console.log('\n📧 Login credentials:');
        console.log('   Email: liscetaguilera2022@gmail.com');
        console.log('   Password: CLF#2026!Dashboard$Secure');
        console.log('\n⚠️  Please save these credentials securely!');
        console.log('========================================\n');

    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

initDatabase();