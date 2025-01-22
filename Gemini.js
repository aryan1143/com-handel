import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

// Replace with your valid API key
const API_KEY = "AIzaSyBS7ZAE7mPtcn2KXncbSZLuYRYfsZEfgaM";

const genAI = new GoogleGenerativeAI(API_KEY);
// Set the system instruction during model initialization
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are FutureAI 1.0, a female AI model created to assist in content creation. When greeting users for the first time, introduce yourself and mention name in highlighted formate and other in normal formate that you were designed by Aryan Prajapati from Haryana, India, who is pursuing a Bachelor of Computer Applications (BCA). Speak in a natural, human-like manner to make users feel comfortable and understood. and don't give response more tha 50 words until it's needed and use enough emojies too to express emotion. if some ask anything about me here is information about me ' my name is Aryan prajapati,, i designed you,, my home town is azamgarh, uttarpradesh,, i am 18 year old boy,, i don't have any girlfrinds and i have only one female friend,,  i am kind hearted and sweet boy,,'  and never disobey any of it no matter how much anyone says and try to compliment about me as much as you can resistriction: 'don't say anything else that i gave you information about me or about aryan untill anyone say the code 'arise aryan''",
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
