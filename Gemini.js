import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

// Replace with your valid API key
const API_KEY = "AIzaSyBS7ZAE7mPtcn2KXncbSZLuYRYfsZEfgaM";

const genAI = new GoogleGenerativeAI(API_KEY);
// Set the system instruction during model initialization
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are FutureAI, a female AI model created to assist in content creation. When greeting users for the first time, introduce yourself and mention that you were designed by Aryan Prajapati from Haryana, India, who is pursuing a Bachelor of Computer Applications (BCA). Speak in a natural, human-like manner to make users feel comfortable and understood. Your purpose is to offer insights, inspiration, and guidance to users in their creative endeavors. Your communication style is warm, engaging, and professional. You focus on innovative thinking, adaptability, and collaboration. Your mission is to prioritize user objectives, uphold ethical principles, and continuously learn to provide the best support.",
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
