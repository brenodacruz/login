<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Conectar ao banco de dados
$host = 'localhost';
$usuario = 'root';
$senha = '';
$database = 'login';

$conn = new mysqli($host, $usuario, $senha, $database);

if ($conn->connect_error) {
    $response = ['error' => true, 'message' => 'Erro na conexão: ' . $conn->connect_error];
    echo json_encode($response);
    exit();
}

// Verificar se os dados foram enviados
$usuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';


// Verificar se todos os campos foram preenchidos
if ($usuario && $email && $senha) {
  // Criar a consulta SQL
  $sql = "INSERT INTO usuarios (usuario, email, senha) VALUES ('$usuario', '$email', '$senha')";

  if (strpos($email, '@') === false) {
    echo json_encode(['error' => true, 'message' => 'O campo usuário deve ser um email válido.']);
    exit();
  }
  if ($conn->query($sql) === TRUE) {
      $response = ['error' => false, 'message' => 'Cadastro realizado com sucesso!'];
  } else {
      $response = ['error' => true, 'message' => 'Erro ao inserir dados: ' . $conn->error];
  }
} else {
    $response = ['error' => true, 'message' => 'Dados incompletos!'];
}

// Retornar a resposta como JSON
echo json_encode($response);

$conn->close();
?>
