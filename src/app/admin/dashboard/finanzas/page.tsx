'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FinanzasPage() {
  const [filtroTipo, setFiltroTipo] = useState('todos')

  // Datos de ejemplo - se conectará con el backend después
  const movimientos = [
    { id: 1, tipo: 'ingreso', concepto: 'Pago de Mensualidad', monto: 500, fecha: '29 Mar 2026', hora: '10:30', alumno: 'Juan Doe' },
    { id: 2, tipo: 'egreso', concepto: 'Compra de Materiales', monto: 150, fecha: '29 Mar 2026', hora: '08:15', alumno: null },
    { id: 3, tipo: 'ingreso', concepto: 'Pago de Transporte', monto: 200, fecha: '28 Mar 2026', hora: '16:45', alumno: 'María García' },
    { id: 4, tipo: 'ingreso', concepto: 'Pago de Matrícula', monto: 800, fecha: '28 Mar 2026', hora: '14:20', alumno: 'Carlos López' },
    { id: 5, tipo: 'egreso', concepto: 'Pago de Servicios', monto: 300, fecha: '27 Mar 2026', hora: '11:00', alumno: null },
    { id: 6, tipo: 'ingreso', concepto: 'Pago de Mensualidad', monto: 500, fecha: '27 Mar 2026', hora: '09:30', alumno: 'Ana Martínez' },
  ]

  const movimientosFiltrados = filtroTipo === 'todos' 
    ? movimientos 
    : movimientos.filter(m => m.tipo === filtroTipo)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Finanzas</h1>
              <p className="text-emerald-100 mt-1 text-sm lg:text-base">Gestión financiera completa</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center justify-center px-4 py-2.5 bg-white text-emerald-600 text-sm font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Registrar Ingreso
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2.5 bg-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Registrar Egreso
            </button>
            <Link
              href="/admin/dashboard/finanzas/categorias-egresos"
              className="inline-flex items-center justify-center px-4 py-2.5 bg-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Categorías Egreso
            </Link>
            <Link
              href="/admin/dashboard/finanzas/categorias-ingresos"
              className="inline-flex items-center justify-center px-4 py-2.5 bg-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Categorías Ingreso
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por concepto o alumno..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            >
              <option value="todos">Todos</option>
              <option value="ingreso">Ingresos</option>
              <option value="egreso">Egresos</option>
            </select>
          </div>
          <div className="sm:w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Movements List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Todos los Movimientos ({movimientosFiltrados.length})</h3>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alumno</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {movimientosFiltrados.map((movimiento) => (
                <tr key={movimiento.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      movimiento.tipo === 'ingreso' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {movimiento.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movimiento.concepto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movimiento.alumno || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movimiento.fecha} {movimiento.hora}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span className={movimiento.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'}>
                      {movimiento.tipo === 'ingreso' ? '+' : '-'}TTD {movimiento.monto}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-gray-100">
          {movimientosFiltrados.map((movimiento) => (
            <div key={movimiento.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  movimiento.tipo === 'ingreso' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {movimiento.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}
                </span>
                <span className={`text-sm font-bold ${movimiento.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                  {movimiento.tipo === 'ingreso' ? '+' : '-'}TTD {movimiento.monto}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900">{movimiento.concepto}</p>
              <p className="text-xs text-gray-500 mt-1">
                {movimiento.alumno && `${movimiento.alumno} • `}
                {movimiento.fecha} {movimiento.hora}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}