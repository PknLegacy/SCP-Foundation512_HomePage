// Page Navigation
document.querySelectorAll('.navbar li').forEach(item => {
    item.addEventListener('click', () => {
        let page = item.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
    });
});

// Loader beim Start
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1500);
});

// JSON Loading for Boxes
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
        const jsonFile = box.getAttribute('data-json');

        fetch(`json/${jsonFile}`)
            .then(response => response.json())
            .then(data => {
                // Fill Content
                document.getElementById('json-title').textContent = data.title;
                document.getElementById('json-text').textContent = data.text;

                // Switch to JSON Page
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById('json-content').classList.add('active');
            })
            .catch(err => {
                document.getElementById('json-title').textContent = "Error";
                document.getElementById('json-text').textContent = "Could not load file.";
            });
    });
});

// Back Button → immer zurück zu "home"
function goBack() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home').classList.add('active');
}

// SCP Files aus JSON laden
document.addEventListener("DOMContentLoaded", () => {
  const scpList = document.getElementById("scp-list");

  fetch("json/data.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(scp => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${scp.id}:</strong> ${scp.title}<br>
          <em>${scp.description}</em><br>
          <a href="${scp.link}" style="color: red;">[Open File]</a>
        `;
        scpList.appendChild(li);
      });
    })
    .catch(error => console.error("Error loading SCP data:", error));
});
// Rechtsklick deaktivieren
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Funktion zum Aktivieren des Vollbildmodus
function activateFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE11
    elem.msRequestFullscreen();
  }
}

// Nach dem ersten Klick in den Vollbildmodus
let fullscreenActivated = false;
document.addEventListener('click', function() {
  if (!fullscreenActivated) {
    activateFullscreen();
    fullscreenActivated = true;
  }
});

// Nach 5 Sekunden automatisch in den Vollbildmodus (falls kein Klick)
setTimeout(function() {
  if (!fullscreenActivated) {
    activateFullscreen();
    fullscreenActivated = true;
  }
}, 5000);
// Globale Uhrzeiten (Beispiel!)
const globalTimes = [
    { city: "Berlin", offset: 2, image: "berlin.png" },
    { city: "New York", offset: -4, image: "ny.png" },
    { city: "Tokyo", offset: 9, image: "tokyo.png" },
    // Weitere Städte...
];

// Beispiel User-Daten (mit Bild)
const users = [
    { name: "Dr. Bright", image: "bright.jpg", info: "SCP Lead Scientist" },
    { name: "Agent Smith", image: "smith.jpg", info: "Security Officer" },
    // ...
];

function showGlobalTimeBox() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    let html = `<h2>Globale Uhrzeiten</h2><div class="clocks">`;
    globalTimes.forEach(tz => {
        html += `<div class="clock">
            <img src="${tz.image}" alt="${tz.city}" width="40"/>
            <div><strong>${tz.city}</strong> <span id="clock-${tz.city}"></span></div>
        </div>`;
    });
    html += `</div><button onclick="closeModal()">Schließen</button>`;
    modal.innerHTML = html;
    document.body.appendChild(modal);

    globalTimes.forEach(tz => {
        setInterval(() => {
            const now = new Date();
            now.setUTCHours(now.getUTCHours() + tz.offset);
            document.getElementById(`clock-${tz.city}`).textContent =
                now.toLocaleTimeString();
        }, 1000);
    });
}

function showSecurityProtocol() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <h2>Sicherheitsprotokoll</h2>
        <div class="animation-bar"></div>
        <p>Protokoll: Nur autorisierte Nutzer. Alle Aktionen werden protokolliert.</p>
        <button onclick="closeModal()">Schließen</button>
    `;
    document.body.appendChild(modal);
}

function showUserInfo() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    let html = `<h2>Nutzer-Informationen</h2><div class="users">`;
    users.forEach(user => {
        html += `<div class="user">
            <img src="${user.image}" alt="${user.name}" width="60"/>
            <div>
                <strong>${user.name}</strong><br/>
                <span>${user.info}</span>
            </div>
        </div>`;
    });
    html += `</div><button onclick="closeModal()">Schließen</button>`;
    modal.innerHTML = html;
    document.body.appendChild(modal);
}

function downloadProtocol() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <h2>Download wird vorbereitet...</h2>
        <div class="loader"></div>
        <p>Bitte warten...</p>
    `;
    document.body.appendChild(modal);
    setTimeout(() => {
        window.location.href = 'Sicherheitsprotokoll_V1.22.1.pdf';
        closeModal();
    }, 2500);
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(m => m.remove());
}

document.querySelectorAll('.box.extra').forEach(box => {
    box.addEventListener('click', function() {
        switch (box.dataset.action) {
            case 'showGlobalTime':
                showGlobalTimeBox();
                break;
            case 'showSecurityProtocol':
                showSecurityProtocol();
                break;
            case 'showUserInfo':
                showUserInfo();
                break;
            case 'downloadProtocol':
                downloadProtocol();
                break;
        }
    });
});
