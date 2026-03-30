'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function PagosAlumnoPage() {
  const params = useParams()
  const alumnoId = params.id
  const [filtroMes, setFiltroMes] = useState('todos')

  // Datos de ejemplo - se conectará con el backend después
  const alumno = {
    id: alumnoId,
    nombre: 'Juan Doe',
  }

  const todosPagos = [
    { id: 1, fecha: '15 Mar 2024', monto: '$500', concepto: 'Mensualidad', metodo: 'Efectivo', estado: 'Completado' },
    { id: 2, fecha: '15 Feb 2024', monto: '$500', concepto: 'Mensualidad', metodo: 'Transferencia', estado: 'Completado' },
    { id: 3, fecha: '15 Ene 2024', monto: '$500', concepto: 'Mensualidad', metodo: 'Efectivo', estado: 'Completado' },
    { id: 4, fecha: '15 Dic 2023', monto: '$500', concepto: 'Mensualidad', metodo: 'Efectivo', estado: 'Completado' },
    { id: 5, fecha: '15 Nov 2023', monto: '$500', concepto: 'Mensualidad', metodo: 'Transferencia', estado: 'Completado' },
    { id: 6, fecha: '15 Oct 2023', monto: '$500', concepto: 'Mensualidad', metodo: 'Efectivo', estado: 'Completado' },
    { id: 7, fecha: '15 Sep 2023', monto: '$500', concepto: 'Mensualidad', metodo: 'Efectivo', estado: 'Completado' },
    { id: 8, fecha: '15 Ago 2023', monto: '$500', concepto: 'Mensualidad', metodo: 'Transferencia', estado: 'Completado' },
    { id: 9, fecha: '01 Ago 2023', monto: '$200', concepto: 'Matrícula', metodo: 'Efectivo', estado: 'Completado' },
  ]

  const pagosFiltrados = filtroMes === 'todos' 
    ? todosPagos 
    : todosPagos.filter(p => p.fecha.toLowerCase().includes(filtroMes.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/dashboard/alumnos/${alumnoId}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Historial de Pagos</h1>
            <p className="text-gray-500 mt-1">{alumno.nombre}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por mes</label>
            <select
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="todos">Todos los meses</option>
              <option value="mar">Marzo 2024</option>
              <option value="feb">Febrero 2024</option>
              <option value="ene">Enero 2024</option>
              <option value="dic">Diciembre 2023</option>
              <option value="nov">Noviembre 2023</option>
              <option value="oct">Octubre 2023</option>
              <option value="sep">Septiembre 2023</option>
              <option value="ago">Agosto 2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Todos los Pagos ({pagosFiltrados.length})</h3>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagosFiltrados.map((pago) => (
                <tr key={pago.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pago.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pago.concepto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pago.metodo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{pago.monto}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {pago.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-gray-100">
          {pagosFiltrados.map((pago) => (
            <div key={pago.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{pago.concepto}</span>
                <span className="text-sm font-semibold text-green-600">{pago.monto}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{pago.fecha}</span>
                <span>{pago.metodo}</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {pago.estado}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {pagosFiltrados.length === 0 && (
          <div className="p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">No hay pagos para el filtro seleccionado</p>
          </div>
        )}
      </div>
    </div>
  )
}