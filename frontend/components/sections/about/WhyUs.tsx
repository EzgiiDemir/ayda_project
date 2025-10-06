import { ReactNode } from 'react';
import {
    Plane, Ship, MapPin, Hotel, Info,
    Users, Workflow, Building, Cpu, Car, Heart
} from 'lucide-react';

const iconMap = {
    plane: Plane,
    ship: Ship,
    mapPin: MapPin,
    hotel: Hotel,
    info: Info,
    users: Users,
    workflow: Workflow,
    building: Building,
    cpu: Cpu,
    car: Car,
    heart: Heart
};

type IconKey = keyof typeof iconMap;

interface WhyUsSectionProps {
    title: string | ReactNode;
    children: ReactNode;
    icon?: IconKey;
    className?: string;
}

export function WhyUsSection({
                                 title,
                                 children,
                                 icon,
                                 className = ''
                             }: WhyUsSectionProps) {
    const IconComponent = icon ? iconMap[icon] : null;

    return (
        <section className={`flex flex-col gap-3 ${className}`}>
            <h3 className="text-primary-pink text-center text-l md:text-[1.75rem] font-bold leading-tight flex items-center justify-center gap-3">
                {title}
            </h3>
            <div className="text-ayda-gray-dark text-sm md:text-base leading-relaxed">
                {children}
            </div>
        </section>
    );
}

interface WhyUsContentProps {
    content: string | ReactNode;
    className?: string;
}

export function WhyUsContent({ content, className = '' }: WhyUsContentProps) {
    return typeof content === 'string'
        ? <p className={`mb-4 last:mb-0 ${className}`}>{content}</p>
        : <div className={className}>{content}</div>;
}

interface WhyUsSubtitleProps {
    children: ReactNode;
    className?: string;
}

export function WhyUsSubtitle({ children, className = '' }: WhyUsSubtitleProps) {
    return (
        <h4 className={`text-lg md:text-xl font-semibold text-gray-800 mb-3 mt-6 ${className}`}>
            {children}
        </h4>
    );
}

interface WhyUsHighlightProps {
    children: ReactNode;
    className?: string;
}

export function WhyUsHighlight({ children, className = '' }: WhyUsHighlightProps) {
    return <strong className={`font-bold text-[1.05em] ${className}`}>{children}</strong>;
}
