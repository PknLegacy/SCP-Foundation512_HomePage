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
    
    // Blocklist-Funktionen global bereitstellen
    window.blocklistCheck = function(email, name) {
        email = (email || '').trim().toLowerCase();
        name = (name || '').trim().toLowerCase();

        const isEmailBlocked = blockedEmails.some(blockedEmail => email === blockedEmail.toLowerCase());
        const isUsernameBlocked = blockedUsernames.some(blockedUsername => name === blockedUsername.toLowerCase());

        return { isEmailBlocked, isUsernameBlocked };
    };
});
