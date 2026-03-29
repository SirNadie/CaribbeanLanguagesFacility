'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Categoria {
  id: number
  concepto: string
  monto: number
}

export default function CategoriasEgresosPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: 1, concepto: 'Dance Teacher', monto: 500 },
    { id: 2, concepto: 'Compra de Materiales', monto: 150 },
    { id: 3, concepto: 'Pago de Servicios', monto: 300 },
    { id: 4, concepto: 'Mantenimiento', monto: 200 },
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null)
  const [formData, setFormData] = useState({ concepto: '', monto: '' })

  const handleOpenModal = (categoria?: Categoria) => {
    if (categoria) {
      setEditingCategoria(categoria)
      setFormData({ concepto: categoria.concepto, monto: categoria.monto.toString() })
    } else {
      setEditingCategoria(null)
      setFormData({ concepto: '', monto: '' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCategoria(null)
    setFormData({ concepto: '', monto: '' })
  }

  const handleSave = () => {
    if (!formData.concepto || !formData.monto) return

    if (editingCategoria) {
      // Edit existing
      setCategorias(categorias.map(cat => 
        cat.id === editingCategoria.id 
          ? { ...cat, concepto: formData.concepto, monto: parseFloat(formData.monto) }
          : cat
      ))
    } else {
      // Add new
      const newCategoria: Categoria = {
        id: Math.max(...categorias.map(c => c.id)) + 1,
        concepto: formData.concepto,
        monto: parseFloat(formData.monto)
      }
      setCategorias([...categorias, newCategoria])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      setCategorias(categorias.filter(cat => cat.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard/finanzas"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Categorías de Egreso</h1>
              <p className="text-orange-100 mt-1 text-sm lg:text-base">Gestiona las categorías de gastos</p>
            </div>
          </div>
          
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar Categoría
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Categorías ({categorias.length})</h3>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categorias.map((categoria) => (
                <tr key={categoria.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{categoria.concepto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TTD {categoria.monto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleOpenModal(categoria)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(categoria.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-gray-100">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">{categoria.concepto}</p>
                <span className="text-sm font-semibold text-gray-900">TTD {categoria.monto}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleOpenModal(categoria)}
                  className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(categoria.id)}
                  className="text-sm text-red-600 hover:text-red-900 font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingCategoria ? 'Editar Categoría' : 'Agregar Categoría'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concepto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.concepto}
                  onChange={(e) => setFormData({...formData, concepto: e.target.value})}
                  placeholder="Ej: Dance Teacher"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto (TTD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.monto}
                  onChange={(e) => setFormData({...formData, monto: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                >
                  {editingCategoria ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}