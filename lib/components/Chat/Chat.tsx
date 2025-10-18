import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateResponse, type GenerationResult } from "./generateResponse";

const moodSuggestions = ["Happy", "Sad", "Excited", "Angry", "Chill"];

export const Chat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  return (
    <>
      {/* Sticky Button */}
      <button
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          borderRadius: "50%",
          width: 56,
          height: 56,
          background: "#007bff",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        💬
      </button>
      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 90,
              right: 24,
              width: 320,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              padding: 20,
              zIndex: 1001,
            }}
          >
            <button
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "none",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
              }}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
            <div style={{ marginBottom: 12 }}>
              <strong>How are you feeling?</strong>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              {moodSuggestions.map((mood) => (
                <button
                  key={mood}
                  style={{
                    background: "#f1f1f1",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 12px",
                    cursor: "pointer",
                  }}
                  onClick={() => setInput(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!input.trim()) return;
                setLoading(true);
                setResult(null);
                const res = await generateResponse(input);
                setResult(res);
                setLoading(false);
              }}
              style={{ display: "flex", gap: 8 }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your mood..."
                style={{
                  flex: 1,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  padding: 8,
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
            {loading && <div style={{ marginTop: 16 }}>Generating...</div>}
            {result && (
              <div style={{ marginTop: 16 }}>
                <div>
                  <strong>Memes:</strong>{" "}
                  {result.memes.map((m, i) => (
                    <div key={i}>{m}</div>
                  ))}
                </div>
                <div style={{ marginTop: 8 }}>
                  <strong>Emojis:</strong> {result.emojis.join(" ")}
                </div>
                <div style={{ marginTop: 8 }}>
                  <strong>Slogans:</strong>{" "}
                  {result.slogans.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
