// Skeleton loading component for the homepage
export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Header Skeleton */}
            <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm py-3">
                <div className="flex items-center justify-between px-4 sm:px-10 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </header>

            {/* Main Content Skeleton */}
            <main className="flex-1 pt-16">
                {/* Hero Skeleton */}
                <section className="min-h-[90vh] flex items-center justify-center pt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="flex flex-col gap-6">
                            <div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-14 w-3/4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
                            <div className="flex gap-4 pt-6">
                                <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse" />
                                <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse" />
                            </div>
                        </div>
                        <div className="relative w-full aspect-[4/5] lg:aspect-square max-w-lg mx-auto">
                            <div className="w-full h-full bg-gray-200 rounded-[2rem] animate-pulse" />
                        </div>
                    </div>
                </section>

                {/* Section Skeletons */}
                {[1, 2, 3, 4].map((i) => (
                    <section key={i} className="py-24 sm:py-32 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-6">
                                    <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                                    <div className="h-6 w-4/5 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-6 w-3/5 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="h-[500px] bg-gray-200 rounded-[2.5rem] animate-pulse" />
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            {/* Footer Skeleton */}
            <footer className="bg-slate-900 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="col-span-2 lg:col-span-1 space-y-4">
                            <div className="h-16 w-16 bg-gray-700 rounded-2xl animate-pulse" />
                            <div className="h-8 w-48 bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-28 bg-gray-700 rounded animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-36 bg-gray-700 rounded animate-pulse" />
                        </div>
                        <div className="col-span-2 lg:col-span-1 space-y-4">
                            <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-40 bg-gray-700 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
