'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Pago {
  id: string
  concepto: string
  tipo: string
  frecuencia: string | null
  monto: number
  fechaVencimiento: string
  pagado: boolean
  fechaPago: string | null
  activo: boolean
  createdAt: string
}

interface OtrasClase {
  id: string
  nombre: string
  monto: number
  frecuencia: string
  activo: boolean
  createdAt: string
}

interface Alumno {
  id: string
  nombre: string
  edad: number
  telefono: string | null
  clase: string | null
  tipoPago: string
  montoPago: number
  pagaTransporte: boolean
  montoTransporte: number | null
  transporteAsignado: string | null
  fechaCobro: string | null
  estado: string
  notasInactividad: string | null
  pagos: Pago[]
  otrasClases: OtrasClase[]
  createdAt: string
  updatedAt: string
}

export default function AlumnoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const alumnoId = params.id
  const [alumno, setAlumno] = useState<Alumno | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAgregarPago, setShowAgregarPago] = useState(false)
  const [showModificarPago, setShowModificarPago] = useState(false)
  const [showEliminarPago, setShowEliminarPago] = useState(false)
  const [pagoSeleccionado, setPagoSeleccionado] = useState<Pago | null>(null)
  const [nuevoPago, setNuevoPago] = useState({ 
    concepto: '', 
    monto: '', 
    fechaVencimiento: '', 
    frecuencia: 'unico', // 'unico', 'diario', 'semanal', 'mensual'
    recurrencias: 12 // Cuántas veces se repite
  })
  const [otrasClases, setOtrasClases] = useState<any[]>([])

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`/api/alumnos/${alumnoId}`)
        if (!response.ok) throw new Error('Error al cargar el alumno')
        const data = await response.json()
        setAlumno(data)
        
        // Cargar otras clases
        const otrasClasesResponse = await fetch(`/api/alumnos/${alumnoId}/otras-clases`)
        if (otrasClasesResponse.ok) {
          const otrasClasesData = await otrasClasesResponse.json()
          setOtrasClases(otrasClasesData)
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error('Error al cargar los datos del alumno')
      } finally {
        setIsLoading(false)
      }
    }
    if (alumnoId) fetchAlumno()
  }, [alumnoId])

  const getPagosPendientes = (): Pago[] => {
    if (!alumno) return []
    const hoy = new Date()
    return alumno.pagos.filter(pago => !pago.pagado && new Date(pago.fechaVencimiento) <= hoy && pago.monto > 0)
  }

  const handleAgregarPago = async () => {
    if (!nuevoPago.concepto || !nuevoPago.monto || !nuevoPago.fechaVencimiento) {
      toast.error('Todos los campos son requeridos')
      return
    }

    try {
      // Enviar la frecuencia al API
      const body: any = {
        concepto: nuevoPago.concepto,
        monto: parseFloat(nuevoPago.monto),
        fechaVencimiento: nuevoPago.fechaVencimiento,
        frecuencia: nuevoPago.frecuencia === 'unico' ? null : nuevoPago.frecuencia
      }
      
      // Si no es único, agregar recurrencias
      if (nuevoPago.frecuencia !== 'unico') {
        body.recurrencias = nuevoPago.recurrencias
      }

      const response = await fetch(`/api/alumnos/${alumnoId}/pagos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) throw new Error('Error al agregar pago')

      const mensaje = nuevoPago.frecuencia === 'unico' 
        ? 'Pago agregado exitosamente' 
        : `${nuevoPago.recurrencias} pagos recurrentes generados`
      toast.success(mensaje)
      setShowAgregarPago(false)
      setNuevoPago({ concepto: '', monto: '', fechaVencimiento: '', frecuencia: 'unico', recurrencias: 12 })
      
      // Recargar datos del alumno
      const res = await fetch(`/api/alumnos/${alumnoId}`)
      const data = await res.json()
      setAlumno(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al agregar pago')
    }
  }

  const handleModificarPago = async () => {
    if (!pagoSeleccionado) return

    try {
      const response = await fetch(`/api/alumnos/${alumnoId}/pagos/${pagoSeleccionado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concepto: pagoSeleccionado.concepto,
          monto: pagoSeleccionado.monto,
          fechaVencimiento: pagoSeleccionado.fechaVencimiento
        })
      })

      if (!response.ok) throw new Error('Error al modificar pago')

      toast.success('Pago modificado exitosamente')
      setShowModificarPago(false)
      setPagoSeleccionado(null)
      
      // Recargar datos del alumno
      const res = await fetch(`/api/alumnos/${alumnoId}`)
      const data = await res.json()
      setAlumno(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al modificar pago')
    }
  }

  const handleEliminarPago = async () => {
    if (!pagoSeleccionado) return

    try {
      const response = await fetch(`/api/alumnos/${alumnoId}/pagos/${pagoSeleccionado.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Error al eliminar pago')

      toast.success('Pago eliminado exitosamente')
      setShowEliminarPago(false)
      setPagoSeleccionado(null)
      
      // Recargar datos del alumno
      const res = await fetch(`/api/alumnos/${alumnoId}`)
      const data = await res.json()
      setAlumno(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al eliminar pago')
    }
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
          <button
            disabled
            className="px-4 py-2 bg-green-500/30 text-green-100 rounded-xl cursor-not-allowed opacity-50"
          >
            Registrar Pago
          </button>
        </div>
      </div>

      {pagosPendientes.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
          <div>
            <h3 className="font-semibold text-red-800">Pago Pendiente</h3>
            <p className="text-sm text-red-700">{pagosPendientes.length} pago(s) por ${pagosPendientes.reduce((s, p) => s + Number(p.monto || 0), 0).toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h3 className="font-semibold mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="font-medium">{alumno.telefono || 'No registrado'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Edad</p>
            <p className="font-medium">{alumno.edad} años</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Grado</p>
            <p className="font-medium">{alumno.clase || 'No asignado'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Estado</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${alumno.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{alumno.estado}</span>
            {alumno.estado === 'Retirado' && alumno.notasInactividad && (
              <p className="text-xs text-red-600 mt-1 italic">{alumno.notasInactividad}</p>
            )}
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
            <p className="text-sm text-gray-500">Fecha de Cobro</p>
            <p className="font-medium">{alumno.fechaCobro ? new Date(alumno.fechaCobro).toLocaleDateString() : 'No asignada'}</p>
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

      {/* Otras Clases */}
      {otrasClases.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border p-6">
          <h3 className="font-semibold mb-4">Otras Clases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otrasClases.map((otraClase) => (
              <div key={otraClase.id} className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{otraClase.nombre}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    otraClase.activo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {otraClase.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <p className="font-semibold text-lg">${Number(otraClase.monto).toFixed(2)}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500 capitalize">Frecuencia: {otraClase.frecuencia}</p>
                  <p className="text-xs text-gray-400">
                    Desde: {otraClase.fechaInicio ? new Date(otraClase.fechaInicio).toLocaleDateString('es-ES') : 'No definida'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Pagos Pasados/Vencidos */}
      {(() => {
        const hoy = new Date()
        const pagosPasados = alumno.pagos
          .filter(p => new Date(p.fechaVencimiento) <= hoy)
          .sort((a, b) => new Date(b.fechaVencimiento).getTime() - new Date(a.fechaVencimiento).getTime())
          .slice(0, 10)
        
        return pagosPasados.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Historial de Pagos</h3>
              <span className="text-xs text-gray-500">{pagosPasados.length} pagos vencidos</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Concepto</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Monto</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Vencimiento</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pagosPasados.map((pago) => (
                    <tr key={pago.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pago.concepto}</span>
                          {pago.frecuencia && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded capitalize">
                              {pago.frecuencia}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-3 font-medium">${Number(pago.monto).toFixed(2)}</td>
                      <td className="py-2 px-3">
                        {new Date(pago.fechaVencimiento).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pago.pagado 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {pago.pagado ? 'Pagado' : 'Vencido'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null
      })()}


      {/* Modal Agregar Pago */}
      {showAgregarPago && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Agregar Otro Pago</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                <input
                  type="text"
                  value={nuevoPago.concepto}
                  onChange={(e) => setNuevoPago({ ...nuevoPago, concepto: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ej: Materiales, Uniforme, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={nuevoPago.monto}
                  onChange={(e) => setNuevoPago({ ...nuevoPago, monto: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                <input
                  type="date"
                  value={nuevoPago.fechaVencimiento}
                  onChange={(e) => setNuevoPago({ ...nuevoPago, fechaVencimiento: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Recurrencia</label>
                <select
                  value={nuevoPago.frecuencia}
                  onChange={(e) => setNuevoPago({ ...nuevoPago, frecuencia: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="unico">Único (una vez)</option>
                  <option value="diario">Diario</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensual">Mensual</option>
                </select>
              </div>
              {nuevoPago.frecuencia !== 'unico' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Recurrencias</label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={nuevoPago.recurrencias}
                    onChange={(e) => setNuevoPago({ ...nuevoPago, recurrencias: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Se generarán {nuevoPago.recurrencias} pagos consecutivos</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAgregarPago(false)
                  setNuevoPago({ concepto: '', monto: '', fechaVencimiento: '', frecuencia: 'unico', recurrencias: 12 })
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregarPago}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-200"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modificar Pago */}
      {showModificarPago && pagoSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Modificar Pago</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                <input
                  type="text"
                  value={pagoSeleccionado.concepto}
                  onChange={(e) => setPagoSeleccionado({ ...pagoSeleccionado, concepto: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pagoSeleccionado.monto}
                  onChange={(e) => setPagoSeleccionado({ ...pagoSeleccionado, monto: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                <input
                  type="date"
                  value={pagoSeleccionado.fechaVencimiento.split('T')[0]}
                  onChange={(e) => setPagoSeleccionado({ ...pagoSeleccionado, fechaVencimiento: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModificarPago(false)
                  setPagoSeleccionado(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleModificarPago}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar Pago */}
      {showEliminarPago && pagoSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Eliminar Pago</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar el pago "{pagoSeleccionado.concepto}" por ${pagoSeleccionado.monto}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEliminarPago(false)
                  setPagoSeleccionado(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminarPago}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}