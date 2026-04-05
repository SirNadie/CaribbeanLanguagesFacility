'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Transporte {
  id: string
  nombre: string
}

export default function EditarAlumnoPage() {
  const params = useParams()
  const router = useRouter()
  const alumnoId = params.id
  
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [transportes, setTransportes] = useState<Transporte[]>([])
  const [nombresClases, setNombresClases] = useState<string[]>([])
  
  useEffect(() => {
    fetch('/api/transportes')
      .then(res => res.ok ? res.json() : [])
      .then(data => setTransportes(data))
      .catch(() => setTransportes([]))
    
    fetch('/api/otras-clases/nombres')
      .then(res => res.ok ? res.json() : [])
      .then(data => setNombresClases(data))
      .catch(() => setNombresClases([]))
  }, [])
  
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    telefono: '',
    clase: '',
    tipoPago: 'mensual',
    montoPago: '',
    pagaTransporte: false,
    montoTransporte: '',
    transporteAsignado: '',
    otrasClases: [] as Array<{
      id?: string
      nombre: string
      monto: string
      frecuencia: string
      activo: boolean
      fechaInicio: string
    }>,
    fechaRegistro: '',
    estado: 'Activo',
    notasInactividad: ''
  })

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`/api/alumnos/${alumnoId}`)
        if (!response.ok) throw new Error('Error al cargar el alumno')
        const alumno = await response.json()
        
        const otrasClasesResponse = await fetch(`/api/alumnos/${alumnoId}/otras-clases`)
        const otrasClasesData = otrasClasesResponse.ok ? await otrasClasesResponse.json() : []
        
        const fechaCobroStr = alumno.fechaCobro ? new Date(alumno.fechaCobro).toISOString().split('T')[0] : ''
          
        setFormData({
          nombre: alumno.nombre,
          fechaNacimiento: alumno.fechaNacimiento ? new Date(alumno.fechaNacimiento).toISOString().split('T')[0] : '',
          telefono: alumno.telefono || '',
          clase: alumno.clase || '',
          tipoPago: alumno.tipoPago,
          montoPago: alumno.montoPago.toString(),
          pagaTransporte: alumno.pagaTransporte,
          montoTransporte: alumno.montoTransporte?.toString() || '',
          transporteAsignado: alumno.transporteAsignado || '',
          otrasClases: otrasClasesData.map((oc: any) => ({
            id: oc.id,
            nombre: oc.nombre,
            monto: oc.monto.toString(),
            frecuencia: oc.frecuencia,
            activo: oc.activo,
            fechaInicio: oc.fechaInicio ? new Date(oc.fechaInicio).toISOString().split('T')[0] : ''
          })),
          fechaRegistro: fechaCobroStr,
          estado: alumno.estado,
          notasInactividad: alumno.notasInactividad || ''
        })
      } catch (error) {
        console.error('Error al cargar alumno:', error)
        toast.error('Error al cargar los datos del alumno')
      } finally {
        setIsLoadingData(false)
      }
    }

    if (alumnoId) fetchAlumno()
  }, [alumnoId])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEliminarClase = async (index: number, id?: string) => {
    if (id) {
      await fetch(`/api/alumnos/${alumnoId}/otras-clases?otraClaseId=${id}`, { method: 'DELETE' })
      // Recargar nombres de clases disponibles
      const res = await fetch('/api/otras-clases/nombres')
      if (res.ok) {
        const data = await res.json()
        setNombresClases(data)
      }
    }
    setFormData(prev => ({ ...prev, otrasClases: prev.otrasClases.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/alumnos/${alumnoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          telefono: formData.telefono || null,
          clase: formData.clase || null,
          montoPago: formData.montoPago ? parseFloat(formData.montoPago) : 0,
          montoTransporte: formData.pagaTransporte ? parseFloat(formData.montoTransporte) : null,
          transporteAsignado: formData.pagaTransporte ? formData.transporteAsignado : null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al actualizar el alumno')
      }

      for (const otraClase of formData.otrasClases) {
        if (otraClase.nombre && otraClase.monto) {
          const otraClaseData = {
            nombre: otraClase.nombre,
            monto: parseFloat(otraClase.monto),
            frecuencia: otraClase.frecuencia,
            activo: otraClase.activo,
            fechaInicio: otraClase.fechaInicio || null
          }

          if (otraClase.id) {
            await fetch(`/api/alumnos/${alumnoId}/otras-clases`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...otraClaseData, otraClaseId: otraClase.id })
            })
          } else {
            await fetch(`/api/alumnos/${alumnoId}/otras-clases`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(otraClaseData)
            })
          }
        }
      }

      toast.success('Cambios guardados exitosamente')
      router.push(`/admin/dashboard/alumnos/${alumnoId}`)
    } catch (error) {
      console.error('Error al actualizar alumno:', error)
      toast.error(error instanceof Error ? error.message : 'Error al actualizar el alumno')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/alumnos/${alumnoId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Error al eliminar el alumno')
      toast.success('Alumno eliminado exitosamente')
      router.push('/admin/dashboard/alumnos')
    } catch (error) {
      console.error('Error al eliminar alumno:', error)
      toast.error('Error al eliminar el alumno')
      setIsDeleting(false)
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/admin/dashboard/alumnos/${alumnoId}`} className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm">
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

      <form onSubmit={handleSubmit} className="space-y-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Alumno <span className="text-red-500">*</span></label>
              <input type="text" value={formData.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} placeholder="Juan Pérez" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento <span className="text-red-500">*</span></label>
              <input type="date" value={formData.fechaNacimiento} onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input type="tel" value={formData.telefono} onChange={(e) => handleInputChange('telefono', e.target.value)} placeholder="+591 70000000" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clase</label>
              <select value={formData.clase || ''} onChange={(e) => handleInputChange('clase', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Seleccionar clase</option>
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
            </div>
          </div>
        </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Pago <span className="text-red-500">*</span></label>
              <select value={formData.tipoPago} onChange={(e) => handleInputChange('tipoPago', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" required>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monto ($)</label>
              <input type="number" step="0.01" value={formData.montoPago} onChange={(e) => handleInputChange('montoPago', e.target.value)} placeholder="500.00" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" />
            </div>
          </div>
        </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-3">¿Paga Transporte? <span className="text-red-500">*</span></label>
              <div className="flex gap-4">
                <button type="button" onClick={() => handleInputChange('pagaTransporte', true)} className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${formData.pagaTransporte ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Sí
                  </div>
                </button>
                <button type="button" onClick={() => handleInputChange('pagaTransporte', false)} className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${!formData.pagaTransporte ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    No
                  </div>
                </button>
              </div>
            </div>
            {formData.pagaTransporte && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monto de Transporte ($) <span className="text-red-500">*</span></label>
                  <input type="number" step="0.01" value={formData.montoTransporte} onChange={(e) => handleInputChange('montoTransporte', e.target.value)} placeholder="200.00" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200" required={formData.pagaTransporte} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transporte Asignado <span className="text-red-500">*</span></label>
                  <select value={formData.transporteAsignado} onChange={(e) => handleInputChange('transporteAsignado', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200" required={formData.pagaTransporte}>
                    <option value="">Seleccionar transporte</option>
                    {transportes.map(t => (<option key={t.id} value={t.nombre}>{t.nombre}</option>))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Otras Clases</h3>
              </div>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, otrasClases: [...prev.otrasClases, { nombre: '', monto: '', frecuencia: 'mensual', activo: false, fechaInicio: '' }] }))} className="px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-xl hover:bg-orange-700 transition-all duration-200">+ Agregar Clase</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {formData.otrasClases.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay otras clases configuradas</p>
            ) : (
              formData.otrasClases.map((otraClase, index) => (
                <div key={otraClase.id || index} className="border border-gray-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => { const nuevasClases = [...formData.otrasClases]; nuevasClases[index].activo = !nuevasClases[index].activo; setFormData(prev => ({ ...prev, otrasClases: nuevasClases })) }} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${otraClase.activo ? 'bg-orange-600' : 'bg-gray-200'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${otraClase.activo ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className="text-sm font-medium text-gray-700">{otraClase.nombre || 'Nueva Clase'}</span>
                    </div>
                    <button type="button" onClick={() => handleEliminarClase(index, otraClase.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <div className="flex gap-1">
                        <select value={nombresClases.includes(otraClase.nombre) ? otraClase.nombre : ''} onChange={(e) => { const nuevasClases = [...formData.otrasClases]; nuevasClases[index].nombre = e.target.value; setFormData(prev => ({ ...prev, otrasClases: nuevasClases })) }} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200">
                          <option value="">Seleccionar...</option>
                          {nombresClases.map(nombre => (<option key={nombre} value={nombre}>{nombre}</option>))}
                        </select>
                        <input type="text" value={!nombresClases.includes(otraClase.nombre) ? otraClase.nombre : ''} onChange={(e) => { const nuevasClases = [...formData.otrasClases]; nuevasClases[index].nombre = e.target.value; setFormData(prev => ({ ...prev, otrasClases: nuevasClases })) }} placeholder="Nueva" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
                      <input type="number" step="0.01" value={otraClase.monto} onChange={(e) => { const nuevasClases = [...formData.otrasClases]; nuevasClases[index].monto = e.target.value; setFormData(prev => ({ ...prev, otrasClases: nuevasClases })) }} placeholder="50.00" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia</label>
                      <select value={otraClase.frecuencia} onChange={(e) => { const nuevasClases = [...formData.otrasClases]; nuevasClases[index].frecuencia = e.target.value; setFormData(prev => ({ ...prev, otrasClases: nuevasClases })) }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200">
                        <option value="semanal">Semanal</option>
                        <option value="mensual">Mensual</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                      <input type="date" value={otraClase.fechaInicio} onChange={(e) => { const nuevasClases = [...formData.otrasClases]; nuevasClases[index].fechaInicio = e.target.value; setFormData(prev => ({ ...prev, otrasClases: nuevasClases })) }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Registro y Estado</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Cobro</label>
                <input type="date" value={formData.fechaRegistro} onChange={(e) => handleInputChange('fechaRegistro', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado del Alumno <span className="text-red-500">*</span></label>
                <select value={formData.estado} onChange={(e) => handleInputChange('estado', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
                  <option value="Activo">Activo</option>
                  <option value="Retirado">Retirado</option>
                </select>
              </div>
            </div>
            {formData.estado === 'Retirado' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nota de Inactividad <span className="text-red-500">*</span></label>
                <textarea value={formData.notasInactividad} onChange={(e) => handleInputChange('notasInactividad', e.target.value)} placeholder="Razón del retiro del alumno..." rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none" required={formData.estado === 'Retirado'} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button type="button" onClick={() => setShowDeleteModal(true)} className="px-6 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Eliminar Alumno
          </button>
          <Link href={`/admin/dashboard/alumnos/${alumnoId}`} className="px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 text-center">Cancelar</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {isLoading ? (<div className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Guardando...</div>) : 'Guardar Cambios'}
          </button>
        </div>
      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">¿Eliminar este alumno?</h3>
                  <p className="text-sm text-gray-600">Esta acción no se puede deshacer.</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">Se eliminarán todos los datos asociados al alumno, incluyendo sus pagos y registros. Esta acción es permanente.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200">Cancelar</button>
                <button onClick={handleDelete} disabled={isDeleting} className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                  {isDeleting ? (<><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Eliminando...</>) : (<><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Eliminar Alumno</>)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
