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

test('new public tracking page loads', function () {
    $response = $this->get('/new');

    $response->assertOk();
});

test('new track submit requires codes', function () {
    $response = $this->post('/new', ['codes' => '']);

    $response->assertSessionHasErrors('codes');
});

test('new track submit works with valid code', function () {
    $response = $this->post('/new', ['codes' => 'OT-AIR-3801']);

    $response->assertOk();
});
