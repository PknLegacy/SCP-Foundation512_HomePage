// Morehtmls/blocklist.js

// Blocklist als globale Variable (window.Blocklist), damit andere Scripte darauf zugreifen können
window.Blocklist = {
    blockedEmails: [
        'beispiel1@spam.com',
        'beispiel2@blocked.org',
        'bot@unwanted.net',
        'testaccount@example.com'
        // Weitere blockierte E-Mail-Adressen hier eintragen
    ],
    blockedUsernames: [
        'TestBenutzer',
        'SpamAccount',
        'GesperrterName',
        'Admin'
        // Weitere blockierte Benutzernamen hier eintragen
    ],
    // Validierungsfunktion
    isBlocked(email, name) {
        email = (email || '').trim().toLowerCase();
        name = (name || '').trim().toLowerCase();

        const isEmailBlocked = this.blockedEmails.some(blockedEmail => email === blockedEmail.toLowerCase());
        const isUsernameBlocked = this.blockedUsernames.some(blockedUsername => name === blockedUsername.toLowerCase());

        return { isEmailBlocked, isUsernameBlocked };
    }
};
