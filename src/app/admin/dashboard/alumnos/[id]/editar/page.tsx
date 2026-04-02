'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function EditarAlumnoPage() {
  const params = useParams()
  const router = useRouter()
  const alumnoId = params.id
  
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    // Datos del alumno
    nombre: '',
    edad: '',
    telefono: '',
    
    // Pago de clases
    tipoPago: 'mensual',
    montoPago: '',
    
    // Transporte
    pagaTransporte: false,
    montoTransporte: '',
    transporteAsignado: '',
    
    // Otros pagos (solo lectura por ahora)
    pagaOtrosPagos: false,
    otrosPagos: '',
    
    // Registro
    fechaRegistro: '',
    
    // Estado
    estado: 'Activo',
    notasInactividad: ''
  })

  // Cargar datos del alumno
  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`/api/alumnos/${alumnoId}`)
        if (!response.ok) {
          throw new Error('Error al cargar el alumno')
        }
        const alumno = await response.json()
        setFormData({
          nombre: alumno.nombre,
          edad: alumno.edad.toString(),
          telefono: alumno.telefono || '',
          tipoPago: alumno.tipoPago,
          montoPago: alumno.montoPago.toString(),
          pagaTransporte: alumno.pagaTransporte,
          montoTransporte: alumno.montoTransporte?.toString() || '',
          transporteAsignado: alumno.transporteAsignado || '',
          pagaOtrosPagos: alumno.pagaOtrosPagos,
          otrosPagos: alumno.otrosPagos?.toString() || '',
          fechaRegistro: new Date(alumno.fechaRegistro).toISOString().split('T')[0],
          estado: alumno.estado,
          notasInactividad: alumno.notasInactividad || ''
        })
      } catch (error) {
        console.error('Error al cargar alumno:', error)
        alert('Error al cargar los datos del alumno')
      } finally {
        setIsLoadingData(false)
      }
    }

    if (alumnoId) {
      fetchAlumno()
    }
  }, [alumnoId])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/alumnos/${alumnoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          edad: parseInt(formData.edad),
          telefono: formData.telefono || null,
          montoPago: parseFloat(formData.montoPago),
          montoTransporte: formData.pagaTransporte ? parseFloat(formData.montoTransporte) : null,
          transporteAsignado: formData.pagaTransporte ? formData.transporteAsignado : null,
          otrosPagos: formData.pagaOtrosPagos ? parseFloat(formData.otrosPagos) : null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al actualizar el alumno')
      }

      alert('Cambios guardados exitosamente')
      router.push(`/admin/dashboard/alumnos/${alumnoId}`)
    } catch (error) {
      console.error('Error al actualizar alumno:', error)
      alert(error instanceof Error ? error.message : 'Error al actualizar el alumno')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del alumno...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/dashboard/alumnos/${alumnoId}`}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Editar Alumno</h1>
              <p className="text-indigo-100 mt-1 text-sm lg:text-base">Modifica la información del estudiante</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Sección 1: Datos del Alumno */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Datos del Alumno</h3>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Alumno <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edad <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.edad}
                onChange={(e) => handleInputChange('edad', e.target.value)}
                placeholder="12"
                min="1"
                max="99"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                placeholder="+591 70000000"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Opcional</p>
            </div>
          </div>
        </div>

        {/* Sección 2: Pago de Clases */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Pago de Clases</h3>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Pago <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.tipoPago}
                onChange={(e) => handleInputChange('tipoPago', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {formData.tipoPago === 'diario' && 'El alumno debe pagar cada día'}
                {formData.tipoPago === 'semanal' && 'El alumno debe pagar cada semana'}
                {formData.tipoPago === 'mensual' && 'El alumno debe pagar cada mes'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.montoPago}
                onChange={(e) => handleInputChange('montoPago', e.target.value)}
                placeholder="500.00"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Monto que el alumno debe pagar según el tipo</p>
            </div>
          </div>
        </div>

        {/* Sección 3: Transporte */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Transporte</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ¿Paga Transporte? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('pagaTransporte', true)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.pagaTransporte
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sí
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('pagaTransporte', false)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    !formData.pagaTransporte
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    No
                  </div>
                </button>
              </div>
            </div>
            
            {formData.pagaTransporte && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto de Transporte ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.montoTransporte}
                    onChange={(e) => handleInputChange('montoTransporte', e.target.value)}
                    placeholder="200.00"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    required={formData.pagaTransporte}
                  />
                  <p className="text-xs text-gray-500 mt-1">Monto adicional por servicio de transporte</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transporte Asignado <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.transporteAsignado}
                    onChange={(e) => handleInputChange('transporteAsignado', e.target.value)}
                    placeholder="Transporte García"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    required={formData.pagaTransporte}
                  />
                  <p className="text-xs text-gray-500 mt-1">Nombre del servicio de transporte</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección 4: Otros Pagos (Solo lectura por ahora) */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Otros Pagos</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ¿Tiene Otros Pagos? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('pagaOtrosPagos', true)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.pagaOtrosPagos
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sí
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('pagaOtrosPagos', false)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    !formData.pagaOtrosPagos
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    No
                  </div>
                </button>
              </div>
            </div>
            
            {formData.pagaOtrosPagos && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto de Otros Pagos ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.otrosPagos}
                  onChange={(e) => handleInputChange('otrosPagos', e.target.value)}
                  placeholder="100.00"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  required={formData.pagaOtrosPagos}
                />
                <p className="text-xs text-gray-500 mt-1">Monto de otros pagos variables (se gestionarán después)</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección 5: Registro y Estado */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Registro y Estado</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Registro
                </label>
                <input
                  type="date"
                  value={formData.fechaRegistro}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Esta fecha no se puede modificar</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado del Alumno <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Activo">Activo</option>
                  <option value="Retirado">Retirado</option>
                </select>
              </div>
            </div>
            
            {formData.estado === 'Retirado' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nota de Inactividad <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.notasInactividad}
                  onChange={(e) => handleInputChange('notasInactividad', e.target.value)}
                  placeholder="Razón del retiro del alumno..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  required={formData.estado === 'Retirado'}
                />
              </div>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link
            href={`/admin/dashboard/alumnos/${alumnoId}`}
            className="px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 text-center"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </div>
            ) : (
              'Guardar Cambios'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}