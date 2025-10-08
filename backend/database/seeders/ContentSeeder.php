<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Component;
use App\Models\ComponentContent;
use App\Models\Page;
use App\Models\PageContent;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Global Components (Navbar, Footer)
        $this->createGlobalComponents();

        // 2. Section Components
        $this->createSectionComponents();

        // 3. Pages
        $this->createPages();

        echo "✅ Content seeded successfully!\n";
    }

    private function createGlobalComponents()
    {
        // Navbar
        $navbar = Component::create([
            'name' => 'navbar',
            'type' => 'layout',
            'description' => 'Main navigation',
            'is_global' => true,
        ]);

        // TR içeriği messages/tr/Footer.json'dan gelecek
        ComponentContent::create([
            'component_id' => $navbar->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => ['source' => 'messages/tr/Footer.json'], // Admin'den editlenecek
        ]);

        ComponentContent::create([
            'component_id' => $navbar->id,
            'locale' => 'en',
            'is_active' => true,
            'data' => ['source' => 'messages/en/Footer.json'],
        ]);

        // Footer
        $footer = Component::create([
            'name' => 'footer',
            'type' => 'layout',
            'description' => 'Site footer',
            'is_global' => true,
        ]);

        ComponentContent::create([
            'component_id' => $footer->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => ['source' => 'messages/tr/Footer.json'],
        ]);

        ComponentContent::create([
            'component_id' => $footer->id,
            'locale' => 'en',
            'is_active' => true,
            'data' => ['source' => 'messages/en/Footer.json'],
        ]);

        echo "✅ Global components created\n";
    }

    private function createSectionComponents()
    {
        $components = [
            ['name' => 'hero', 'type' => 'section', 'description' => 'Hero section'],
            ['name' => 'welcome', 'type' => 'section', 'description' => 'Welcome section'],
            ['name' => 'treatment-methods', 'type' => 'section', 'description' => 'Treatment methods'],
            ['name' => 'contact-map', 'type' => 'section', 'description' => 'Contact map'],
            ['name' => 'contact-form', 'type' => 'widget', 'description' => 'Contact form'],
            ['name' => 'why-us', 'type' => 'section', 'description' => 'Why choose us'],
            ['name' => 'faq-accordion', 'type' => 'widget', 'description' => 'FAQ accordion'],
            ['name' => 'team-member', 'type' => 'widget', 'description' => 'Team member card'],
        ];

        foreach ($components as $comp) {
            $component = Component::create([
                'name' => $comp['name'],
                'type' => $comp['type'],
                'description' => $comp['description'],
                'is_global' => false,
            ]);

            // TR & EN placeholder content
            foreach (['tr', 'en'] as $locale) {
                ComponentContent::create([
                    'component_id' => $component->id,
                    'locale' => $locale,
                    'is_active' => true,
                    'data' => [
                        'title' => 'Edit from admin',
                        'description' => 'Content will be managed from admin panel'
                    ],
                ]);
            }
        }

        echo "✅ Section components created\n";
    }

    private function createPages()
    {
        $pages = [
            ['slug' => 'home', 'template' => 'landing', 'is_homepage' => true, 'tr' => 'Ana Sayfa', 'en' => 'Home'],
            ['slug' => 'acupuncture', 'template' => 'default', 'tr' => 'Akupunktur', 'en' => 'Acupuncture'],
            ['slug' => 'blog', 'template' => 'blog', 'tr' => 'Blog', 'en' => 'Blog'],
            ['slug' => 'contact', 'template' => 'default', 'tr' => 'İletişim', 'en' => 'Contact'],
            ['slug' => 'egg-donation', 'template' => 'default', 'tr' => 'Yumurta Donasyonu', 'en' => 'Egg Donation'],
            ['slug' => 'egg-freezing', 'template' => 'default', 'tr' => 'Yumurta Dondurma', 'en' => 'Egg Freezing'],
            ['slug' => 'embryo-donation', 'template' => 'default', 'tr' => 'Embriyo Donasyonu', 'en' => 'Embryo Donation'],
            ['slug' => 'faq', 'template' => 'default', 'tr' => 'SSS', 'en' => 'FAQ'],
            ['slug' => 'ivf-icsi', 'template' => 'default', 'tr' => 'IVF-ICSI', 'en' => 'IVF-ICSI'],
            ['slug' => 'our-prices', 'template' => 'default', 'tr' => 'Fiyatlarımız', 'en' => 'Our Prices'],
            ['slug' => 'our-success-rates', 'template' => 'default', 'tr' => 'Başarı Oranlarımız', 'en' => 'Our Success Rates'],
            ['slug' => 'our-team', 'template' => 'default', 'tr' => 'Ekibimiz', 'en' => 'Our Team'],
            ['slug' => 'ovarian-endometrial-prp', 'template' => 'default', 'tr' => 'Over PRP', 'en' => 'Ovarian PRP'],
            ['slug' => 'sperm-donation', 'template' => 'default', 'tr' => 'Sperm Donasyonu', 'en' => 'Sperm Donation'],
            ['slug' => 'travel', 'template' => 'default', 'tr' => 'Seyahat', 'en' => 'Travel'],
            ['slug' => 'why-us', 'template' => 'default', 'tr' => 'Neden Biz', 'en' => 'Why Us'],
        ];

        foreach ($pages as $index => $pageData) {
            $page = Page::create([
                'slug' => $pageData['slug'],
                'template' => $pageData['template'],
                'is_active' => true,
                'is_homepage' => $pageData['is_homepage'] ?? false,
                'order' => $index,
                'created_by' => 1,
            ]);

            // TR içerik
            PageContent::create([
                'page_id' => $page->id,
                'locale' => 'tr',
                'title' => $pageData['tr'],
                'subtitle' => 'Admin panelden düzenlenecek',
                'description' => 'İçerik admin panelden yönetilecektir.',
                'seo' => [
                    'title' => $pageData['tr'] . ' - Ayda IVF',
                    'description' => $pageData['tr'] . ' hakkında detaylı bilgi',
                    'keywords' => [$pageData['slug'], 'ayda', 'ivf'],
                ],
            ]);

            // EN içerik
            PageContent::create([
                'page_id' => $page->id,
                'locale' => 'en',
                'title' => $pageData['en'],
                'subtitle' => 'To be edited from admin panel',
                'description' => 'Content will be managed from admin panel.',
                'seo' => [
                    'title' => $pageData['en'] . ' - Ayda IVF',
                    'description' => 'Detailed information about ' . $pageData['en'],
                    'keywords' => [$pageData['slug'], 'ayda', 'ivf'],
                ],
            ]);
        }

        echo "✅ Pages created\n";
    }
}
