<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Conectar ao banco de dados
$host = 'localhost';
$usuarioDB = 'root';
$senhaDB = '';
$database = 'login';

$conn = new mysqli($host, $usuarioDB, $senhaDB, $database);

if ($conn->connect_error) {
    die('Erro na conexão: ' . $conn->connect_error);
}

// Capturar dados do formulário
$usuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';

// Verificar se os campos foram preenchidos
if ($usuario && $senha) {
    // Verificar se o usuário é um e-mail
    if (filter_var($usuario, FILTER_VALIDATE_EMAIL)) {
        // Se for um e-mail, procurar pelo e-mail
        $sql = "SELECT * FROM usuarios WHERE email = '$usuario' AND senha = '$senha'";
    } else {
        // Caso contrário, procurar pelo usuário
        $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND senha = '$senha'";
    }
    
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Credenciais corretas
        echo json_encode(['error' => false, 'message' => 'Login realizado com sucesso!']);
    } else {
        // Credenciais incorretas
        echo json_encode(['error' => true, 'message' => 'Usuário ou senha incorretos.']);
    }
} else {
    echo json_encode(['error' => true, 'message' => 'Dados incompletos!']);
}

$conn->close();
?>
