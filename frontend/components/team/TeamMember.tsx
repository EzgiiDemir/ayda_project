import Image from 'next/image';

interface TeamMemberProps {
    nameTitle: string;
    image: string;
    imageAlt: string;
    paragraphs: string[];
}

export default function TeamMember({ nameTitle, image, imageAlt, paragraphs }: TeamMemberProps) {
    return (
        <section className="flex flex-col justify-center items-center min-h-screen gap-6 px-4">
            <div className="relative w-full max-w-[600px] aspect-video mx-auto">
                <Image src={image} alt={imageAlt} fill className="object-contain" />
            </div>

            <div className="w-full max-w-3xl mx-auto flex flex-col gap-3 text-left">
                <p className="text-sm md:text-base text-primary-pink font-medium">
                    {nameTitle}
                </p>
                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3">
                    {paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </div>
        </section>
    );
}
