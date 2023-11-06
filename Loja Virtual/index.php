<?php
if (!extension_loaded('sqlite3')) {
    echo 'A extensão SQLite não está ativada no PHP.';
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $mensagem = $_POST["message"];

    try {
        $db = new SQLite3('contatos.db');
    } catch (Exception $e) {
        echo 'Erro ao criar o banco de dados: ',  $e->getMessage(), "\n";
    }
    
    if (!$db) {
        die("Falha ao abrir o banco de dados.");
    }

    $db->exec('CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, telefone TEXT, mensagem TEXT)');

    $stmt = $db->prepare('INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (:nome, :email, :telefone, :mensagem)');
    $stmt->bindValue(':nome', $nome, SQLITE3_TEXT);
    $stmt->bindValue(':email', $email, SQLITE3_TEXT);
    $stmt->bindValue(':telefone', $telefone, SQLITE3_TEXT);
    $stmt->bindValue(':mensagem', $mensagem, SQLITE3_TEXT);

    $result = $stmt->execute();

    if ($result) {
        header("Location: contato.html");
        exit();
    } else {
        echo "Erro na inserção no banco de dados.";
    }

    $db->close();
}
