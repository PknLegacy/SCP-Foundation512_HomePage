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
<script>
(function () {
  const homePage      = document.getElementById("home");
  const securePage    = document.getElementById("secure");
  const secureLoader  = document.getElementById("secure-loader");
  const secureContent = document.getElementById("secure-content");
  const secureText    = document.getElementById("secure-text");
  const backBtn       = document.getElementById("back-btn");
  const scpBox        = document.getElementById("scp-box");

  let loadTimeout = null; // merken, ob ein Timer läuft

  function fetchJSONWithTimeout(url, timeoutMs = 10000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    return fetch(url, { signal: ctrl.signal })
      .then(res => {
        clearTimeout(t);
        if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
        return res.json();
      });
  }

  function extractMessage(data) {
    if (typeof data === "string") return data;
    const m = data.message || data.text || data.content || data.body || data.description;
    if (m) return String(m);
    if (data.title && data.text) return `${data.title}\n\n${data.text}`;
    return JSON.stringify(data, null, 2);
  }

  function showPage(pageEl) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    pageEl.classList.add("active");
  }

  function openSecure() {
    showPage(securePage);
    secureContent.style.display = "none";
    secureText.textContent = "";
    secureLoader.style.display = "flex";

    // Timer starten
    loadTimeout = setTimeout(() => {
      fetchJSONWithTimeout("secure.json", 12000)
        .then(data => {
          secureLoader.style.display = "none";
          secureContent.style.display = "block";
          secureText.textContent = extractMessage(data);
        })
        .catch(err => {
          secureLoader.style.display = "none";
          secureContent.style.display = "block";
          secureText.textContent = "⚠ Fehler beim Laden von secure.json:\n" + err.message;
          console.error(err);
        });
    }, 3000);
  }

  function closeSecure() {
    // Loader abbrechen, falls noch aktiv
    if (loadTimeout) {
      clearTimeout(loadTimeout);
      loadTimeout = null;
    }
    secureLoader.style.display = "none";  // sicherstellen, dass Loader weg ist
    secureContent.style.display = "none"; // Inhalt ausblenden
    showPage(homePage);
  }

  if (scpBox) {
    scpBox.addEventListener("click", openSecure);
  } else {
    console.warn("Hinweis: #scp-box wurde nicht gefunden.");
  }

  backBtn.addEventListener("click", closeSecure);
})();
</script>
