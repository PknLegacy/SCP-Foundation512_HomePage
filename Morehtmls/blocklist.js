// Rechtsklick deaktivieren
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Rechtsklick wurde deaktiviert', 'error');
});

emailjs.init('3j7DIeRM3LvL7NrMt');

// Blocklist-Validierung: Sofortiges Feedback
function validateBlocklist() {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const email = emailInput.value;
    const name = nameInput.value;
    const blockResult = window.blocklistCheck(email, name);

    if (blockResult.isEmailBlocked) {
        emailInput.setCustomValidity('Diese E-Mail-Adresse ist nicht zugelassen.');
        emailInput.classList.add('invalid-input');
    } else {
        emailInput.setCustomValidity('');
        emailInput.classList.remove('invalid-input');
    }

    if (blockResult.isUsernameBlocked) {
        nameInput.setCustomValidity('Dieser Benutzername ist nicht zugelassen.');
        nameInput.classList.add('invalid-input');
    } else {
        nameInput.setCustomValidity('');
        nameInput.classList.remove('invalid-input');
    }
}

document.getElementById('email').addEventListener('input', validateBlocklist);
document.getElementById('name').addEventListener('input', validateBlocklist);

// Formular-Handler mit Blocklist-Prüfung
document.getElementById('recruitment-form').addEventListener('submit', function(event) {
    const form = document.getElementById('recruitment-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const blockResult = window.blocklistCheck(email, name);

    if (blockResult.isEmailBlocked || blockResult.isUsernameBlocked) {
        event.preventDefault();
        if (blockResult.isEmailBlocked) {
            showNotification('FEHLER: Diese E-Mail-Adresse ist auf der Sperrliste.', 'error');
            emailInput.reportValidity();
        }
        if (blockResult.isUsernameBlocked) {
            showNotification('FEHLER: Dieser Benutzername ist auf der Sperrliste.', 'error');
            nameInput.reportValidity();
        }
        return;
    }

    // Pflichtfelder prüfen
    const formData = {
        name: name,
        age: document.getElementById('age').value,
        country: document.getElementById('country').value,
        email: email,
        profession: document.getElementById('profession').value,
        department: document.getElementById('department').value,
        experience: document.getElementById('experience').value,
        clearance: document.getElementById('clearance').value,
        motivation: document.getElementById('motivation').value,
        skills: document.getElementById('skills').value,
        references: document.getElementById('references').value,
        date: new Date().toLocaleDateString('de-DE'),
        timestamp: new Date().toISOString(),
        access_code: generateAccessCode(),
        unique_id: generateUniqueId(),
        encryption_level: "AES-256"
    };

    if (!formData.name || !formData.age || !formData.country || !formData.email || !formData.profession || !formData.motivation) {
        event.preventDefault();
        showNotification('Bitte füllen Sie alle Pflichtfelder aus', 'error');
        return;
    }

    event.preventDefault();

    const led = document.querySelector('.led');
    if (led) led.classList.remove('led-green');

    emailjs.send('service_h2tya1h', 'template_ok05na4', formData)
        .then(function(response) {
            showNotification('Ihre Bewerbung wurde erfolgreich übermittelt. Wir werden uns in Kürze mit Ihnen in Verbindung setzen.', 'success');
            form.reset();
            if (led) led.classList.add('led-green');
            setTimeout(() => led?.classList.remove('led-green'), 5000);
        }, function(error) {
            showNotification('Fehler beim Senden Ihrer Bewerbung. Bitte versuchen Sie es später erneut.', 'error');
        });
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 5000);
}

function generateAccessCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateUniqueId() {
    return 'SCP-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5);
}

setInterval(() => {
    const securityNotice = document.querySelector('.security-notice');
    const randomText = [
        'SECURE CONNECTION ESTABLISHED',
        'MONITORING USER ACTIVITY',
        'ENCRYPTED CHANNEL ACTIVE',
        'SECURITY PROTOCOLS ENGAGED',
        'AUTHENTICATION VERIFIED'
    ];
    securityNotice.textContent = randomText[Math.floor(Math.random() * randomText.length)];
}, 5000);
