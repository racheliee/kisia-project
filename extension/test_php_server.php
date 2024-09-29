<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Content-Type: application/json');

sleep(rand(1, 8));

$data = json_decode(file_get_contents('php://input'), true);

$response = [
    'statusCode' => 200,
    'message' => 'Successfully received and processed URL',
    'data' => [
        'url' => $data['url'],
        'isMalicious' => false
    ]
];

echo json_encode($response);

?>
