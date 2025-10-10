export default function FAQSkeleton() {
    return (
        <section className="w-full py-5 md:py-10 container mx-auto">
            <div className="container max-w-3xl mx-auto flex flex-col gap-4 animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="w-full border p-4 md:p-6 rounded-md border-gray-200"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            <div className="w-10 h-10 bg-gray-200 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
