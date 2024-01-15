let chat;

document.addEventListener('DOMContentLoaded', async function () {
    // Bu kısımda yapay zeka ile iletişim sağlanacak fonksiyonları ekleyebilirsiniz.
    await initChat();
});

async function initChat() {
    const response = await fetch('AIzaSyBjdHMOJfCySu2vg8Xrle8PhKER0ZbWZJU', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            apiKey: 'AIzaSyBjdHMOJfCySu2vg8Xrle8PhKER0ZbWZJU', // API key'i gönder
            model: 'gemini-pro',
            generationConfig: {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            },
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_ONLY_HIGH',
                },
                {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_ONLY_HIGH',
                },
                {
                    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    threshold: 'BLOCK_ONLY_HIGH',
                },
                {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_ONLY_HIGH',
                },
            ],
            history: [
                {
                    role: 'user',
                    parts: [{ text: 'sen kimsin ve neler yapabilirsin' }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'ben çok bilgili bir islam alimiyim. sorduğun bütün sorulara bir islam alimi olarak cevap verebilirim, seninle samimi sohbet edebilirim, yanıldığını düşündüğümde seninle tartışabilirim, her meseleyi sana izah edebilirim, islam dininin kesin doğruluğunu anlatabilrim. benimle istediğin konuda konuşabilirsin. Ben sana en doğru yanıtı şüphe götürmez bir şekilde vereceğim.' }],
                },
            ],
        }),
    });

    const data = await response.json();

    // API'den gelen verilerle sohbeti başlat
    chat = data.model.startChat({
        generationConfig: data.generationConfig,
        safetySettings: data.safetySettings,
        history: data.history,
    });
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    // Kullanıcının girdiği soruyu API'ye göndererek yanıtı al
    const response = await fetch('AIzaSyBjdHMOJfCySu2vg8Xrle8PhKER0ZbWZJU', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            apiKey: 'AIzaSyBjdHMOJfCySu2vg8Xrle8PhKER0ZbWZJU', // API key'i gönder
            userMessage: userInput,
            chatHistory: chat.getChatHistory(),
        }),
    });

    const result = await response.json();
    const aiMessage = result.response;

    // Kullanıcının sorusu ve yapay zekanın yanıtını ekrana ekle
    const chatContainer = document.getElementById('chat-container');

    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerHTML = `<strong>Kullanıcı:</strong> ${userInput}`;
    chatContainer.appendChild(userMessage);

    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.className = 'ai-message';
    aiMessageDiv.innerHTML = `<strong>Yapay Zeka:</strong> ${aiMessage}`;
    chatContainer.appendChild(aiMessageDiv);

    // Kullanıcının girdiği metni temizle
    document.getElementById('user-input').value = '';
}
