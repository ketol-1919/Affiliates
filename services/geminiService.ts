import { GoogleGenAI } from "@google/genai";

/**
 * Converts a File object to a base64 encoded string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Result is in format "data:mime/type;base64,ENCODED_STRING"
      // We only need the encoded string part.
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Fix: Initialize the GoogleGenAI client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


/**
 * Generates a caption for an image using the Gemini API.
 * @param imageBase64 - The base64 encoded image string.
 * @param mimeType - The MIME type of the image.
 * @returns A promise that resolves to a generated caption.
 */
export const generateCaption = async (imageBase64: string, mimeType: string): Promise<string> => {
  // Fix: Use the Gemini API to generate a caption from the image and a text prompt.
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType,
    },
  };
  const textPart = {
    text: "この画像のアフィリエイト投稿用のキャッチーなキャプションを日本語で書いてください。製品を宣伝し、行動を促すフレーズと関連するハッシュタグを含めてください。",
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });
  
  return response.text;
};
