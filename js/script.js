  const stars = document.querySelectorAll('.star-rating-form .star');
  const ratingInput = document.getElementById('reviewRating');

  stars.forEach(star => {
    star.addEventListener('click', function() {
      const value = this.dataset.value;
      ratingInput.value = value;
      stars.forEach(s => s.setAttribute('fill', s.dataset.value <= value ? '#ffc107' : 'gray'));
    });
  });

  // Загальна функція для відправки форми на PNP
async function sendToPNP(data) {
    const webhookUrl = "YOUR_PNP_WEBHOOK_URL"; // заміни на свій PNP URL
    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert("Дані успішно надіслані!");
        } else {
            alert("Помилка при відправці, спробуйте ще раз.");
        }
    } catch (err) {
        console.error(err);
        alert("Помилка при відправці, перевірте підключення.");
    }
}

// Форма швидкої заявки
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
        type: "Заявка на сервіс",
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
    };
    sendToPNP(data);
    this.reset();
});

// Замовлення послуги
document.getElementById("submitOrder").addEventListener("click", function() {
    const data = {
        type: "Замовлення послуги",
        service: document.getElementById("selectedService").value,
        name: document.getElementById("orderName").value,
        phone: document.getElementById("orderPhone").value,
        car: document.getElementById("orderCar").value,
        message: document.getElementById("orderMessage").value
    };
    sendToPNP(data);
    const modal = bootstrap.Modal.getInstance(document.getElementById("orderModal"));
    modal.hide();
    document.getElementById("orderForm").reset();
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
    };

    let response = await fetch("/send_mail", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    let result = await response.json();
    alert(result.status);
});