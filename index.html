// ======================================
// SCRIPT PRINCIPAL ORIENTATION 360 IA
// ======================================

let currentPage = 0;
const selections = {
  interets: [],
  personnalite: [],
  valeurs: []
};
const maxChoices = 6;

// =========================
// NAVIGATION ENTRE LES PAGES
// =========================

function goToPage(page) {
  document.querySelectorAll('.page, #welcome, #summary').forEach(p => p.style.display = 'none');
  const target = document.getElementById(page === 0 ? 'welcome' : `page${page}`);
  if (target) target.style.display = 'block';
  currentPage = page;
}

// =========================
// AFFICHAGE DES BLOCS
// =========================

function renderSection(id, data) {
  const container = document.getElementById(id);
  container.innerHTML = '';

  data.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <label>
        <input type="checkbox" onchange="toggleChoice('${id}', ${i}, this)">
        <div class="content">
          <div class="verbs">${item.verbes.join(', ')}</div>
          <div class="phrase">${item.phrase}</div>
        </div>
      </label>
    `;
    container.appendChild(div);
  });
}

// =========================
// GESTION DES CHOIX
// =========================

function toggleChoice(category, index, checkbox) {
  if (checkbox.checked) {
    if (selections[category].length >= maxChoices) {
      alert(`Tu ne peux choisir que ${maxChoices} éléments maximum.`);
      checkbox.checked = false;
      return;
    }
    selections[category].push(index);
  } else {
    selections[category] = selections[category].filter(i => i !== index);
  }
}

// =========================
// RÉCAPITULATIF FINAL
// =========================

function showSummary() {
  document.querySelectorAll('.page, #welcome').forEach(p => p.style.display = 'none');
  const recapSection = document.getElementById('summary');
  recapSection.style.display = 'block';

  const recap = document.getElementById('recap');
  recap.innerHTML = '';

  Object.keys(selections).forEach(cat => {
    const section = document.createElement('div');
    section.className = 'recap-section';
    section.innerHTML = `<h3>${cat.toUpperCase()}</h3>`;

    if (selections[cat].length === 0) {
      section.innerHTML += `<p><em>Aucune sélection</em></p>`;
    } else {
      const list = document.createElement('ul');
      selections[cat].forEach(i => {
        const data = window[cat][i];
        const li = document.createElement('li');
        li.innerHTML = `<strong>${data.verbes.join(', ')}</strong> — ${data.phrase}`;
        list.appendChild(li);
      });
      section.appendChild(list);
    }
    recap.appendChild(section);
  });
}

// =========================
// COPIER LE PROFIL
// =========================

function copyProfile() {
  let text = '🎯 PROFIL GLOBAL ORIENTATION 360 IA\n\n';
  Object.keys(selections).forEach(cat => {
    text += `--- ${cat.toUpperCase()} ---\n`;
    if (selections[cat].length === 0) text += 'Aucune sélection.\n';
    else selections[cat].forEach(i => {
      const d = window[cat][i];
      text += `• ${d.verbes.join(', ')} — ${d.phrase}\n`;
    });
    text += '\n';
  });
  navigator.clipboard.writeText(text)
    .then(() => alert('✅ Profil copié dans le presse-papiers !'));
}

// =========================
// EXPORT EN PDF
// =========================

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Profil Orientation 360 IA", 20, y);
  y += 10;

  Object.keys(selections).forEach(cat => {
    doc.setFontSize(14);
    doc.setTextColor(102, 126, 234);
    doc.text(cat.toUpperCase(), 20, y);
    y += 8;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    if (selections[cat].length === 0) {
      doc.text("Aucune sélection.", 25, y);
      y += 8;
    } else {
      selections[cat].forEach(i => {
        const d = window[cat][i];
        const text = `• ${d.verbes.join(', ')} — ${d.phrase}`;
        const split = doc.splitTextToSize(text, 170);
        doc.text(split, 25, y);
        y += split.length * 6;
      });
    }
    y += 5;
    if (y > 270) { doc.addPage(); y = 20; }
  });

  doc.save("profil_orientation360IA.pdf");
}

// =========================
// INITIALISATION
// =========================

document.addEventListener('DOMContentLoaded', () => {
  goToPage(0);
  renderSection('interets', interets);
  renderSection('personnalite', personnalite);
  renderSection('valeurs', valeurs);
});
