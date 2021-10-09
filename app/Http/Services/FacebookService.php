<?php

namespace App\Http\Services;

use Facebook\Facebook;

class FacebookService
{
    private $fb;
    public function __construct()
    {
        $this->fb = new Facebook([
            'app_id' => '292497617824148',
            'app_secret' => '8dff2ac91906762850335c9d3ac66fd0',
            'default_graph_version' => 'v2.10',
        ]);
    }

    public function get()
    {
    }

    public function login()
    {
        return $this->fb->getDefaultAccessToken();
    }
}
