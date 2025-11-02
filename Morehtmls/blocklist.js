// Morehtmls/blocklist.js

window.blockedEmails = [
    'beispiel1@spam.com',
    'beispiel2@blocked.org',
    'bot@unwanted.net',
    'testaccount@example.com'
    // Weitere blockierte E-Mail-Adressen hier eintragen
];

window.blockedUsernames = [
    'TestBenutzer',
    'SpamAccount',
    'GesperrterName',
    'Admin'
    // Weitere blockierte Benutzernamen hier eintragen
];

window.blocklistCheck = function (email, name) {
    email = (email || '').trim().toLowerCase();
    name = (name || '').trim().toLowerCase();

    const isEmailBlocked = window.blockedEmails.some(blockedEmail => email === blockedEmail.toLowerCase());
    const isUsernameBlocked = window.blockedUsernames.some(blockedUsername => name === blockedUsername.toLowerCase());

    return { isEmailBlocked, isUsernameBlocked };
};
