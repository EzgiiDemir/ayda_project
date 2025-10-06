
export default function FooterSkeleton() {
    return (
        <footer className="mt-auto bg-primary-blue pt-10 flex flex-col gap-10 animate-pulse">
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto px-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-md p-5 h-64">
                        <div className="w-10 h-10 bg-gray-200 rounded-md mx-auto mb-4" />
                        <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-2 py-4 bg-gray-600/30">
                <div className="h-4 bg-gray-200/50 rounded w-48" />
                <div className="h-4 bg-gray-200/50 rounded w-32" />
            </div>
        </footer>
    );
}