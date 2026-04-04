import { PrismaClient, Prisma } from '@prisma/client'

let prisma: PrismaClient

async function getPrisma(): Promise<PrismaClient> {
  if (prisma) return prisma
  // ensure DATABASE_URL is available (try prisma.config.ts as fallback)
  if (!process.env.DATABASE_URL) {
    try {
      const cfg = (await import('../prisma.config.ts')).default
      process.env.DATABASE_URL = cfg.datasource?.url
    } catch (e) {
      // ignore
    }
  }
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }

  prisma = new PrismaClient()
  return prisma
}

async function main(): Promise<void> {
  const db = await getPrisma()
  console.log('Seeding database...')

  // Upsert admin user
  await db.adminUser.upsert({
    where: { email: 'liscetaguilera2022@gmail.com' },
    update: {},
    create: {
      email: 'liscetaguilera2022@gmail.com',
      password: 'CLF#2026!Dashboard$Secure', // change in production; this is seed data
      name: 'Admin'
    }
  })

  // Create sample alumnos with pagos and otras clases
  const alumno1 = await db.alumno.upsert({
    where: { id: 'alumno-seed-1' },
    update: {},
    create: {
      id: 'alumno-seed-1',
      nombre: 'Juan Perez',
      edad: 8,
      telefono: '555-1234',
      clase: '1er Grado',
      tipoPago: 'mensual',
      montoPago: new Prisma.Decimal(120.00),
      pagaTransporte: true,
      montoTransporte: new Prisma.Decimal(20.00),
      transporteAsignado: 'Ruta A',
      fechaCobro: new Date(),
      estado: 'Activo'
    }
  })

  const alumno2 = await db.alumno.upsert({
    where: { id: 'alumno-seed-2' },
    update: {},
    create: {
      id: 'alumno-seed-2',
      nombre: 'María Gomez',
      edad: 10,
      telefono: '555-5678',
      clase: '3er Grado',
      tipoPago: 'mensual',
      montoPago: new Prisma.Decimal(130.00),
      pagaTransporte: false,
      fechaCobro: new Date(),
      estado: 'Activo'
    }
  })

  await db.pago.createMany({
    data: [
      {
        id: 'pago-1',
        alumnoId: alumno1.id,
        concepto: 'Mensualidad',
        tipo: 'cuota',
        monto: new Prisma.Decimal(120.00),
        fechaVencimiento: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        pagado: false,
        activo: true
      },
      {
        id: 'pago-2',
        alumnoId: alumno1.id,
        concepto: 'Transporte',
        tipo: 'transporte',
        monto: new Prisma.Decimal(20.00),
        fechaVencimiento: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        pagado: false,
        activo: true
      }
    ]
  })

  await db.otrasClases.create({
    data: {
      id: 'otra-1',
      alumnoId: alumno2.id,
      nombre: 'Pintura',
      monto: new Prisma.Decimal(15.00),
      frecuencia: 'mensual',
      activo: true
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    if (prisma) {
      await prisma.$disconnect()
    }
  })