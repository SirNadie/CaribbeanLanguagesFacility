import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  console.log('Seeding database...')

  // Upsert admin user
  await prisma.adminUser.upsert({
    where: { email: 'liscetaguilera2022@gmail.com' },
    update: {},
    create: {
      email: 'liscetaguilera2022@gmail.com',
      password: 'CLF#2026!Dashboard$Secure', // change in production; this is seed data
      name: 'Admin'
    }
  })

  // Create sample alumnos
  await prisma.alumno.upsert({
    where: { id: 'alumno-seed-1' },
    update: {},
    create: {
      id: 'alumno-seed-1',
      nombre: 'Juan Perez',
      fechaNacimiento: new Date('2018-03-15'),
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

  await prisma.alumno.upsert({
    where: { id: 'alumno-seed-2' },
    update: {},
    create: {
      id: 'alumno-seed-2',
      nombre: 'María Gomez',
      fechaNacimiento: new Date('2015-07-22'),
      telefono: '555-5678',
      clase: '3er Grado',
      tipoPago: 'mensual',
      montoPago: new Prisma.Decimal(130.00),
      pagaTransporte: false,
      fechaCobro: new Date(),
      estado: 'Activo'
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
    await prisma.$disconnect()
  })