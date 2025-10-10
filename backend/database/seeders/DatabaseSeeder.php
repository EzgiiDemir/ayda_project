<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Kullanıcıları oluştur
        $this->createUsers();

        // 2. İçerikleri oluştur
        $this->call(ContentSeeder::class);
    }

    private function createUsers()
    {
        User::updateOrCreate([
            'name' => 'Super Admin',
            'email' => 'admin@aydaivf.com',
            'password' => Hash::make('password123'),
            'role' => 'super_admin',
            'is_active' => true,
        ]);

        User::updateOrCreate([
            'name' => 'Admin User',
            'email' => 'editor@aydaivf.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        User::updateOrCreate([
            'name' => 'Content Editor',
            'email' => 'content@aydaivf.com',
            'password' => Hash::make('password123'),
            'role' => 'editor',
            'is_active' => true,
        ]);

        echo "✅ Users created\n";
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
