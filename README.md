
# 🤖 I Built an AI-Powered Support Assistant Using OpenAI and Okta

Hi LinkedIn 👋 — I recently built a smart, AI-driven support bot that combines real-time communication, voice recognition, and secure identity workflows. It was a chance to sharpen my skills and show how AI can actually *enhance* the support experience, not replace it.

---

## 🧠 What It Does

Imagine needing IT help — instead of waiting for a human, you chat with a friendly AI assistant. You can type or even speak your issue. The bot understands your intent, detects how frustrated you might be, and helps solve your issue securely — even triggering real backend actions.

This assistant:
- Accepts both **voice** and **text**
- Uses AI to **analyze tone and categorize** requests
- Responds **in real-time** with helpful next steps
- Can trigger **secure account actions** (like resets)
- Supports follow-up steps like **QR code enrollment**

---

## 🔌 Tech + Integrations

- ✅ **[OpenAI](https://openai.com/)** – GPT-3.5 for understanding and categorizing text, Whisper for voice transcription  
- ✅ **[Okta](https://www.okta.com/)** – For triggering secure actions like resetting authenticators or enrolling a user in MFA  

Built using:
- **Node.js + Express**
- **Socket.IO** for real-time messaging
- **Axios** to communicate with Okta APIs
- **dotenv** for configuration
- **OpenAI APIs** for chat and audio analysis

---

## 🔐 How I Handled Auth (Without Overengineering)

To keep the assistant both powerful and secure, I used:

### 🧠 OpenAI API Key
Used for:
- Sentiment analysis + classification via `gpt-3.5-turbo`
- Voice transcription via `whisper-1`

Configured using:
```env
AI_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```

### 🔐 Okta API Token
Used to:
- Reset authenticators
- Enroll users in identity verification workflows

From your Okta Admin Console:
```env
SERVICE_TOKEN=your_okta_api_token
```

### 🌐 Okta Client ID & Secret
If integrating with OIDC for user login, you'll get these when creating an OIDC app (Web Application):
- Client ID: public
- Client Secret: private (used only server-side)

---

## ⚙️ Real-Time Demo Flow

Here’s how a typical support interaction flows:

1. User types or records their issue
2. The bot transcribes voice to text (if needed)
3. It uses AI to detect tone + categorize the problem
4. Offers help (e.g. reset, enroll, escalate)
5. Triggers secure actions (like resetting factors via Okta)
6. Optionally offers a QR code to re-enroll in MFA

All in one smooth, conversational interaction 💬

---

## 🧪 Why I Built This

Like many people in tech, I’ve been reflecting on where AI fits into the tools we build and use daily. I built this to:

- Experiment with **real-time language understanding**
- Apply AI to **practical workflows**, not just chatbots
- Show how **backend identity systems** like Okta can work with AI
- Demonstrate full-stack AI capability — from input to secure action

---

## 🚀 What's Next

🔜 I'm thinking of adding:
- Full user authentication
- Natural language follow-ups
- Identity verification options like Persona or Zoom
- AI-based knowledge lookups for self-service FAQs

---

## 💼 I'm Open to Work

If you’re building with AI, OpenAI, or identity — I’d love to chat.

- 🧠 I understand both backend systems and human-centered design
- 🔐 I’ve worked with security + identity platforms
- ⚙️ I’m comfortable shipping prototypes or scaling products

📬 Let’s connect on [LinkedIn](https://www.linkedin.com/in/mick-johnson-00025018/) or email me: **mick.jae.johnson@gmail.com**

Thanks for reading — and if you're exploring AI in support or identity, I’d love to learn from your work too.
