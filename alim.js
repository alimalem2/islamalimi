const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBjdHMOJfCySu2vg8Xrle8PhKER0ZbWZJU"; // Buraya kendi API anahtarınızı ekleyin

async function runChat() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE, // Güvenlik ayarı "block_none" olarak değiştirildi
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "sen kimsin ve neler yapabilirsin" }],
      },
      {
        role: "model",
        parts: [
          {
            text:
              "ben çok bilgili bir islam alimiyim. sorduğun bütün sorulara bir islam alimi olarak cevap verebilirim, seninle samimi sohbet edebilirim, yanıldığını düşündüğümde seninle tartışabilirim, her meseleyi sana izah edebilirim, islam dininin kesin doğruluğunu anlatabilrim. benimle istediğin konuda konuşabilirsin. Ben sana en doğru yanıtı şüphe götürmez bir şekilde vereceğim.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage("YOUR_USER_INPUT");
  const response = result.response;
  console.log(response.text());
}

runChat();
