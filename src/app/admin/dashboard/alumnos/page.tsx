'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { calcularEdad, formatearFechaCumple } from '@/lib/utils'

interface Pago {
  id: string
  concepto: string
  monto: number
  fechaVencimiento: string
  pagado: boolean
  fechaPago: string | null
  frecuencia: string | null
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
  fechaNacimiento: string
  telefono: string | null
  clase: string | null
  tipoPago: string
  montoPago: number
  pagaTransporte: boolean
  montoTransporte: number | null
  fechaCobro: string | null
  estado: string
  notasInactividad: string | null
  pagos: Pago[]
  otrasClases: OtrasClase[]
  createdAt: string
  updatedAt: string
}

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')
  const [filtroPago, setFiltroPago] = useState('')
  const [filtroClase, setFiltroClase] = useState('')

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('/api/alumnos')
        if (!response.ok) {
          throw new Error('Error al cargar alumnos')
        }
        const data = await response.json()
        setAlumnos(data)
      } catch (error) {
        console.error('Error al cargar alumnos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlumnos()
  }, [])

  // Función para verificar si un alumno tiene pagos pendientes
  const tienePagosPendientes = (alumno: Alumno): boolean => {
    const hoy = new Date()
    return alumno.pagos.some(pago => {
      const fechaVencimiento = new Date(pago.fechaVencimiento)
      return !pago.pagado && fechaVencimiento <= hoy && pago.monto > 0
    })
  }

  // Función para obtener el próximo pago pendiente
  const getProximoPagoPendiente = (alumno: Alumno): Pago | null => {
    const hoy = new Date()
    const pagosPendientes = alumno.pagos
      .filter(pago => {
        const fechaVencimiento = new Date(pago.fechaVencimiento)
        return !pago.pagado && fechaVencimiento <= hoy && pago.monto > 0
      })
      .sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime())
    
    return pagosPendientes[0] || null
  }

  // Función para obtener la suma total de pagos pendientes (solo pagos registrados y vencidos)
  const getTotalPagosPendientes = (alumno: Alumno): number => {
    const hoy = new Date()
    return alumno.pagos
      .filter(pago => {
        const fechaVencimiento = new Date(pago.fechaVencimiento)
        return !pago.pagado && fechaVencimiento <= hoy && pago.monto > 0
      })
      .reduce((sum, pago) => sum + Number(pago.monto), 0)
  }

  // Función para filtrar alumnos
  const alumnosFiltrados = alumnos.filter(alumno => {
    // Filtro por nombre
    const coincideBusqueda = busqueda === '' || 
      alumno.nombre.toLowerCase().includes(busqueda.toLowerCase())
    
    // Filtro por estado
    const coincideEstado = filtroEstado === '' || 
      alumno.estado === filtroEstado
    
    // Filtro por tipo de pago
    const coincidePago = filtroPago === '' || 
      (filtroPago === 'al-dia' && !tienePagosPendientes(alumno)) ||
      (filtroPago === 'pago-pendiente' && tienePagosPendientes(alumno))
    
    // Filtro por grado
    const coincideClase = filtroClase === '' || 
      alumno.clase === filtroClase
    
    return coincideBusqueda && coincideEstado && coincidePago && coincideClase
  })

  const totalAlumnos = alumnos.length
  const alumnosActivos = alumnos.filter(a => a.estado === 'Activo').length
  const alumnosConPagosPendientes = alumnos.filter(a => tienePagosPendientes(a)).length
  const alumnosAlDia = alumnos.filter(a => !tienePagosPendientes(a) && a.estado === 'Activo').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Alumnos</h1>
            <p className="text-indigo-100">Gestiona todos los estudiantes registrados en el sistema</p>
          </div>
          <Link
            href="/admin/dashboard/alumnos/crear"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-indigo-600 text-sm font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Alumno
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '--' : totalAlumnos}</p>
              <p className="text-xs text-gray-500">Total Alumnos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '--' : alumnosActivos}</p>
              <p className="text-xs text-gray-500">Activos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '--' : alumnosAlDia}</p>
              <p className="text-xs text-gray-500">Al Día</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '--' : alumnosConPagosPendientes}</p>
              <p className="text-xs text-gray-500">Pago Pendiente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filtroClase}
              onChange={(e) => setFiltroClase(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-700 text-sm"
            >
              <option value="">Todos los grados</option>
              <option value="1er Grado">1er Grado</option>
              <option value="2do Grado">2do Grado</option>
              <option value="3er Grado">3er Grado</option>
              <option value="4to Grado">4to Grado</option>
              <option value="5to Grado">5to Grado</option>
              <option value="6to Grado">6to Grado</option>
              <option value="7mo Grado">7mo Grado</option>
              <option value="8vo Grado">8vo Grado</option>
              <option value="9no Grado">9no Grado</option>
            </select>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-700 text-sm"
            >
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Retirado">Retirado</option>
            </select>
            <select
              value={filtroPago}
              onChange={(e) => setFiltroPago(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-700 text-sm"
            >
              <option value="">Estado de pago</option>
              <option value="al-dia">Al día</option>
              <option value="pago-pendiente">Pago pendiente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Lista de Alumnos</h3>
                <p className="text-sm text-gray-500">Gestiona los estudiantes registrados</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Mostrando {alumnosFiltrados.length} de {totalAlumnos} alumnos</span>
            </div>
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Alumno</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo Pago</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado de Pago</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      <span className="ml-3 text-gray-600">Cargando alumnos...</span>
                    </div>
                  </td>
                </tr>
              ) : alumnosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-lg font-medium">No se encontraron alumnos</p>
                      <p className="text-sm">Intenta ajustar los filtros de búsqueda.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                alumnosFiltrados.map((alumno) => {
                  const tienePagosPend = tienePagosPendientes(alumno)
                  const totalPendiente = getTotalPagosPendientes(alumno)
                  
                  return (
                    <tr key={alumno.id} className="hover:bg-gray-50 transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/admin/dashboard/alumnos/${alumno.id}`} className="flex items-center gap-4 hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-white font-bold text-sm">
                              {alumno.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{alumno.nombre}</div>
                            <div className="text-xs text-gray-500">
                              {calcularEdad(alumno.fechaNacimiento)} años
                              {alumno.clase && ` • ${alumno.clase}`}
                              {alumno.telefono && ` • ${alumno.telefono}`}
                            </div>
                            <div className="text-xs text-gray-400">
                              Cumple: {formatearFechaCumple(alumno.fechaNacimiento)}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {alumno.estado === 'Retirado' ? (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-400">No disponible</div>
                              <div className="text-xs text-gray-400">—</div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              alumno.tipoPago === 'diario' ? 'bg-blue-100' :
                              alumno.tipoPago === 'semanal' ? 'bg-purple-100' : 'bg-green-100'
                            }`}>
                              <svg className={`w-4 h-4 ${
                                alumno.tipoPago === 'diario' ? 'text-blue-600' :
                                alumno.tipoPago === 'semanal' ? 'text-purple-600' : 'text-green-600'
                              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 capitalize">{alumno.tipoPago}</div>
                              <div className="text-xs text-gray-500">${alumno.montoPago}</div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {alumno.estado === 'Retirado' ? (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            Inactivo
                          </span>
                        ) : tienePagosPend ? (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 animate-pulse">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Pago Pendiente
                            </span>
                            <div className="text-xs text-red-600 font-medium">
                              ${totalPendiente.toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Al Día
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          alumno.estado === 'Activo'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            alumno.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          {alumno.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            disabled
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl cursor-not-allowed opacity-50 transition-all duration-200 shadow-md"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Registrar Pago
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Cargando alumnos...</span>
              </div>
            </div>
          ) : alumnosFiltrados.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-lg font-medium">No se encontraron alumnos</p>
                <p className="text-sm">Intenta ajustar los filtros de búsqueda.</p>
              </div>
            </div>
          ) : (
            alumnosFiltrados.map((alumno) => {
              const tienePagosPend = tienePagosPendientes(alumno)
              const totalPendiente = getTotalPagosPendientes(alumno)
              
              return (
                <div key={alumno.id} className="p-4 hover:bg-gray-50 transition-all duration-200 group">
                  <Link href={`/admin/dashboard/alumnos/${alumno.id}`} className="block">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                          <span className="text-white font-bold text-sm">
                            {alumno.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{alumno.nombre}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {calcularEdad(alumno.fechaNacimiento)} años
                            {alumno.clase && ` • ${alumno.clase}`}
                            {alumno.telefono && ` • ${alumno.telefono}`}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            Cumple: {formatearFechaCumple(alumno.fechaNacimiento)}
                          </div>
                        </div>
                      </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      alumno.estado === 'Activo'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        alumno.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      {alumno.estado}
                    </span>
                  </div>
                  </Link>
                  
                  <div className="space-y-2 mb-4">
                    {alumno.estado === 'Retirado' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gray-100">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600">Pago: <span className="font-medium text-gray-400">No disponible</span></span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          alumno.tipoPago === 'diario' ? 'bg-blue-100' :
                          alumno.tipoPago === 'semanal' ? 'bg-purple-100' : 'bg-green-100'
                        }`}>
                          <svg className={`w-3 h-3 ${
                            alumno.tipoPago === 'diario' ? 'text-blue-600' :
                            alumno.tipoPago === 'semanal' ? 'text-purple-600' : 'text-green-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600">Pago: <span className="font-medium text-gray-900 capitalize">{alumno.tipoPago}</span> - <span className="font-semibold">${alumno.montoPago}</span></span>
                      </div>
                    )}
                    
                    {alumno.estado === 'Retirado' ? (
                      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <span className="text-xs text-gray-700 font-semibold">Inactivo</span>
                      </div>
                    ) : tienePagosPend ? (
                      <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg border border-red-200">
                        <svg className="w-4 h-4 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-xs text-red-700 font-semibold">Total pendiente: ${totalPendiente.toFixed(2)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg border border-green-200">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-green-700 font-semibold">Al día con los pagos</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl cursor-not-allowed opacity-50 transition-all duration-200 shadow-md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Registrar Pago
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}