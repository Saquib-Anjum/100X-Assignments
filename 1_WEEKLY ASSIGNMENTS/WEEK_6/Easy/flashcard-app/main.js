const topicSelect = document.getElementById("topicSelect");
const cardContainer = document.getElementById("cardContainer");

// Load JSON data
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    // Populate topics
    Object.keys(data).forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic;
      option.textContent = topic;
      topicSelect.appendChild(option);
    });

    // When topic selected
    topicSelect.addEventListener("change", () => {
      const selectedTopic = topicSelect.value;
      cardContainer.innerHTML = "";

      if (!selectedTopic) return;

      const questions = data[selectedTopic];

      questions.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <h3>${item.question}</h3>
          <p class="answer">${item.answer}</p>
        `;

        // Toggle answer on click
        card.addEventListener("click", () => {
          const answer = card.querySelector(".answer");

          answer.style.display =
            answer.style.display === "block" ? "none" : "block";
        });

        cardContainer.appendChild(card);
      });
    });
  });
