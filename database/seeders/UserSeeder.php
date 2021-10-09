<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i = 1; $i < 1000; $i++) {
            User::insert([
                'name' => $faker->name(),
                'email' => $faker->email(),
                'password' => bcrypt('123456')
            ]);
        }
    }
}
