<?php

header('Access-Control-Allow-Origin: *'); // 특정 도메인에서의 접근만 허용
header('Access-Control-Allow-Headers: Content-Type'); // Content-Type 헤더 허용
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // POST, GET, OPTIONS 메소드 허용
header('Content-Type: application/json');

sleep(2);
// JSON 형식의 입력을 읽기
$data = json_decode(file_get_contents('php://input'), true);

$url = $data['url'];
// $url = 'https://naver.com'

$response = [
    'statusCode' => 200,
    'message' => 'Successfully received and processed URL',
    'data' => [
        'url' => $url,
        'isMalicious' => false,
        'source' => 0
    ]
];

echo json_encode($response);

?>
