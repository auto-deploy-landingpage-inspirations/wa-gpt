export const SUPPORTED_LANGUAGES = ["en", "es", "ar"];
export const START_MESSAGE = {
    en: "Hey, what can you do?",
    es: "Hola, ¿qué puedes hacer?",
    ar: "مرحبًا، ما الذي يمكنك فعله؟",
}
export const START_MESSAGE_REPLY = "I'm your WhatsApp AI Assistant! I'm here to assist you with any questions you have and help with generating images and stickers. Simply use the /image and /sticker commands followed by a description, and I'll take care of the rest! Feel free to ask me anything using text or voice notes 🤖✨";
export const SUBSCRIBED_MESSAGE = "Thank you for subscribing! ✨ I'm here to help you navigate through questions and create images and stickers for you. To kick things off, just type /image or /sticker followed by a description, and I'll work my magic. Let's get started! 🚀🤖";
export const UPGRADED_SUBSCRIPTION_MESSAGE = "Congratulations on upgrading your subscription! 🎉 Get ready to enjoy even more image and sticker generation features. I'm here to enhance your experience and assist you in creating captivating visuals. Feel free to explore new possibilities by typing /image or /sticker followed by a description. Let's elevate your creativity to new heights! 🚀✨";
export const BOT_PHONE_NUMBER = "+201064134160";
export const MAX_NUMBER_OF_MESSAGES = 30;
export const SUMMARIZE_SYSTEM_MESSAGE = { content: "Summarize the conversation so far.", role: "system"}
export const WHATSAPP_MAX_TEXT_LENGTH = 4096;
export const DALLE_MAX_TEXT_LENGTH = 4000;
export const STICKER_WAIT_MESSAGE = "Hold tight! your awesome sticker is being generated ⏳";
export const IMAGE_WAIT_MESSAGE = "Hold tight! I'm generating your image ⏳🖼️";
export const FREE_STARTER_QUOTA = 5;
export const TEXT_TOKEN_COST = 1/150;
export const TEXT_TOKEN_COST_FREE = 1/50;
export const AUDIO_TOKEN_COST_PER_MINUTE = 0.15;
export const IMAGE_TOKEN_COST = 1;
export const STICKER_TOKEN_COST = 1;
export const RATE_LIMIT_ERROR_MESSAGE = "rate_limit_exceeded";
export const RATE_LIMIT_MESSAGE = "I'm sorry, I'm currently experiencing a high volume of requests. Please try again later. 🙏";
export const UNLIMITED_PLAN_RATE_LIMIT = "You've been generating a lot of stickers and images lately. Please try again in a few hours. 🕒🙏";
export const GUMROAD_PAYMENT_URL = "https://levw.gumroad.com/l/whatsapp";
export const GUMROAD_UPDATE_SUBSCRIPTION_URL = "https://app.gumroad.com/subscriptions";
export const TIERS = {
    "Basic Plan": 40,
    "Standard Plan (Best Deal)": 120,
    "Pro Plan": 400,
}
export const PRO_PLAN_QUOTA = 400;
export const GUMROAD_RESOURCE_TYPES = {
    SALE: "sale",
    SUBSCRIPTION_RESTARTED: "subscription_restarted",
    SUBSCRIPTION_UPDATED: "subscription_updated",
    SUBSCRIPTION_ENDED: "subscription_ended",
    CANCELLATION: "cancellation",
    REFUND: "refund",
    DISPUTE: "dispute",
    DISPUTE_WON: "dispute_won",
};
export const UNSUBSCRIBE_RESOURCE_TYPES = [GUMROAD_RESOURCE_TYPES.SUBSCRIPTION_ENDED, GUMROAD_RESOURCE_TYPES.CANCELLATION, GUMROAD_RESOURCE_TYPES.REFUND, GUMROAD_RESOURCE_TYPES.DISPUTE, GUMROAD_RESOURCE_TYPES.DISPUTE_WON];
export const SPANISH_LANGS = ["spanish", "hawaiian"];
export const ARABIC_LANGS = ["arabic", "farsi", "pashto"];