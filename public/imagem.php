<?php
// Serve as imagens de capa enviadas pelo painel /admin-noticias.
// Elas ficam guardadas no Firestore (coleção "noticias_imagens") como data URL;
// aqui viram um link de imagem normal, usado no site e na prévia do WhatsApp.

const FIRESTORE_URL = 'https://firestore.googleapis.com/v1/projects/site-paroquiasaomiguel/databases/(default)/documents/noticias_imagens/';

$id = isset($_GET['id']) ? $_GET['id'] : '';
if (!preg_match('/^[A-Za-z0-9_-]{1,64}$/', $id)) {
    http_response_code(400);
    exit;
}

$contexto = stream_context_create(['http' => ['timeout' => 8, 'ignore_errors' => true]]);
$resposta = @file_get_contents(FIRESTORE_URL . $id, false, $contexto);
$doc = $resposta ? json_decode($resposta, true) : null;
$dados = isset($doc['fields']['dados']['stringValue']) ? $doc['fields']['dados']['stringValue'] : '';

if (!preg_match('#^data:(image/(?:jpeg|png|webp));base64,(.+)$#s', $dados, $m)) {
    http_response_code(404);
    exit;
}

$bytes = base64_decode($m[2], true);
if ($bytes === false) {
    http_response_code(404);
    exit;
}

// Cada imagem nova ganha um id novo, então pode ficar em cache por muito tempo
header('Content-Type: ' . $m[1]);
header('Content-Length: ' . strlen($bytes));
header('Cache-Control: public, max-age=31536000, immutable');
header('X-Content-Type-Options: nosniff');
echo $bytes;
