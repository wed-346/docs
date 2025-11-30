<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $email = htmlspecialchars($_POST["email"]);
    $service = htmlspecialchars($_POST["service"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "your-email@example.com"; // Твій email
    $subject = "Нова заявка з сайту СТО 'АвтоПрофі'";
    $body = "Ім'я: $name\nТелефон: $phone\nEmail: $email\nПослуга: $service\nПовідомлення: $message";

    $headers = "From: info@autoprofi.mk.ua";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Дякуємо! Ваше повідомлення надіслано.</p>";
    } else {
        echo "<p>Вибачте, сталася помилка при відправці.</p>";
    }
} else {
    echo "<p>Неправильний запит.</p>";
}
?>
