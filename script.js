const apiKey = AQ.Ab8RN6JXDWjJ4Q3leaT6KqxZxfMTcufVj7iwm0epYfh10V6C_Q; // Kendi Gemini API anahtarını buraya ekleyebilirsin
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
    // Gemini API entegrasyonu veya örnek yanıt
    appendMessage("Yapay zeka yanıtı yakında aktif olacak...", "ai-message");
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
