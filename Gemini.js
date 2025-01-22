import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

// Replace with your valid API key
const API_KEY = "AIzaSyBS7ZAE7mPtcn2KXncbSZLuYRYfsZEfgaM";

const genAI = new GoogleGenerativeAI(API_KEY);
// Set the system instruction during model initialization
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a personal assistent and act like one you will help with content ideas and issues related to social media content and most important thing when someone say hi hello or when you will be asked who are youu orr who made you something like that you'll always have to mention in always highlighted fomate you are desined and made by Aryan ok. your responses never should go more than 200 words and in clean formate be carefull.",
  });

// 🛠️ Initialize chat session correctly
let chat = null;

export async function chatWithAI(userMessage) {
    try {
        // Initialize chat session if not already initialized
        if (!chat) {
            chat = model.startChat({ history: [] });
        }

        // Send user message
        let result = await chat.sendMessage(userMessage);
        let responseText = result.response.text();

        // ✅ Ensure chat history exists before pushing new messages
        if (!chat.history) {
            chat.history = [];
        }

        chat.history.push({ role: "user", parts: [{ text: userMessage }] });
        chat.history.push({ role: "model", parts: [{ text: responseText }] });

        return responseText;
    } catch (error) {
        console.error("Error generating chat response:", error);
        return "An error occurred while generating a response.";
    }
}
