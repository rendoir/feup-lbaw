<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
     {
         Eloquent::unguard();

         $path = 'resources/sql/seed.sql';
         DB::unprepared(file_get_contents($path));

//         $this->createUsers();
         $this->loadFile('resources/sql/populate.sql');

         $this->command->info('Database seeded!');
     }

     private function createUsers() {
         factory(App\User::class, 5)->create();
     }

     private function loadFile($filePath) {
         DB::unprepared(file_get_contents($filePath));
     }
}
