const files = [
  { name: "SCP-173_containment.sec", status: "critical", scp: "173", warning: "Blood Moon imminent - Enhanced security required" },
  { name: "SCP-049_medical.dat", status: "critical", scp: "049", warning: "Increased activity during crimson phenomena" },
  { name: "SCP-682_termination.log", status: "critical", scp: "682", warning: "Blood Moon enhances regenerative capabilities" }
];

function addLogEntry(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const logOutput = document.getElementById('logOutput');
  const logDiv = document.createElement('div');
  logDiv.innerHTML = `<span>[${timestamp}]</span> <span>${message}</span>`;
  logOutput.appendChild(logDiv);
  logOutput.scrollTop = logOutput.scrollHeight;
}

function populateFiles() {
  const fileList = document.getElementById('fileList');
  files.forEach((file, index) => {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-item';
    fileDiv.innerHTML = `<div>${file.name}</div>`;
    fileDiv.onclick = () => selectFile(file);
    fileList.appendChild(fileDiv);
  });
}

function selectFile(file) {
  addLogEntry(`File selected: ${file.name}`, 'success');
  fetch(`Morehtmls/moredata/scp-${file.scp}.json`)
    .then(res => res.json())
    .then(data => {
      const codeOutput = document.getElementById('codeOutput');
      codeOutput.innerHTML = `<h3>${data.title}</h3><p><strong>Risk:</strong> ${data.risk}</p><p>${data.details}</p>`;
    })
    .catch(() => addLogEntry(`No JSON found for SCP-${file.scp}`, 'error'));
}

// Button
document.addEventListener('DOMContentLoaded', () => {
  populateFiles();
  document.getElementById('more-btn').addEventListener('click', () => {
    window.location.href = "Morehtmls/securityandupdates.html";
  });
});
