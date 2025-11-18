export const config = {
  providers: {
    OpenAI: {
      apiKey: process.env.OPENAI_API_KEY || "",
      models: [
        {
          name: "gpt-5",
          label: "GPT-5",
        },
        {
          name: "gpt-5.1",
          label: "GPT-5.1",
        },
      ],
      icon: "public/icons/openai.svg",
    },
    Anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY || "",
      models: [
        {
          name: "claude-sonnet-4-5",
          label: "Claude Sonnet 4.5",
        },
      ],
      icon: "public/icons/claude.svg",
    },
    Google: {
      apiKey: process.env.GOOGLE_API_KEY || "",
      models: [
        {
          name: "gemini-2-5-pro",
          label: "Gemini 2.5 Pro",
        },
      ],
      icon: "public/icons/gemini.svg",
    },
  },
};
