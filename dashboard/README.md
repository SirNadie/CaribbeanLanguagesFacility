# CLF Dashboard

Dashboard de administración para Caribbean Language Facility.

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Edita el archivo `.env.local` con tus credenciales de Neon:

```env
# Neon Database
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

# JWT Secret (ya configurado)
JWT_SECRET=clf_dashboard_jwt_2026_xK9mP2vL5nQ8wR3jF7hT1cB6gD4sA0eY

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 2. Inicializar la Base de Datos

Ejecuta el script para crear la tabla de usuarios y el usuario administrador:

```bash
npm run db:init
```

Esto creará:
- Tabla `users` en tu base de datos Neon
- Usuario administrador con las siguientes credenciales:

```
📧 Email: liscetaguilera2022@gmail.com
🔑 Contraseña: CLF#2026!Dashboard$Secure
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El dashboard estará disponible en: http://localhost:3001

### 4. Iniciar Sesión

1. Abre http://localhost:3001 en tu navegador
2. Ingresa las credenciales del administrador
3. ¡Listo! Verás el dashboard con el mensaje de bienvenida

## 📁 Estructura del Proyecto

```
dashboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login/route.ts    # API de login
│   │   │       └── logout/route.ts   # API de logout
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Página principal del dashboard
│   │   ├── layout.tsx                # Layout principal
│   │   └── page.tsx                  # Página de login
│   ├── components/
│   │   └── LoginForm.tsx             # Componente del formulario de login
│   ├── lib/
│   │   ├── auth.ts                   # Funciones de autenticación JWT
│   │   └── db.ts                     # Conexión a Neon PostgreSQL
│   └── middleware.ts                 # Protección de rutas
├── scripts/
│   └── init-db.ts                    # Script de inicialización
├── .env.local                        # Variables de entorno
└── package.json
```

## 🔐 Sistema de Autenticación

- **JWT** para tokens de sesión (24 horas de duración)
- **bcrypt** para hash de contraseñas
- **Cookies HTTP Only** para seguridad
- **Middleware** que protege las rutas del dashboard

## 🛠 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo (puerto 3001) |
| `npm run build` | Construir para producción |
| `npm run start` | Iniciar servidor de producción |
| `npm run db:init` | Inicializar base de datos y crear usuario admin |
| `npm run lint` | Ejecutar linter |

## 📊 Funcionalidades Actuales

- ✅ Login con email/contraseña
- ✅ Dashboard con mensaje de bienvenida
- ✅ Información de la cuenta
- ✅ Estadísticas básicas
- ✅ Logout seguro
- ✅ Protección de rutas

## 🚧 Próximas Funcionalidades

El dashboard está diseñado para crecer. Próximamente:
- Gestión de usuarios
- Reportes y analytics
- Configuración del sistema
- Y más...

## 🔧 Para Producción

1. Cambia `NEXT_PUBLIC_APP_URL` a tu dominio de producción
2. Asegúrate de que `JWT_SECRET` sea seguro y único
3. Configura las cookies para HTTPS (`secure: true`)
4. Despliega en tu plataforma preferida (Vercel, Railway, etc.)

## 📝 Notas de Seguridad

- Nunca compartas el `JWT_SECRET`
- Cambia la contraseña del admin después del primer login
- Usa HTTPS en producción
- Mantén actualizadas las dependencias