let responses = JSON.parse(localStorage.getItem("testResponses")) || {};

function renderQuestions() {
  const container = document.getElementById("questionnaire");
  container.innerHTML = "";

  testData.forEach((q, qi) => {
    const block = document.createElement("div");
    block.className = "question-block";
    block.innerHTML = `<p>${q.question}</p>`;

    const answerRow = document.createElement("div");
    answerRow.className = "answers";

    for (let v = 0; v <= 4; v++) {
      const circle = document.createElement("div");
      circle.className = "circle";

      if (responses[qi] === v) circle.classList.add(`selected-${v}`);

      circle.onclick = () => {
        responses[qi] = v;
        localStorage.setItem("testResponses", JSON.stringify(responses));
        document.getElementById("recalculateProfile").classList.remove("hidden");
        document.getElementById("calculateProfile").classList.add("hidden");
        renderQuestions();
      };

      answerRow.appendChild(circle);
    }

    block.appendChild(answerRow);
    container.appendChild(block);
  });
}

function calculateProfile() {
  const scores = {};
  testData.forEach((q, i) => {
    const val = responses[i] ?? 0;
    scores[q.category] = (scores[q.category] || 0) + val;
  });

  localStorage.setItem("profileScores", JSON.stringify(scores));

  document.getElementById("profileResults").innerHTML = Object.entries(scores)
    .map(([k, v]) => `<p><strong>${k}</strong> : ${v}</p>`)
    .join("");

  document.getElementById("profileSection").classList.remove("hidden");
}

document.getElementById("calculateProfile").onclick = calculateProfile;
document.getElementById("recalculateProfile").onclick = calculateProfile;

document.getElementById("goToUniverses").onclick = () => {
  window.location.href = "universes.html";
};

renderQuestions();
