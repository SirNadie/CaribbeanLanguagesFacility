import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sql from './db';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): object | null {
    try {
        return jwt.verify(token, JWT_SECRET) as object;
    } catch {
        return null;
    }
}

export async function authenticateUser(email: string, password: string) {
    try {
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (users.length === 0) return null;

        const user = users[0];
        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}

export async function getUserById(id: number) {
    try {
        const users = await sql`SELECT id, email, name, role FROM users WHERE id = ${id}`;
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}