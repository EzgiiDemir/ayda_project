
import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import TreatmentMethods from "@/components/sections/TreatmentMethods";
import ContactMap from "@/components/sections/ContactMap";

export default function HomePage() {
    return (
        <div>
            <Hero />
            <Welcome />
            <TreatmentMethods />
            <ContactMap />
        </div>
    );
}