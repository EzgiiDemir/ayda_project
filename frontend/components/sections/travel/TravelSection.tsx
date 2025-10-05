// Server Component: hook yok, "use client" ekleme.
import { ReactNode } from 'react';
import { Plane, Ship, MapPin, Hotel, Info } from 'lucide-react';

const iconMap = {
    plane: Plane,
    ship: Ship,
    mapPin: MapPin,
    hotel: Hotel,
    info: Info
};

type IconKey = keyof typeof iconMap;

interface TravelSectionProps {
    title: string | ReactNode;     // sadece yaprak string ya da ReactNode ver
    children: ReactNode;           // ZORUNLU: undefined geçme
    icon?: IconKey;
    className?: string;
}

export function TravelSection({
                                  title,
                                  children,
                                  icon,
                                  className = ''
                              }: TravelSectionProps) {
    const IconComponent = icon ? iconMap[icon] : null;

    return (
        <section className={`flex flex-col gap-3 ${className}`}>
            <h3 className="text-ayda-pink text-center text-2xl md:text-[1.75rem] font-bold leading-tight flex items-center justify-center gap-3">
                {IconComponent ? <IconComponent className="w-6 h-6 md:w-7 md:h-7" /> : null}
                {title}
            </h3>
            <div className="text-ayda-gray-dark text-sm md:text-base leading-relaxed">
                {children}
            </div>
        </section>
    );
}

interface TravelContentProps {
    content: string | ReactNode;
    className?: string;
}

export function TravelContent({ content, className = '' }: TravelContentProps) {
    if (typeof content === 'string') {
        return <p className={`mb-4 last:mb-0 ${className}`}>{content}</p>;
    }
    return <div className={className}>{content}</div>;
}

interface TravelSubtitleProps {
    children: ReactNode;
    className?: string;
}

export function TravelSubtitle({ children, className = '' }: TravelSubtitleProps) {
    return (
        <h4 className={`text-lg md:text-xl font-semibold text-gray-800 mb-3 mt-6 ${className}`}>
            {children}
        </h4>
    );
}

interface TravelHighlightProps {
    children: ReactNode;
    className?: string;
}

export function TravelHighlight({ children, className = '' }: TravelHighlightProps) {
    return <strong className={`font-bold text-[1.05em] ${className}`}>{children}</strong>;
}
