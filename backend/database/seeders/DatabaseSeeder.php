<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Component;
use App\Models\ComponentContent;
use App\Models\Page;
use App\Models\PageContent;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Kullanıcılar oluştur
        $this->createUsers();

        // 2. Global componentleri oluştur (navbar, footer)
        $this->createGlobalComponents();

        // 3. Section componentleri oluştur (hero, welcome, treatments, contact)
        $this->createSectionComponents();

        // 4. Ana sayfayı oluştur
        $this->createHomePage();

        // 5. Diğer sayfaları oluştur
        $this->createPages();
    }

    private function createUsers(): void
    {
        // Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@aydaivf.com',
            'password' => Hash::make('password123'),
            'role' => 'super_admin',
            'is_active' => true,
        ]);

        // Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'editor@aydaivf.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // Editor
        User::create([
            'name' => 'Content Editor',
            'email' => 'content@aydaivf.com',
            'password' => Hash::make('password123'),
            'role' => 'editor',
            'is_active' => true,
        ]);

        echo "✅ Users created\n";
    }

    private function createGlobalComponents(): void
    {
        // Navbar Component
        $navbar = Component::create([
            'name' => 'navbar',
            'type' => 'layout',
            'description' => 'Main navigation bar',
            'is_global' => true,
            'schema' => [
                'logo' => ['type' => 'image', 'required' => true],
                'links' => ['type' => 'array', 'required' => true],
                'cta' => ['type' => 'object', 'required' => false],
            ],
        ]);

        // TR İçerik
        ComponentContent::create([
            'component_id' => $navbar->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => [
                'logo' => [
                    'src' => '/images/logo.png',
                    'alt' => 'Ayda IVF',
                    'width' => 150,
                    'height' => 50,
                ],
                'links' => [
                    ['href' => '/tr', 'label' => 'Ana Sayfa', 'order' => 1],
                    ['href' => '/tr/tedaviler', 'label' => 'Tedaviler', 'order' => 2],
                    ['href' => '/tr/hakkimizda', 'label' => 'Hakkımızda', 'order' => 3],
                    ['href' => '/tr/blog', 'label' => 'Blog', 'order' => 4],
                    ['href' => '/tr/iletisim', 'label' => 'İletişim', 'order' => 5],
                ],
                'cta' => [
                    'label' => 'Randevu Al',
                    'href' => '/tr/randevu',
                ],
            ],
        ]);

        // EN İçerik
        ComponentContent::create([
            'component_id' => $navbar->id,
            'locale' => 'en',
            'is_active' => true,
            'data' => [
                'logo' => [
                    'src' => '/images/logo.png',
                    'alt' => 'Ayda IVF',
                    'width' => 150,
                    'height' => 50,
                ],
                'links' => [
                    ['href' => '/en', 'label' => 'Home', 'order' => 1],
                    ['href' => '/en/treatments', 'label' => 'Treatments', 'order' => 2],
                    ['href' => '/en/about', 'label' => 'About', 'order' => 3],
                    ['href' => '/en/blog', 'label' => 'Blog', 'order' => 4],
                    ['href' => '/en/contact', 'label' => 'Contact', 'order' => 5],
                ],
                'cta' => [
                    'label' => 'Book Appointment',
                    'href' => '/en/appointment',
                ],
            ],
        ]);

        // Footer Component
        $footer = Component::create([
            'name' => 'footer',
            'type' => 'layout',
            'description' => 'Site footer',
            'is_global' => true,
            'schema' => [
                'brandName' => ['type' => 'string', 'required' => true],
                'sections' => ['type' => 'array', 'required' => true],
                'contact' => ['type' => 'object', 'required' => true],
                'social' => ['type' => 'array', 'required' => false],
            ],
        ]);

        // TR İçerik
        ComponentContent::create([
            'component_id' => $footer->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => [
                'brandName' => 'Ayda IVF',
                'description' => 'Kıbrıs\'ın lider tüp bebek merkezi. 20 yıllık deneyim ve uzman kadromuzla yanınızdayız.',
                'sections' => [
                    [
                        'title' => 'Hızlı Linkler',
                        'links' => [
                            ['href' => '/tr', 'label' => 'Ana Sayfa'],
                            ['href' => '/tr/tedaviler', 'label' => 'Tedaviler'],
                            ['href' => '/tr/hakkimizda', 'label' => 'Hakkımızda'],
                            ['href' => '/tr/blog', 'label' => 'Blog'],
                        ],
                    ],
                    [
                        'title' => 'Tedaviler',
                        'links' => [
                            ['href' => '/tr/ivf', 'label' => 'Tüp Bebek'],
                            ['href' => '/tr/egg-donation', 'label' => 'Yumurta Donasyonu'],
                            ['href' => '/tr/sperm-donation', 'label' => 'Sperm Donasyonu'],
                        ],
                    ],
                ],
                'contact' => [
                    'phone' => '+90 555 123 4567',
                    'email' => 'info@aydaivf.com',
                    'address' => 'Kıbrıs, Lefkoşa',
                ],
                'social' => [
                    ['platform' => 'facebook', 'url' => 'https://facebook.com/aydaivf'],
                    ['platform' => 'instagram', 'url' => 'https://instagram.com/aydaivf'],
                    ['platform' => 'twitter', 'url' => 'https://twitter.com/aydaivf'],
                ],
                'copyright' => '© 2024 Ayda IVF. Tüm hakları saklıdır.',
            ],
        ]);

        // EN İçerik
        ComponentContent::create([
            'component_id' => $footer->id,
            'locale' => 'en',
            'is_active' => true,
            'data' => [
                'brandName' => 'Ayda IVF',
                'description' => 'Cyprus leading IVF center. With 20 years of experience and expert team by your side.',
                'sections' => [
                    [
                        'title' => 'Quick Links',
                        'links' => [
                            ['href' => '/en', 'label' => 'Home'],
                            ['href' => '/en/treatments', 'label' => 'Treatments'],
                            ['href' => '/en/about', 'label' => 'About'],
                            ['href' => '/en/blog', 'label' => 'Blog'],
                        ],
                    ],
                    [
                        'title' => 'Treatments',
                        'links' => [
                            ['href' => '/en/ivf', 'label' => 'IVF'],
                            ['href' => '/en/egg-donation', 'label' => 'Egg Donation'],
                            ['href' => '/en/sperm-donation', 'label' => 'Sperm Donation'],
                        ],
                    ],
                ],
                'contact' => [
                    'phone' => '+90 555 123 4567',
                    'email' => 'info@aydaivf.com',
                    'address' => 'Cyprus, Nicosia',
                ],
                'social' => [
                    ['platform' => 'facebook', 'url' => 'https://facebook.com/aydaivf'],
                    ['platform' => 'instagram', 'url' => 'https://instagram.com/aydaivf'],
                    ['platform' => 'twitter', 'url' => 'https://twitter.com/aydaivf'],
                ],
                'copyright' => '© 2024 Ayda IVF. All rights reserved.',
            ],
        ]);

        echo "✅ Global components created\n";
    }

    private function createSectionComponents(): void
    {
        // Hero Component
        $hero = Component::create([
            'name' => 'hero',
            'type' => 'section',
            'description' => 'Hero section',
            'is_global' => false,
        ]);

        ComponentContent::create([
            'component_id' => $hero->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => [
                'title' => 'Hayalinizdeki Aileye Bir Adım Daha Yakın',
                'subtitle' => 'Kıbrıs\'ın en deneyimli tüp bebek merkezi',
                'description' => '20 yıllık deneyim, uzman kadro ve son teknoloji ile yanınızdayız.',
                'image' => [
                    'src' => '/images/hero-main.jpg',
                    'alt' => 'Ayda IVF Merkezi',
                ],
                'cta' => [
                    ['label' => 'Ücretsiz Konsültasyon', 'href' => '/tr/konsultasyon', 'variant' => 'primary'],
                    ['label' => 'Daha Fazla Bilgi', 'href' => '/tr/hakkimizda', 'variant' => 'secondary'],
                ],
            ],
        ]);

        ComponentContent::create([
            'component_id' => $hero->id,
            'locale' => 'en',
            'is_active' => true,
            'data' => [
                'title' => 'One Step Closer to Your Dream Family',
                'subtitle' => 'Cyprus most experienced IVF center',
                'description' => 'With 20 years of experience, expert team and cutting-edge technology.',
                'image' => [
                    'src' => '/images/hero-main.jpg',
                    'alt' => 'Ayda IVF Center',
                ],
                'cta' => [
                    ['label' => 'Free Consultation', 'href' => '/en/consultation', 'variant' => 'primary'],
                    ['label' => 'Learn More', 'href' => '/en/about', 'variant' => 'secondary'],
                ],
            ],
        ]);

        // Welcome Component
        $welcome = Component::create([
            'name' => 'welcome',
            'type' => 'section',
            'description' => 'Welcome section',
            'is_global' => false,
        ]);

        ComponentContent::create([
            'component_id' => $welcome->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => [
                'title' => 'Ayda IVF\'e Hoş Geldiniz',
                'subtitle' => 'Güvenilir Ellerdesiniz',
                'content' => [
                    'Ayda IVF olarak, 20 yılı aşkın deneyimimiz ve uzman kadromuzla Kıbrıs\'ın lider tüp bebek merkezi olmaktan gurur duyuyoruz.',
                    'Modern tesislerimiz, son teknoloji ekipmanlarımız ve deneyimli doktorlarımızla her zaman yanınızdayız.',
                ],
                'stats' => [
                    ['value' => '20+', 'label' => 'Yıllık Deneyim'],
                    ['value' => '5000+', 'label' => 'Mutlu Aile'],
                    ['value' => '%85', 'label' => 'Başarı Oranı'],
                    ['value' => '24/7', 'label' => 'Destek'],
                ],
                'image' => [
                    'src' => '/images/welcome.jpg',
                    'alt' => 'Ayda IVF Ekibi',
                ],
            ],
        ]);

        // Treatments Component
        $treatments = Component::create([
            'name' => 'treatments',
            'type' => 'section',
            'description' => 'Treatments section',
            'is_global' => false,
        ]);

        ComponentContent::create([
            'component_id' => $treatments->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => [
                'title' => 'Tedavi Yöntemlerimiz',
                'subtitle' => 'Size Özel Çözümler',
                'items' => [
                    [
                        'id' => 'ivf',
                        'title' => 'Tüp Bebek (IVF)',
                        'description' => 'Klasik tüp bebek tedavisi ile aile hayalinizi gerçeğe dönüştürün.',
                        'icon' => '/icons/ivf.svg',
                        'image' => '/images/treatments/ivf.jpg',
                        'href' => '/tr/ivf',
                        'featured' => true,
                    ],
                    [
                        'id' => 'egg-donation',
                        'title' => 'Yumurta Donasyonu',
                        'description' => 'Yumurta donasyonu ile anne olma şansınızı artırın.',
                        'icon' => '/icons/egg.svg',
                        'image' => '/images/treatments/egg-donation.jpg',
                        'href' => '/tr/egg-donation',
                        'featured' => true,
                    ],
                    [
                        'id' => 'sperm-donation',
                        'title' => 'Sperm Donasyonu',
                        'description' => 'Güvenilir sperm bankamız ile tedavi sürecinizi başlatın.',
                        'icon' => '/icons/sperm.svg',
                        'image' => '/images/treatments/sperm-donation.jpg',
                        'href' => '/tr/sperm-donation',
                        'featured' => true,
                    ],
                ],
            ],
        ]);

        // Contact Map Component
        $contactMap = Component::create([
            'name' => 'contact-map',
            'type' => 'section',
            'description' => 'Contact and map section',
            'is_global' => false,
        ]);

        ComponentContent::create([
            'component_id' => $contactMap->id,
            'locale' => 'tr',
            'is_active' => true,
            'data' => [
                'title' => 'Bize Ulaşın',
                'address' => 'Dereboyu Cad. No:123, Lefkoşa, Kuzey Kıbrıs',
                'phone' => '+90 555 123 4567',
                'email' => 'info@aydaivf.com',
                'coordinates' => [
                    'lat' => 35.1856,
                    'lng' => 33.3823,
                ],
                'workingHours' => [
                    ['day' => 'Pazartesi - Cuma', 'hours' => '08:00 - 18:00'],
                    ['day' => 'Cumartesi', 'hours' => '09:00 - 14:00'],
                    ['day' => 'Pazar', 'hours' => 'Kapalı'],
                ],
                'imageUrl' => '/images/map-location.jpg',
                'imageAlt' => 'Ayda IVF Merkezi Konumu',
            ],
        ]);

        echo "✅ Section components created\n";
    }

    private function createHomePage(): void
    {
        $page = Page::create([
            'slug' => 'home',
            'template' => 'landing',
            'is_active' => true,
            'is_homepage' => true,
            'order' => 0,
            'meta' => [
                'robots' => 'index,follow',
            ],
            'created_by' => 1,
        ]);

        // TR İçerik
        PageContent::create([
            'page_id' => $page->id,
            'locale' => 'tr',
            'title' => 'Ana Sayfa',
            'subtitle' => 'Kıbrıs\'ın Lider Tüp Bebek Merkezi',
            'description' => 'Ayda IVF ile hayalinizdeki aileye kavuşun.',
            'seo' => [
                'title' => 'Ayda IVF - Kıbrıs Tüp Bebek Merkezi',
                'description' => '20 yıllık deneyim ile tüp bebek tedavisi. Yumurta ve sperm donasyonu hizmetleri.',
                'keywords' => ['tüp bebek', 'ivf', 'kıbrıs', 'yumurta donasyonu', 'sperm donasyonu'],
            ],
        ]);

        // EN İçerik
        PageContent::create([
            'page_id' => $page->id,
            'locale' => 'en',
            'title' => 'Home',
            'subtitle' => 'Cyprus Leading IVF Center',
            'description' => 'Achieve your dream family with Ayda IVF.',
            'seo' => [
                'title' => 'Ayda IVF - Cyprus IVF Center',
                'description' => '20 years of experience in IVF treatment. Egg and sperm donation services.',
                'keywords' => ['ivf', 'cyprus', 'egg donation', 'sperm donation', 'fertility'],
            ],
        ]);

        // Component'leri ekle
        $hero = Component::where('name', 'hero')->first();
        $welcome = Component::where('name', 'welcome')->first();
        $treatments = Component::where('name', 'treatments')->first();
        $contactMap = Component::where('name', 'contact-map')->first();

        $page->components()->attach($hero->id, ['order' => 1, 'is_visible' => true]);
        $page->components()->attach($welcome->id, ['order' => 2, 'is_visible' => true]);
        $page->components()->attach($treatments->id, ['order' => 3, 'is_visible' => true]);
        $page->components()->attach($contactMap->id, ['order' => 4, 'is_visible' => true]);

        echo "✅ Homepage created\n";
    }

    private function createPages(): void
    {
        // Hakkımızda Sayfası
        $about = Page::create([
            'slug' => 'about',
            'template' => 'default',
            'is_active' => true,
            'order' => 1,
            'created_by' => 1,
        ]);

        PageContent::create([
            'page_id' => $about->id,
            'locale' => 'tr',
            'title' => 'Hakkımızda',
            'subtitle' => 'Ayda IVF Hikayesi',
            'description' => '20 yıllık deneyimimiz ve başarı hikayelerimiz.',
            'seo' => [
                'title' => 'Hakkımızda - Ayda IVF',
                'description' => 'Ayda IVF hakkında bilgi edinin.',
            ],
        ]);

        // İletişim Sayfası
        $contact = Page::create([
            'slug' => 'contact',
            'template' => 'default',
            'is_active' => true,
            'order' => 2,
            'created_by' => 1,
        ]);

        PageContent::create([
            'page_id' => $contact->id,
            'locale' => 'tr',
            'title' => 'İletişim',
            'subtitle' => 'Bize Ulaşın',
            'description' => 'Sorularınız için bizimle iletişime geçin.',
            'seo' => [
                'title' => 'İletişim - Ayda IVF',
                'description' => 'Ayda IVF ile iletişime geçin.',
            ],
        ]);

        $contactMap = Component::where('name', 'contact-map')->first();
        $contact->components()->attach($contactMap->id, ['order' => 1, 'is_visible' => true]);

        echo "✅ Additional pages created\n";
    }
}




























//
//namespace Database\Seeders;
//
//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
//use Illuminate\Database\Seeder;
//
//class DatabaseSeeder extends Seeder
//{
//    /**
//     * Seed the application's database.
//     *
//     * @return void
//     */
//    public function run()
//    {
//
//        $this->call([
//            DashboardTableSeeder::class,
//            AnalyticsTableSeeder::class,
//            FintechTableSeeder::class,
//            CustomerSeeder::class,
//            OrderSeeder::class,
//            InvoiceSeeder::class,
//            MemberSeeder::class,
//            TransactionSeeder::class,
//            JobSeeder::class,
//            CampaignSeeder::class,
//            MarketerSeeder::class,
//            CampaignMarketerSeeder::class,
//        ]);
//    }
//}
