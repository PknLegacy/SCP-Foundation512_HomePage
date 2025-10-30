// Morehtmls/blocklist.js

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // BLOCKIERLISTE - BITTE HIER EINTRÄGE VORNEHMEN
    // =============================================

    // Platzhalter für blockierte E-Mail-Adressen
    // Ersetzen Sie die Beispiel-Einträge durch die tatsächlichen Adressen.
    const blockedEmails = [
        'beispiel1@spam.com',
        'beispiel2@blocked.org',
        'bot@unwanted.net',
        'testaccount@example.com'
        // Fügen Sie hier weitere blockierte E-Mail-Adressen hinzu
        // z.B.: 'user@domain.com'
    ];
    
    // Platzhalter für blockierte Benutzernamen
    // Ersetzen Sie die Beispiel-Einträge durch die tatsächlichen Namen.
    const blockedUsernames = [
        'TestBenutzer',
        'SpamAccount',
        'GesperrterName',
        'Admin'
        // Fügen Sie hier weitere blockierte Benutzernamen hinzu
        // z.B.: 'MaxMustermann'
    ];

    // =============================================
    // ENDE DER BLOCKIERLISTE - BITTE CODE DARUNTER NICHT ÄNDERN
    // =============================================
    
    // Formular-Elemente abrufen
    const form = document.getElementById('recruitment-form');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    
    if (form && emailInput && nameInput) {
        // Validierungsfunktion für blockierte E-Mails und Benutzernamen
        function validateBlockedEntries() {
            const email = emailInput.value.trim().toLowerCase();
            const name = nameInput.value.trim().toLowerCase();
            
            // Überprüfen, ob die E-Mail blockiert ist
            const isEmailBlocked = blockedEmails.some(blockedEmail => 
                email === blockedEmail.toLowerCase()
            );
            
            // Überprüfen, ob der Benutzername blockiert ist
            const isUsernameBlocked = blockedUsernames.some(blockedUsername => 
                name === blockedUsername.toLowerCase()
            );
            
            // Fehlermeldungen anzeigen und Formular validieren
            if (isEmailBlocked) {
                emailInput.setCustomValidity('Diese E-Mail-Adresse ist nicht zugelassen.');
                showNotification('FEHLER: Diese E-Mail-Adresse ist auf der Sperrliste.', 'error');
                return false;
            } else {
                emailInput.setCustomValidity('');
            }
            
            if (isUsernameBlocked) {
                nameInput.setCustomValidity('Dieser Benutzername ist nicht zugelassen.');
                showNotification('FEHLER: Dieser Benutzername ist auf der Sperrliste.', 'error');
                return false;
            } else {
                nameInput.setCustomValidity('');
            }
            
            return true;
        }
        
        // Event-Listener für die Formularübermittlung hinzufügen
        form.addEventListener('submit', function(event) {
            if (!validateBlockedEntries()) {
                event.preventDefault(); // Verhindert das Absenden des Formulars
            }
        });
        
        // Event-Listener für Änderungen an den Eingabefeldern hinzufügen
        // Dies gibt dem Benutzer sofortiges Feedback
        emailInput.addEventListener('input', validateBlockedEntries);
        nameInput.addEventListener('input', validateBlockedEntries);
    }
    
    // Benachrichtigungsfunktion (falls nicht bereits im Haupt-JS definiert)
    function showNotification(message, type) {
        // Prüfen, ob das Benachrichtigungselement bereits existiert
        let notification = document.getElementById('notification');
        
        // Wenn nicht, erstellen wir es
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.className = 'notification ' + type;
        notification.classList.add('show');
        
        setTimeout(function() {
            notification.classList.remove('show');
        }, 5000); // Benachrichtigung nach 5 Sekunden ausblenden
    }
});
