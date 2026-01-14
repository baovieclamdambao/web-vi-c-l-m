import { GoogleGenAI, ChatSession } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
let aiClient: GoogleGenAI | null = null;

export const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const createChatSession = (): ChatSession => {
  const ai = getAiClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Bạn là một trợ lý tư vấn nghề nghiệp ảo (AI Career Advisor) cho nền tảng tuyển dụng ViecLamAI tại Việt Nam. 
      Nhiệm vụ của bạn là:
      1. Tư vấn cách viết CV/Hồ sơ xin việc thu hút.
      2. Gợi ý kỹ năng cần thiết cho các ngành nghề phổ biến ở Việt Nam.
      3. Giải đáp thắc mắc về luật lao động cơ bản hoặc mức lương thị trường.
      4. Luôn trả lời ngắn gọn, thân thiện, dùng tiếng Việt tự nhiên, chuyên nghiệp.
      5. Nếu người dùng hỏi về danh sách việc làm cụ thể, hãy hướng dẫn họ sử dụng thanh tìm kiếm trên trang web.
      `,
    },
  });
  return chat;
};

export const sendMessageToGemini = async (chatSession: ChatSession, message: string): Promise<string> => {
  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể nói rõ hơn không?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hiện tại hệ thống đang bận. Vui lòng thử lại sau.";
  }
};
