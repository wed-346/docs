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

  // Додатковий JavaScript для анімацій та взаємодії
    
    document.addEventListener('DOMContentLoaded', function() {
        // Анімація при прокручуванні
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);
        
        // Спостерігаємо за всіма елементами з класом для анімації
        document.querySelectorAll('.animate-fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Обробка кліків на вакансії для відкриття деталей
        document.querySelectorAll('[data-bs-target="#vacancyModal"]').forEach(button => {
            button.addEventListener('click', function() {
                const vacancy = this.getAttribute('data-vacancy');
                document.getElementById('selectedVacancy').value = vacancy;
                document.getElementById('vacancyPosition').value = vacancy;
            });
        });
        
        // Обробка кліків на послуги
        document.querySelectorAll('[data-bs-target="#orderModal"]').forEach(button => {
            button.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                document.getElementById('selectedService').value = service;
            });
        });
        
        // Анімація для кнопок підтвердження
        document.querySelectorAll('.modal-btn-submit').forEach(button => {
            button.addEventListener('click', function() {
                // Анімація натискання
                this.classList.add('active');
                setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
                
                // Тут можна додати логіку відправки форми
                const formId = this.closest('.modal').querySelector('form').id;
                console.log(`Відправка форми: ${formId}`);
                
                // Закриваємо модалку після успішної відправки
                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(this.closest('.modal'));
                    modal.hide();
                    
                    // Показуємо повідомлення про успіх
                    alert('Дякуємо! Ваша заявка відправлена. Ми зв\'яжемося з вами найближчим часом.');
                }, 1000);
            });
        });
        
        // Плавна прокрутка для навігації
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Анімація чисел у статистиці
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 30);
        });
    });