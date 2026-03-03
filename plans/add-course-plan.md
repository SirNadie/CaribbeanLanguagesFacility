# Plan: Agregar Curso "Fundamentos Prácticos del Manejo de Herramientas"

## Objetivo
Agregar un nuevo curso a la página de programas en https://caribbeanlanguagefacility.com/programas

## Análisis de la Estructura Actual

El archivo [`src/app/programas/page.tsx`](src/app/programas/page.tsx) contiene:

### Sección "Cursos" (lines 54-71 en español, 193-210 en inglés)
Estructura actual del array `courses`:
```typescript
{
    icon: string,        // Material Symbol nombre
    color: string,       // Clave de color (blue, purple, pink, green, orange)
    title: string,
    subtitle: string,
    audience: string,
    duration: string,
    modality: string,
    certification: string,
    features: string[]
}
```

### Colores disponibles (line 288-294)
```typescript
const colorClasses = {
    blue: { ... },
    purple: { ... },
    pink: { ... },
    green: { ... },
    orange: { ... }
};
```

---

## Plan de Implementación

### Paso 1: Agregar datos en español (line 54-71)
Agregar el nuevo curso AL INICIO del array `courses` en `content.es`:

```typescript
{
    icon: "build",  // Icono de herramientas
    color: "orange",  // Color nuevo (agregar a colorClasses)
    title: "Fundamentos Prácticos del Manejo de Herramientas",
    subtitle: "Taller práctico con Career and Skills Academy",
    audience: "Jóvenes de 13 a 25+ años",
    duration: "1 día (8:00 am - 5:00 pm)",
    modality: "Presencial | Centro Comunitario St. Charles, Princes Town",
    certification: "Certificado de Participación",
    features: [
        "Uso de herramientas manuales y eléctricas",
        "Medición y ensamblaje",
        "Proyecto práctico (caja o repisa)",
        "Instructor Bilingüe Profesional",
        "Materiales del Proyecto incluidos",
        "Desayuno, Almuerzo y Merienda incluidos"
    ]
}
```

### Paso 2: Agregar datos en inglés (line 193-210)
Agregar el nuevo curso AL INICIO del array `courses` en `content.en`:

```typescript
{
    icon: "build",
    color: "orange",
    title: "Practical Fundamentals of Tool Handling",
    subtitle: "Practical workshop with Career and Skills Academy",
    audience: "Youth ages 13 to 25+",
    duration: "1 day (8:00 am - 5:00 pm)",
    modality: "In-person | St. Charles Community Centre, Princes Town",
    certification: "Participation Certificate",
    features: [
        "Use of manual and power tools",
        "Measurement and assembly",
        "Practical project (box or shelf)",
        "Professional Bilingual Instructor",
        "Project Materials included",
        "Breakfast, Lunch and Snack included"
    ]
}
```

### Paso 3: Agregar nueva clase de color (line 288-294)
Agregar `orange` a `colorClasses` si no existe:

```typescript
orange: { 
    bg: "bg-orange-500", 
    text: "text-orange-600", 
    bgLight: "bg-orange-100", 
    panelGradient: "from-orange-500 to-orange-700" 
}
```

### Paso 4: Información de costos
Agregar campo de precio al curso (revisar si la estructura soporta precio):

El curso tiene:
- Inversión Total: $550 TTD
- Cuota de Inscripción: $100 TTD

**Nota:** La estructura actual de cursos no tiene campo de precio. Se puede agregar el precio en el campo `subtitle` o crear un nuevo campo.

---

## Detalles del Curso a Agregar

| Campo | Español | Inglés |
|-------|---------|--------|
| **Título** | Fundamentos Prácticos del Manejo de Herramientas | Practical Fundamentals of Tool Handling |
| **Subtítulo** | Taller práctico con Career and Skills Academy | Practical workshop with Career and Skills Academy |
| **Audiencia** | Jóvenes de 13 a 25+ años | Youth ages 13 to 25+ |
| **Duración** | 1 día (8:00 am - 5:00 pm) | 1 day (8:00 am - 5:00 pm) |
| **Modalidad** | Presencial \| Centro Comunitario St. Charles, Princes Town | In-person \| St. Charles Community Centre, Princes Town |
| **Certificación** | Certificado de Participación | Participation Certificate |
| **Precio** | $550 TTD (inscripción: $100 TTD) | $550 TTD (registration: $100 TTD) |

---

## Orden de Ejecución

1. ✅ Analizar estructura del archivo
2. ⬜ Modificar `content.es.courses` - agregar curso al INICIO
3. ⬜ Modificar `content.en.courses` - agregar curso al INICIO
4. ⬜ Verificar que `orange` exista en `colorClasses`
5. ⬜ Confirmar que el curso aparece antes de Asistente de Preescolar

---

## Notas Adicionales
- El curso debe aparecer ANTES de "Cursos de Asistente de Preescolar" según el usuario
- Usar array.unshift() o definir el nuevo curso primero en el array
- El icono `build` es apropiado para herramientas
- El color `orange` complementa los colores existentes
