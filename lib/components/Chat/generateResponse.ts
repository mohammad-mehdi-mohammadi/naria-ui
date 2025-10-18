export type GenerationResult = {
  memes: string[];
  emojis: string[];
  slogans: string[];
};

export async function generateResponse(
  input: string
): Promise<GenerationResult> {
  // Mock implementation
  const happyEmojis = ["😃", "😂", "🎉"];
  const allEmojis = [
    "😃",
    "😂",
    "🔥",
    "🥳",
    "😢",
    "😎",
    "🤔",
    "🙌",
    "💡",
    "🎉",
  ];
  let emojis = allEmojis;
  if (input.toLowerCase().includes("happy")) {
    emojis = allEmojis.filter((e) => happyEmojis.includes(e));
  }
  return {
    memes: [`Meme for: ${input}`, `Another meme about ${input}`],
    emojis,
    slogans: [`Stay ${input}!`, `Keep calm and be ${input}`],
  };
}
