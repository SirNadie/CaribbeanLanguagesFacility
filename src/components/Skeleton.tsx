export function SectionSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-10 py-24">
                <div className="h-10 bg-gray-200 rounded-lg w-1/3 mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="min-h-[90vh] flex items-center justify-center pt-20 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="flex flex-col gap-6">
                    <div className="h-8 bg-gray-200 rounded-full w-48"></div>
                    <div className="h-14 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-14 bg-gray-200 rounded-lg w-5/6"></div>
                    <div className="h-6 bg-gray-200 rounded w-4/5 mt-2"></div>
                    <div className="flex gap-4 mt-6">
                        <div className="h-14 bg-gray-200 rounded-full w-40"></div>
                        <div className="h-14 bg-gray-200 rounded-full w-40"></div>
                        <div className="h-14 bg-gray-200 rounded-full w-32"></div>
                    </div>
                </div>
                <div className="relative w-full aspect-[4/5] lg:aspect-square max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-gray-200 rounded-[2rem]"></div>
                </div>
            </div>
        </div>
    );
}