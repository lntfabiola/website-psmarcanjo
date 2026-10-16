<?php
// Aclamação ao Evangelho do dia (a API de liturgia não traz esse trecho).
// Busca na página da Canção Nova daquela data e guarda em cache no servidor.
// Uso: /aclamacao.php?data=2026-10-18  ->  {"refrao": "...", "versiculo": "..."} ou {"aclamacao": null}

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *'); // permite testar a partir do localhost

const BASE = 'https://liturgia.cancaonova.com/pb/';

$data = isset($_GET['data']) ? $_GET['data'] : '';
if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $data, $p) || !checkdate((int)$p[2], (int)$p[3], (int)$p[1])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Use ?data=AAAA-MM-DD']);
    exit;
}
[$ano, $mes, $dia] = [(int)$p[1], (int)$p[2], (int)$p[3]];

$pastaCache = sys_get_temp_dir() . '/psma-aclamacao';
@mkdir($pastaCache, 0700, true);

function baixar($url) {
    $ctx = stream_context_create(['http' => [
        'timeout' => 10,
        'header' => "User-Agent: Mozilla/5.0 (site psmarcanjo.com)\r\n",
    ]]);
    return @file_get_contents($url, false, $ctx);
}

function comCache($arquivo, $validade, $gerar) {
    if (is_file($arquivo) && time() - filemtime($arquivo) < $validade) {
        return file_get_contents($arquivo);
    }
    $valor = $gerar();
    if ($valor !== null) @file_put_contents($arquivo, $valor);
    return $valor;
}

function responder($resultado, $segundosCache) {
    header('Cache-Control: public, max-age=' . $segundosCache);
    echo $resultado;
    exit;
}

// Resultado já calculado para esta data?
$arqData = "$pastaCache/$data.json";
if (is_file($arqData)) {
    $guardado = file_get_contents($arqData);
    $ok = strpos($guardado, '"refrao"') !== false;
    // Encontrado: vale 30 dias. Não encontrado: tenta de novo depois de 1 hora.
    if (time() - filemtime($arqData) < ($ok ? 2592000 : 3600)) responder($guardado, $ok ? 86400 : 600);
}

// A página inicial tem o calendário com o link de cada dia do mês (o nome do link muda por dia)
$inicio = comCache("$pastaCache/inicio.html", 21600, function () {
    $html = baixar(BASE);
    return $html === false ? null : $html;
});

$resultado = json_encode(['aclamacao' => null]);
$padrao = sprintf('#href="(https://liturgia\.cancaonova\.com/pb/liturgia/[^"?]+/\?sDia=%d&(?:amp;)?sMes=%d&(?:amp;)?sAno=%d)"#', $dia, $mes, $ano);

if ($inicio && preg_match($padrao, $inicio, $link)) {
    $pagina = baixar(html_entity_decode($link[1]));
    if ($pagina && preg_match('/Evangelho\s*\(/', $pagina, $m, PREG_OFFSET_CAPTURE)) {
        $trecho = substr($pagina, $m[0][1]);
        // A aclamação fica entre o título "Evangelho (...)" e "Proclamação do Evangelho..."
        $fim = strpos($trecho, 'Proclama');
        $trecho = $fim !== false ? substr($trecho, 0, $fim) : substr($trecho, 0, 3000);
        $trecho = preg_replace('#<br\s*/?>|</p>#i', "\n", $trecho);
        $texto = html_entity_decode(strip_tags($trecho), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $texto = str_replace("\xC2\xA0", ' ', $texto);

        $linhas = [];
        foreach (array_slice(explode("\n", $texto), 1) as $linha) {
            $linha = trim($linha);
            if (preg_match('/^[-–—]\s*(.+)$/u', $linha, $l)) $linhas[] = trim($l[1]);
        }
        if ($linhas) {
            $resultado = json_encode([
                'refrao' => $linhas[0],
                'versiculo' => implode(' ', array_slice($linhas, 1)),
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}

@file_put_contents($arqData, $resultado);
responder($resultado, strpos($resultado, '"refrao"') !== false ? 86400 : 600);
