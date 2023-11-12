<?php

header('Content-Type: application/json');

// Récupérer les données du corps de la requête
$data = json_decode(file_get_contents("php://input"), true);

// Récupérer les données individuelles
$age = $data['age'];
$permis = $data['permis'];
$acc = $data['acc'];
$anneeFidelite = $data['anneeFidelite'];

$isRouge = ($age < 25 && $permis < 2 && $acc == 0) || ($acc == 1 && (($age >= 25 && $permis < 2) || ($age < 25 && $permis >= 2))) || ($age >= 25 && $permis >= 2 && $acc == 2);
$isOrange = (($acc == 0 && (($age < 25 && $permis >= 2) || ($age > 25 && $permis < 2))) || ($acc == 1 && $age >= 25 && $permis >= 2));
$isVert = $age >= 25 && $permis >= 2 && $acc == 0;

$score = 0;

if ($isRouge) {
    $score = 1;
} elseif ($isOrange) {
    $score = 2;
} elseif ($isVert) {
    $score = 3;
}

if ($anneeFidelite >= 5 && ($isRouge || $isOrange || $isVert)) {
    $score = $score + 1;
}

// Préparez le message de réponse
if ($score == 0) {
    $color = "#000000";
} elseif ($score == 1) {
    $color = "#FF0000";
} elseif ($score == 2) {
    $color = "#FFA500";
} elseif ($score == 3) {
    $color = "#00FF00";
} else {
    $color = "#0000FF";
}

// Répondez avec un message JSON
echo json_encode(['color' => $color]);
