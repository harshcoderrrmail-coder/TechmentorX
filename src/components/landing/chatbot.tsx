import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello 👋 I'm your AI Medical Assistant. You can ask me about blood reports, cholesterol, sugar levels, or general health questions!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // 🔥 Smart Demo Reply Logic
  const getBotReply = (message: string) => {
    const msg = message.toLowerCase();

    // Casual greetings
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return "Hi there! 😊 How can I help you with your medical report today?";
    }

    if (msg.includes("how are you")) {
      return "I'm functioning perfectly 🤖 How are you feeling today?";
    }

    if (msg.includes("what can you do")) {
      return "I can simplify medical reports, explain blood test values, and highlight possible health risks in simple language.";
    }

    if (msg.includes("who are you")) {
      return "I'm an AI-powered medical assistant designed to make health reports easier to understand.";
    }

    if (msg.includes("thank")) {
      return "You're welcome! 😊 I'm here to help anytime.";
    }

    // Medical responses
    if (msg.includes("hemoglobin")) {
      return "Your hemoglobin level appears slightly low. This may indicate mild anemia. Iron-rich foods and medical consultation are recommended.";
    }

    if (msg.includes("blood sugar") || msg.includes("glucose")) {
      return "Your blood sugar level is slightly elevated. This may indicate prediabetes. Lifestyle changes like exercise and reducing sugar intake are advised.";
    }

    if (msg.includes("cholesterol")) {
      return "Your cholesterol levels are higher than normal. A balanced diet and regular physical activity may help improve it.";
    }

    if (msg.includes("bp") || msg.includes("blood pressure")) {
      return "Your blood pressure appears within a manageable range. Continue maintaining a healthy lifestyle.";
    }

    if (msg.includes("report")) {
      return "After analyzing your report, most values are within range. A few parameters are slightly outside normal limits but not critical.";
    }

    // Default response
    return "Based on your input, your health indicators appear stable. For an accurate diagnosis, please consult a licensed healthcare professional.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        role: "assistant",
        content: getBotReply(input),
      };

      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 900);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-[#4E9F3D] hover:bg-[#3e8532] text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          
          <div className="bg-[#191A19] text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h2 className="font-semibold">Medical Assistant</h2>
            <button onClick={toggleChat}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-[#4E9F3D] text-white ml-auto"
                    : "bg-white text-black border border-gray-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-gray-500">
                Analyzing your input...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

        <div className="p-3 border-t border-gray-200 flex gap-2">
  <input
    type="text"
    placeholder="Type your message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E9F3D]"
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  />

  <button
    onClick={sendMessage}
    className="bg-[#4E9F3D] hover:bg-[#3e8532] text-white px-4 rounded-xl transition-all duration-300"
  >
    Send
  </button>
  <button
    onClick={() => alert("Camera button clicked! 📸")}
    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 rounded-xl transition-all duration-300"
  >
    <i className="fa-solid fa-camera"></i>
  </button>

</div>

          

          <div className="text-xs text-gray-500 p-2 text-center">
            This chatbot provides educational information only and does not replace professional medical advice.
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
