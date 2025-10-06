// ==========================================
// types/whyUs.ts
// ==========================================
export interface WhyUsConfig {
    heroImage: string;
    /** İstersen CMS'ten "context" cümlesini de override edebilirsin */
    contextOverride?: string | null;
}

export const DEFAULT_WHYUS_CONFIG: WhyUsConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    contextOverride: null,
};
