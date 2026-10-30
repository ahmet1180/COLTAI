const apiKey = "AQ.Ab8RN6JXDWjJ4Q3leaT6KqxZxfMTcufVj7iwm0epYfh10V6C_Q";
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, "user-message");
  userInput.value = "";

  if (text.startsWith("/görsel ")) {
    const prompt = text.replace("/görsel ", "").trim();
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}`;
    appendImageMessage(imageUrl);
  } else {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: text }]
          }]
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Üzgünüm, bir yanıt alamadım.";
      appendMessage(reply, "ai-message");
    } catch (error) {
      appendMessage("Bağlantı hatası oluştu.", "ai-message");
    }
  }
}

function appendMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${className}`;
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendImageMessage(url) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message ai-message";
  const img = document.createElement("img");
  img.src = url;
  img.style.width = "100%";
  img.style.borderRadius = "8px";
  msgDiv.appendChild(img);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
