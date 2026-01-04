export const selectService = (service: string) => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('selectService', { detail: service }));
        const el = document.getElementById('contact-section');
        el?.scrollIntoView({ behavior: 'smooth' });
    }
};
