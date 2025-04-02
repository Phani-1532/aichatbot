

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBl_X8uHlzJ3wkLs1sA526wrfq2FLh7HJM" });

export default async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:"What is react js" ,
  });
  console.log(response.text);
}

await main();