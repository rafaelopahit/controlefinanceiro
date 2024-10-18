<?php

namespace Tests\Unit;




use Tests\TestCase;
use Illuminate\Support\Collection;
class LancamentosTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $response = $this->post('/api/access/login', ['email' => 'admin@gmail.com', 'password' => "adm@23"]);

        $user = json_decode($response->getContent());

        if (isset($user->user)) {

            dump('User found');
        }

        $token = $user->user->api_token;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->post('/api/values/insertdata', [
                'data_type' => '1',
                'id' => '0',
                'payment_date' => '2024-10-17T17:20:00',
                'payment_form' => '2',
                'data_value' => 200.00
            ]);


        $this->assertEquals(true, json_decode($response->getContent())->success);

    }

    function test_2()
    {
        $response = $this->post('/api/access/login', ['email' => 'admin@gmail.com', 'password' => "adm@23"]);

        $user = json_decode($response->getContent());

        if (isset($user->user)) {

            dump('User found');
        }

        $token = $user->user->api_token;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->get('/api/values/list', []);


        $collection = false;


        if (is_array(json_decode($response->getContent()))) {
            $collection = true;
        }
        $this->assertEquals(true, $collection);

    }
}
