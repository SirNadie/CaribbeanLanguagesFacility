/**
 * Calcula la edad a partir de la fecha de nacimiento
 * @param fechaNacimiento - Fecha de nacimiento (Date o string ISO)
 * @returns Edad en años
 */
export function calcularEdad(fechaNacimiento: Date | string): number {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  // Si el mes actual es menor que el mes de nacimiento,
  // o si es el mismo mes pero el día actual es menor que el día de nacimiento
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}

/**
 * Formatea una fecha de nacimiento para mostrar
 * @param fechaNacimiento - Fecha de nacimiento (Date o string ISO)
 * @param locale - Idioma para el formato (default: 'es-ES')
 * @returns Fecha formateada (ej: "15 de marzo de 2012")
 */
export function formatearFechaCumple(fechaNacimiento: Date | string, locale: string = 'es-ES'): string {
  const nacimiento = new Date(fechaNacimiento);
  return nacimiento.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Formatea una fecha para mostrar en el input date (YYYY-MM-DD)
 * @param fecha - Fecha (Date o string ISO)
 * @returns String en formato YYYY-MM-DD
 */
export function formatearParaInputDate(fecha: Date | string | null): string {
  if (!fecha) return '';
  const f = new Date(fecha);
  return f.toISOString().split('T')[0];
}
