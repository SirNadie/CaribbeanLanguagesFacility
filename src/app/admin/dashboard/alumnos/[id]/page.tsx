'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface Pago {
  id: string
  concepto: string
  monto: number
  fechaVencimiento: string
  pagado: boolean
  fechaPago: string | null
}

interface Alumno {
  id: string
  nombre: string
  edad: number
  telefono: string | null
  tipoPago: string
  montoPago: number
  pagaTransporte: boolean
  montoTransporte: number | null
  transporteAsignado: string | null
  pagaOtrosPagos: boolean
  otrosPagos: number | null
  fechaRegistro: string
  estado: string
  notasInactividad: string | null
  pagos: Pago[]
  createdAt: string
  updatedAt: string
}

export default function AlumnoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const alumnoId = params.id
  const [alumno, setAlumno] = useState<Alumno | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`/api/alumnos/${alumnoId}`)
        if (!response.ok) throw new Error('Error al cargar el alumno')
        const data = await response.json()
        setAlumno(data)
      } catch (error) {
        console.error('Error:', error)
        alert('Error al cargar los datos del alumno')
      } finally {
        setIsLoading(false)
      }
    }
    if (alumnoId) fetchAlumno()
  }, [alumnoId])

  const getPagosPendientes = (): Pago[] => {
    if (!alumno) return []
    const hoy = new Date()
    return alumno.pagos.filter(pago => !pago.pagado && new Date(pago.fechaVencimiento) <= hoy)
  }

  const getOtrosPagos = (): Pago[] => {
    if (!alumno) return []
    return alumno.pagos.filter(pago => pago.concepto === 'otros')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!alumno) return <div className="text-center py-12">Alumno no encontrado</div>

  const pagosPendientes = getPagosPendientes()
  const otrosPagos = getOtrosPagos()

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/alumnos" className="p-2 bg-white/20 rounded-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{alumno.nombre}</h1>
            <p className="text-indigo-100">Detalle del estudiante</p>
          </div>
          <Link href={`/admin/dashboard/alumnos/${alumnoId}/editar`} className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30">
            Editar
          </Link>
        </div>
      </div>

      {pagosPendientes.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
          <div>
            <h3 className="font-semibold text-red-800">Pago Pendiente</h3>
            <p className="text-sm text-red-700">{pagosPendientes.length} pago(s) por ${pagosPendientes.reduce((s, p) => s + p.monto, 0).toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h3 className="font-semibold mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="font-medium">{alumno.telefono || 'No registrado'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Edad</p>
            <p className="font-medium">{alumno.edad} años</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Estado</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${alumno.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{alumno.estado}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h3 className="font-semibold mb-4">Información de Pago</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Tipo de Pago</p>
            <p className="font-medium capitalize">{alumno.tipoPago}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Monto de Pago</p>
            <p className="font-medium">${alumno.montoPago}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Fecha de Registro</p>
            <p className="font-medium">{new Date(alumno.fechaRegistro).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {alumno.pagaTransporte && (
        <div className="bg-white rounded-2xl shadow-lg border p-6">
          <h3 className="font-semibold mb-4">Transporte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Monto de Transporte</p>
              <p className="font-medium">${alumno.montoTransporte}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Transporte Asignado</p>
              <p className="font-medium">{alumno.transporteAsignado}</p>
            </div>
          </div>
        </div>
      )}

      {alumno.pagaOtrosPagos && otrosPagos.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b">
            <h3 className="font-semibold">Otros Pagos</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Concepto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {otrosPagos.map(pago => (
                <tr key={pago.id}>
                  <td className="px-6 py-4">{pago.concepto}</td>
                  <td className="px-6 py-4">${pago.monto}</td>
                  <td className="px-6 py-4">{new Date(pago.fechaVencimiento).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${pago.pagado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {pago.pagado ? 'Pagado' : 'Pendiente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}