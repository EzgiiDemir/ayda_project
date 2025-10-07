import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/api/pages';
import type { PageDoc, Block } from '@/types/page';

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale, slug } = await params;
    const doc = await getPage(slug, locale);
    if (!doc) return {};
    return {
        title: doc.metaTitle,
        description: doc.metaDescription,
        alternates: {
            languages: Object.fromEntries(
                (doc.alternates ?? []).map(a => [a.locale, `/${a.locale}/${a.slug}`])
            ),
        },
    };
}

export default async function Page({ params }: Params) {
    const { locale, slug } = await params;
    const doc: PageDoc | null = await getPage(slug, locale);
    if (!doc) notFound();

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div
                className="w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300"
                style={{
                    backgroundImage: `url('${doc.heroImage ?? ''}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                aria-label={doc.pageTitle}
            />

            {/* item ortada, yazılar soldan */}
            <div className="container mx-auto max-w-3xl w-full px-4 py-5 md:py-10">
                <p className="text-secondary text-lg md:text-xl font-medium uppercase text-left">
                    {doc.pageTitle}
                </p>

                <div className="flex flex-col gap-7 md:gap-10 text-sm md:text-base text-muted-foreground">
                    {doc.sections
                        .filter(s => s.isActive !== false)
                        .sort((a, b) => a.order - b.order)
                        .map(s => (
                            <section key={s.id} className="flex flex-col gap-3">
                                {s.title && (
                                    <h2 className="text-primary-weak text-sm md:text-base capitalize font-medium text-left">
                                        {s.title}
                                    </h2>
                                )}

                                <div className="flex flex-col gap-2">
                                    {s.blocks.map((b: Block, i) => {
                                        switch (b.type) {
                                            case 'p':
                                                return <p key={i} className="text-left">{b.value}</p>;
                                            case 'h3':
                                                return <h3 key={i} className="font-semibold mt-2 text-left">{b.value}</h3>;
                                            case 'ul':
                                                return (
                                                    <ul key={i} className="list-disc ml-[30px] space-y-1">
                                                        {b.items.map((it, j) => <li key={j} className="text-left">{it}</li>)}
                                                    </ul>
                                                );
                                            case 'ol':
                                                return (
                                                    <ol key={i} className="list-decimal ml-[30px] space-y-1">
                                                        {b.items.map((it, j) => <li key={j} className="text-left">{it}</li>)}
                                                    </ol>
                                                );
                                            case 'image':
                                                return <img key={i} src={b.url} alt={b.alt ?? ''} className="rounded-lg" />;
                                            default: {
                                                const _exhaustive: never = b;
                                                return _exhaustive;
                                            }
                                        }
                                    })}
                                </div>
                            </section>
                        ))}
                </div>
            </div>
        </main>
    );
}
