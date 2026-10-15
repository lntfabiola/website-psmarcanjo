<?php
// Serve /noticias/:id com as tags de prévia (Open Graph) da publicação.
// WhatsApp, Facebook etc. não executam JavaScript: eles só leem o HTML,
// então aqui buscamos título, resumo e capa no Firestore e colocamos no <head>.
// O resto da página é o mesmo index.html do React, que carrega normalmente.

const SITE_URL = 'https://psmarcanjo.com';
const FIRESTORE_URL = 'https://firestore.googleapis.com/v1/projects/site-paroquiasaomiguel/databases/(default)/documents/noticias/';

header('Content-Type: text/html; charset=UTF-8');

$html = @file_get_contents(__DIR__ . '/index.html');
if ($html === false) {
    http_response_code(500);
    exit('Erro ao carregar a página.');
}

$id = isset($_GET['id']) ? $_GET['id'] : '';
if (!preg_match('/^[A-Za-z0-9_-]{1,64}$/', $id)) {
    echo $html;
    exit;
}

$contexto = stream_context_create(['http' => ['timeout' => 4, 'ignore_errors' => true]]);
$resposta = @file_get_contents(FIRESTORE_URL . $id, false, $contexto);
$doc = $resposta ? json_decode($resposta, true) : null;
$campos = isset($doc['fields']) ? $doc['fields'] : null;

$valor = function ($nome) use ($campos) {
    if (!isset($campos[$nome])) return null;
    $c = $campos[$nome];
    if (isset($c['stringValue'])) return trim($c['stringValue']);
    if (isset($c['booleanValue'])) return $c['booleanValue'];
    return null;
};

// Publicação inexistente ou rascunho: entrega a página normal, sem prévia específica
if (!$campos || $valor('publicado') === false) {
    echo $html;
    exit;
}

$resumir = function ($texto, $limite = 200) {
    // Remove a marcação simples do editor (##, >, **, *)
    $texto = preg_replace('/^(##|>)\s*/m', '', $texto);
    $texto = str_replace('*', '', $texto);
    $texto = trim(preg_replace('/\s+/u', ' ', $texto));
    if (mb_strlen($texto, 'UTF-8') <= $limite) return $texto;
    return rtrim(mb_substr($texto, 0, $limite - 1, 'UTF-8')) . '…';
};

$titulo = $valor('titulo') ?: 'Paróquia São Miguel Arcanjo';
$descricao = $valor('resumo') ?: $valor('conteudo') ?: 'Notícias e reflexões da Paróquia São Miguel Arcanjo.';
$descricao = $resumir($descricao);
$capa = $valor('capa');
$temCapa = $capa && preg_match('#^https?://#i', $capa);
$imagem = $temCapa ? $capa : SITE_URL . '/og-image.jpg';
$url = SITE_URL . '/noticias/' . $id;

$e = function ($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); };

$tags = implode("\n    ", [
    '<title>' . $e($titulo) . ' | Paróquia São Miguel Arcanjo</title>',
    '<meta name="description" content="' . $e($descricao) . '" />',
    '<meta property="og:type" content="article" />',
    '<meta property="og:site_name" content="Paróquia São Miguel Arcanjo" />',
    '<meta property="og:locale" content="pt_BR" />',
    '<meta property="og:url" content="' . $e($url) . '" />',
    '<meta property="og:title" content="' . $e($titulo) . '" />',
    '<meta property="og:description" content="' . $e($descricao) . '" />',
    '<meta property="og:image" content="' . $e($imagem) . '" />',
    $temCapa ? '' : '<meta property="og:image:width" content="1200" />',
    $temCapa ? '' : '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
]);

// Tira as tags padrão do index.html e coloca as da publicação
$html = preg_replace('#<title>.*?</title>#s', '', $html, 1);
$html = preg_replace('#\s*<meta (name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*>#', '', $html);
$html = str_replace('</head>', "    " . $tags . "\n  </head>", $html);

echo $html;
