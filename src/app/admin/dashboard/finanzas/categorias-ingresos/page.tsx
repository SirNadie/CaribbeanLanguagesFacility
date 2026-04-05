'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Transporte {
  id: string
  nombre: string
  activo: boolean
}

interface OtrasClase {
  id: string
  nombre: string
  monto: number
  frecuencia: string
  activo: boolean
}

interface Alumno {
  id: string
  nombre: string
  tipoPago: string
  montoPago: number
  pagaTransporte: boolean
  montoTransporte: number | null
  transporteAsignado: string | null
  estado: string
  otrasClases: OtrasClase[]
}

interface Pago {
  id: string
  monto: number
  pagado: boolean
  tipo: string
  alumnoId: string
}

export default function CategoriasIngresosPage() {
  const [transportes, setTransportes] = useState<Transporte[]>([])
  const [alumnos, setAlumnos] = useState<Alumno[]>([])
  const [pagos, setPagos] = useState<Pago[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'crear' | 'editar'>('crear')
  const [transporteEditando, setTransporteEditando] = useState<Transporte | null>(null)
  const [nombreTransporte, setNombreTransporte] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    clases: true,
    transporte: true,
    otrasClases: true
  })

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [transportesRes, alumnosRes, pagosRes] = await Promise.all([
        fetch('/api/transportes'),
        fetch('/api/alumnos'),
        fetch('/api/pagos')
      ])
      
      if (transportesRes.ok) setTransportes(await transportesRes.json())
      if (alumnosRes.ok) {
        const alumnosData = await alumnosRes.json()
        setAlumnos(alumnosData)
      }
      if (pagosRes.ok) setPagos(await pagosRes.json())
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar los datos')
    } finally {
      setIsLoading(false)
    }
  }

  const abrirModalCrear = () => {
    setModalMode('crear')
    setTransporteEditando(null)
    setNombreTransporte('')
    setShowModal(true)
  }

  const abrirModalEditar = (transporte: Transporte) => {
    setModalMode('editar')
    setTransporteEditando(transporte)
    setNombreTransporte(transporte.nombre)
    setShowModal(true)
  }

  const handleGuardar = async () => {
    if (!nombreTransporte.trim()) {
      toast.error('El nombre es requerido')
      return
    }

    try {
      const url = modalMode === 'crear' 
        ? '/api/transportes' 
        : `/api/transportes/${transporteEditando?.id}`
      
      const method = modalMode === 'crear' ? 'POST' : 'PUT'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreTransporte })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al guardar')
      }

      toast.success(modalMode === 'crear' ? 'Transporte creado' : 'Transporte actualizado')
      setShowModal(false)
      fetchData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Eliminar este transporte?')) return

    try {
      const res = await fetch(`/api/transportes/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar')
      toast.success('Transporte eliminado')
      fetchData()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  // Alumnos activos
  const alumnosActivos = alumnos.filter(a => a.estado === 'Activo')

  // Agrupar alumnos por tipo de pago para Pagos de Clases
  const alumnosPorTipoPago = {
    semanal: alumnosActivos.filter(a => a.tipoPago === 'semanal'),
    mensual: alumnosActivos.filter(a => a.tipoPago === 'mensual')
  }

  const totalPagosClase = {
    semanal: alumnosPorTipoPago.semanal.reduce((s, a) => s + Number(a.montoPago), 0),
    mensual: alumnosPorTipoPago.mensual.reduce((s, a) => s + Number(a.montoPago), 0)
  }

  // Pagos cobrados de clases
  const pagosCobradosClases = pagos
    .filter(p => p.tipo === 'cuota' && p.pagado)
    .reduce((s, p) => s + Number(p.monto), 0)

  // Alumnos con transporte activo
  const alumnosConTransporte = alumnosActivos.filter(a => a.pagaTransporte)

  // Agrupar alumnos con transporte por nombre de transporte
  const alumnosPorTransporte: Record<string, Alumno[]> = {}
  alumnosConTransporte.forEach(a => {
    const t = a.transporteAsignado || 'Sin asignar'
    if (!alumnosPorTransporte[t]) alumnosPorTransporte[t] = []
    alumnosPorTransporte[t].push(a)
  })

  // Pagos cobrados de transporte
  const pagosCobradosTransporte = pagos
    .filter(p => p.tipo === 'transporte' && p.pagado)
    .reduce((s, p) => s + Number(p.monto), 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/finanzas" className="p-2 bg-white/20 rounded-xl hover:bg-white/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Categorías de Ingresos</h1>
            <p className="text-emerald-100">Resumen de todas las fuentes de ingreso</p>
          </div>
        </div>
      </div>

      {/* 📚 Pagos de Clases - Acordeón */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => toggleSection('clases')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span>📚</span>
            <h2 className="text-lg font-semibold text-gray-900">Pagos de Clases</h2>
            <span className="text-sm text-gray-500">({alumnosActivos.length} alumnos)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-emerald-600">
              ${(totalPagosClase.semanal + totalPagosClase.mensual).toFixed(2)}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.clases ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {expandedSections.clases && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-4">
            <div className="space-y-3">
              {/* Pago Semanal */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div
                  onClick={() => toggleSection('clasesSemanal')}
                  className="flex items-center justify-between p-3 bg-emerald-50 cursor-pointer hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📆</span>
                    <span className="font-medium">Pago Semanal</span>
                    <span className="text-sm text-gray-500">({alumnosPorTipoPago.semanal.length} alumnos)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-emerald-700">${totalPagosClase.semanal.toFixed(2)}</span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.clasesSemanal ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {expandedSections.clasesSemanal && (
                  <div className="divide-y divide-gray-100">
                    {alumnosPorTipoPago.semanal.map(alumno => (
                      <div key={alumno.id} className="flex items-center justify-between p-3 text-sm">
                        <span className="text-gray-700">{alumno.nombre}</span>
                        <span className="font-medium text-gray-900">${Number(alumno.montoPago).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pago Mensual */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div
                  onClick={() => toggleSection('clasesMensual')}
                  className="flex items-center justify-between p-3 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span className="font-medium">Pago Mensual</span>
                    <span className="text-sm text-gray-500">({alumnosPorTipoPago.mensual.length} alumnos)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-blue-700">${totalPagosClase.mensual.toFixed(2)}</span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.clasesMensual ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {expandedSections.clasesMensual && (
                  <div className="divide-y divide-gray-100">
                    {alumnosPorTipoPago.mensual.map(alumno => (
                      <div key={alumno.id} className="flex items-center justify-between p-3 text-sm">
                        <span className="text-gray-700">{alumno.nombre}</span>
                        <span className="font-medium text-gray-900">${Number(alumno.montoPago).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-emerald-600">
                ${(totalPagosClase.semanal + totalPagosClase.mensual).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 🚌 Transporte - Acordeón */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => toggleSection('transporte')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span>🚌</span>
            <h2 className="text-lg font-semibold text-gray-900">Transporte</h2>
            <span className="text-sm text-gray-500">({alumnosConTransporte.length} alumnos)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-emerald-600">
              ${alumnosConTransporte.reduce((s, a) => s + Number(a.montoTransporte || 0), 0).toFixed(2)}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.transporte ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {expandedSections.transporte && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-4">
            {transportes.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500">No hay transportes registrados</p>
                <button
                  onClick={abrirModalCrear}
                  className="mt-3 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
                >
                  + Agregar Transporte
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {transportes.map(transporte => {
                    const alumnosT = alumnosPorTransporte[transporte.nombre] || []
                    const totalT = alumnosT.reduce((s, a) => s + Number(a.montoTransporte || 0), 0)

                    return (
                      <div key={transporte.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        <div
                          className="flex items-center justify-between p-3 bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors"
                          onClick={() => toggleSection(`transporte-${transporte.id}`)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🚌</span>
                            <span className="font-medium">{transporte.nombre}</span>
                            <span className="text-sm text-gray-500">({alumnosT.length} alumnos)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-amber-700">${totalT.toFixed(2)}</span>
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections[`transporte-${transporte.id}`] ? 'rotate-180' : ''}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {expandedSections[`transporte-${transporte.id}`] && (
                          <div className="divide-y divide-gray-100">
                            {alumnosT.length === 0 ? (
                              <div className="p-3 text-sm text-gray-500 text-center">Sin alumnos asignados</div>
                            ) : (
                              alumnosT.map(alumno => (
                                <div key={alumno.id} className="flex items-center justify-between p-3 text-sm">
                                  <span className="text-gray-700">{alumno.nombre}</span>
                                  <span className="font-medium text-gray-900">${Number(alumno.montoTransporte || 0).toFixed(2)}</span>
                                </div>
                              ))
                            )}
                            <div className="flex items-center justify-between p-3 bg-gray-100">
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); abrirModalEditar(transporte); }}
                                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                  </svg>
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleEliminar(transporte.id); }}
                                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                  </svg>
                                </button>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); abrirModalCrear(); }}
                                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-200"
                              >
                                + Agregar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-emerald-600">
                    ${alumnosConTransporte.reduce((s, a) => s + Number(a.montoTransporte || 0), 0).toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 🎨 Otras Clases - Acordeón */}
      {(() => {
        const clasesMap: Record<string, { nombre: string; alumnos: { nombre: string; monto: number }[] }> = {}
        
        alumnosActivos.forEach(alumno => {
          if (alumno.otrasClases && alumno.otrasClases.length > 0) {
            alumno.otrasClases.forEach(oc => {
              if (!clasesMap[oc.nombre]) {
                clasesMap[oc.nombre] = { nombre: oc.nombre, alumnos: [] }
              }
              clasesMap[oc.nombre].alumnos.push({ nombre: alumno.nombre, monto: Number(oc.monto) || 0 })
            })
          }
        })
        
        const todasClases = Object.values(clasesMap)
        const totalGeneral = todasClases.reduce((sum, c) => 
          sum + c.alumnos.reduce((s, a) => s + a.monto, 0), 0
        )
        
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => toggleSection('otrasClases')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🎨</span>
                <h2 className="text-lg font-semibold text-gray-900">Otras Clases</h2>
                <span className="text-sm text-gray-500">({alumnosActivos.filter(a => a.otrasClases?.length > 0).length} alumnos)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-emerald-600">${totalGeneral.toFixed(2)}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.otrasClases ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {expandedSections.otrasClases && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                {todasClases.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No hay clases extra registradas</p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {todasClases.map(clase => {
                        const totalClase = clase.alumnos.reduce((s, a) => s + a.monto, 0)
                        const claseKey = `otraClase-${clase.nombre}`
                        
                        return (
                          <div key={clase.nombre} className="border border-gray-200 rounded-xl overflow-hidden">
                            <div
                              className="flex items-center justify-between p-3 bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors"
                              onClick={() => toggleSection(claseKey)}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🎨</span>
                                <span className="font-medium">{clase.nombre}</span>
                                <span className="text-sm text-gray-500">({clase.alumnos.length} alumnos)</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-purple-700">${totalClase.toFixed(2)}</span>
                                <svg
                                  className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections[claseKey] ? 'rotate-180' : ''}`}
                                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                            {expandedSections[claseKey] && (
                              <div className="divide-y divide-gray-100">
                                {clase.alumnos.map((alumno, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 text-sm">
                                    <span className="text-gray-700">{alumno.nombre}</span>
                                    <span className="font-medium text-gray-900">${alumno.monto.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-emerald-600">${totalGeneral.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )
      })()}

      {/* ➕ Extras */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>➕</span> Extras
        </h2>
        <p className="text-gray-500 text-center py-4">Pendiente de implementar (excursiones, uniformes, etc.)</p>
      </div>

      {/* Modal Crear/Editar Transporte */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {modalMode === 'crear' ? 'Agregar Transporte' : 'Editar Transporte'}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Transporte</label>
              <input
                type="text"
                value={nombreTransporte}
                onChange={(e) => setNombreTransporte(e.target.value)}
                placeholder="Ej: Ruta Norte"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardar}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
