

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBl_X8uHlzJ3wkLs1sA526wrfq2FLh7HJM" });

export default async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:prompt ,
  });
  console.log(response.text);
  return response.text
}

