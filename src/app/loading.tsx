export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="relative flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" aria-hidden="true" />
                <p className="text-primary font-bold animate-pulse" aria-live="polite">Cargando… / Loading…</p>
            </div>
        </div>
    );
}
