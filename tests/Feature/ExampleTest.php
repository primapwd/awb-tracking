<?php

test('public tracking page loads', function () {
    $response = $this->get('/');

    $response->assertOk();
});

test('health endpoint returns ok', function () {
    $response = $this->get('/healthz');

    $response->assertOk();
});

test('track submit requires codes', function () {
    $response = $this->post('/track', ['codes' => '']);

    $response->assertSessionHasErrors('codes');
});
