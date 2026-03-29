import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sql from './db';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface User {
    id: number;
    email: string;
    name: string | null;
    role: string;
}

export interface JWTPayload {
    userId: number;
    email: string;
    role: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<User | null> {
    try {
        const users = await sql`
            SELECT id, email, password_hash, name, role 
            FROM users 
            WHERE email = ${email}
        `;

        if (users.length === 0) {
            return null;
        }

        const user = users[0];
        const isValid = await verifyPassword(password, user.password_hash);

        if (!isValid) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}

// Create user
export async function createUser(email: string, password: string, name?: string): Promise<User | null> {
    try {
        const passwordHash = await hashPassword(password);
        
        const result = await sql`
            INSERT INTO users (email, password_hash, name)
            VALUES (${email}, ${passwordHash}, ${name || null})
            RETURNING id, email, name, role
        `;

        if (result.length === 0) {
            return null;
        }

        return result[0] as User;
    } catch (error) {
        console.error('Create user error:', error);
        return null;
    }
}

// Get user by ID
export async function getUserById(id: number): Promise<User | null> {
    try {
        const users = await sql`
            SELECT id, email, name, role 
            FROM users 
            WHERE id = ${id}
        `;

        if (users.length === 0) {
            return null;
        }

        return users[0] as User;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}