import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken, getUserById } from '@/lib/auth';

export default async function DashboardPage() {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        redirect('/');
    }

    // Verify token
    const payload = verifyToken(token);
    
    if (!payload) {
        redirect('/');
    }

    // Get user info
    const user = await getUserById(payload.userId);

    if (!user) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-cyan-600">CLF</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Dashboard</h1>
                                <p className="text-sm text-cyan-200/70">Caribbean Language Facility</p>
                            </div>
                        </div>
                        <form action="/api/auth/logout" method="POST">
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl">👋</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                ¡Bienvenido!
                            </h2>
                            <p className="text-xl text-cyan-200">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">✓</span>
                            </div>
                            <div>
                                <p className="text-sm text-cyan-200/70">Estado</p>
                                <p className="text-lg font-semibold text-green-400">Activo</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div>
                                <p className="text-sm text-cyan-200/70">Rol</p>
                                <p className="text-lg font-semibold text-white capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🔐</span>
                            </div>
                            <div>
                                <p className="text-sm text-cyan-200/70">Sesión</p>
                                <p className="text-lg font-semibold text-white">24 horas</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Información de la Cuenta</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-cyan-200/70">Email</span>
                            <span className="text-white">{user.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-cyan-200/70">Nombre</span>
                            <span className="text-white">{user.name || 'No especificado'}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-cyan-200/70">ID de Usuario</span>
                            <span className="text-white">#{user.id}</span>
                        </div>
                    </div>
                </div>

                {/* Placeholder for future features */}
                <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 border-dashed p-8 text-center">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Más funcionalidades próximamente</h3>
                    <p className="text-cyan-200/70">Este dashboard está en crecimiento. Pronto tendremos más herramientas para ti.</p>
                </div>
            </main>
        </div>
    );
}