<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Page;
use App\Models\PageContent;

class ImportAcupuncture extends Command
{
    protected $signature = 'import:acupuncture';
    protected $description = 'Import acupuncture page from JSON to database';

    public function handle()
    {
        $this->info('Importing acupuncture page...');

        // EN JSON'u oku
        $enPath = base_path('../frontend/messages/en/acupuncture.json');

        if (!file_exists($enPath)) {
            $this->error('acupuncture.json not found!');
            return 1;
        }

        $data = json_decode(file_get_contents($enPath), true);

        // HTML içerik oluştur
        $html = $this->buildHTML($data);

        // Page oluştur/güncelle
        $page = Page::updateOrCreate(
            ['slug' => 'acupuncture'],
            [
                'template' => 'default',
                'is_active' => true,
                'is_homepage' => false,
                'order' => 1,
                'created_by' => 1,
            ]
        );

        // Content oluştur/güncelle
        PageContent::updateOrCreate(
            [
                'page_id' => $page->id,
                'locale' => 'en',
            ],
            [
                'title' => $data['title'] ?? 'ACUPUNCTURE',
                'subtitle' => '',
                'description' => $html,
                'seo' => [
                    'title' => 'Acupuncture - Ayda IVF',
                    'description' => 'Acupuncture for IVF treatment',
                    'keywords' => ['acupuncture', 'ivf', 'fertility'],
                ],
            ]
        );

        $this->info('✅ Acupuncture page imported successfully!');
        return 0;
    }

    private function buildHTML(array $data): string
    {
        $sections = [];

        // Intro paragraphs
        if (isset($data['intro']['paragraphs'])) {
            foreach ($data['intro']['paragraphs'] as $p) {
                $sections[] = "<p class='mb-4'>$p</p>";
            }
        }

        // Figure image
        if (isset($data['figure'])) {
            $sections[] = sprintf(
                '<figure class="my-6"><img src="%s" alt="%s" srcset="%s" sizes="%s" class="w-full md:w-1/2 md:float-left md:mr-6 mb-4 rounded-lg" /></figure>',
                $data['figure']['src'],
                $data['figure']['alt'],
                $data['figure']['srcset'] ?? '',
                $data['figure']['sizes'] ?? '100vw'
            );
        }

        // Qi paragraphs
        if (isset($data['qi']['paragraphs'])) {
            foreach ($data['qi']['paragraphs'] as $p) {
                $sections[] = "<p class='mb-4'>$p</p>";
            }
        }

        // IVF Effects
        if (isset($data['ivfEffects'])) {
            $sections[] = "<h2 class='text-primary-weak text-base font-medium mt-8 mb-4'>" . $data['ivfEffects']['title'] . "</h2>";

            foreach ($data['ivfEffects']['paragraphs'] ?? [] as $p) {
                $sections[] = "<p class='mb-4'>$p</p>";
            }

            if (isset($data['ivfEffects']['benefits'])) {
                $sections[] = '<ul class="list-disc ml-8 space-y-2 mb-4">';
                foreach ($data['ivfEffects']['benefits'] as $benefit) {
                    $sections[] = "<li>$benefit</li>";
                }
                $sections[] = '</ul>';
            }
        }

        // Side Effects
        if (isset($data['sideEffects'])) {
            $sections[] = "<h2 class='text-primary-weak text-base font-medium mt-8 mb-4'>" . $data['sideEffects']['title'] . "</h2>";
            foreach ($data['sideEffects']['paragraphs'] ?? [] as $p) {
                $sections[] = "<p class='mb-4'>$p</p>";
            }
        }

        // How
        if (isset($data['how'])) {
            $sections[] = "<h2 class='text-primary-weak text-base font-medium mt-8 mb-4'>" . $data['how']['title'] . "</h2>";
            foreach ($data['how']['paragraphs'] ?? [] as $p) {
                $sections[] = "<p class='mb-4'>$p</p>";
            }
        }

        // Price
        if (isset($data['price'])) {
            $sections[] = "<h2 class='text-primary-weak text-base font-medium mt-8 mb-4'>" . $data['price']['title'] . "</h2>";
            $sections[] = "<p class='mb-4'>" . $data['price']['value'] . "</p>";
        }

        return implode("\n", $sections);
    }
}
