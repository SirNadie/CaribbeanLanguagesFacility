'use server'

import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'liscetaguilera2022@gmail.com'
const ADMIN_PASSWORD = 'CLF#2026!Dashboard$Secure'
const AUTH_SECRET = process.env.AUTH_SECRET || 'your-super-secret-key-change-this-in-production'

// Hash password for storage
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Verify password against hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Create session token
export async function createSessionToken(): Promise<string> {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2)
  return Buffer.from(`${timestamp}:${randomString}:${AUTH_SECRET}`).toString('base64')
}

// Verify session token
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [timestamp, , secret] = decoded.split(':')
    
    // Check if token is valid and not expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    
    return secret === AUTH_SECRET && tokenAge < maxAge
  } catch {
    return false
  }
}

// Authenticate admin user
export async function authenticateAdmin(email: string, password: string): Promise<boolean> {
  // Verify against hardcoded credentials
  if (email !== ADMIN_EMAIL) {
    return false
  }
  
  return password === ADMIN_PASSWORD
}

// Set session cookie
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  })
}

// Get session cookie
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value
}

// Remove session cookie
export async function removeSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionCookie()
  if (!token) {
    return false
  }
  return verifySessionToken(token)
}

// Login action
export async function loginAction(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const isValid = await authenticateAdmin(email, password)
  
  if (!isValid) {
    return { success: false, error: 'Credenciales inválidas' }
  }
  
  const token = await createSessionToken()
  await setSessionCookie(token)
  
  return { success: true }
}

// Logout action
export async function logoutAction(): Promise<void> {
  await removeSessionCookie()
}