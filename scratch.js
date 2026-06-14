import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function listModels() {
  try {
    const response = await ai.models.list();
    for (const model of response.data) {
      if (model.name.includes('embed')) {
        console.log("Embedding model found:", model.name);
      }
    }
  } catch (e) {
    console.error("Error listing models:", e.message);
  }
}

listModels();
