import axios from "axios";
import _ from "lodash";
import { getTTL } from "./helpers/utils.mjs";
import { START_MESSAGE, START_MESSAGE_REPLY } from "./helpers/constants.mjs";
import { promptGPT } from "./openaiAPI.mjs";

export const receiveMessage = async (body) => {
  // Extracting the needed info from WhatsApp's callback
  const isStatusUpdateNotification = _.get(body, 'entry[0].changes[0].value.statuses[0].id', null);
  if (isStatusUpdateNotification) return;
  const userName = _.get(body, 'entry[0].changes[0].value.contacts[0].profile.name', 'UserName');
  const userNumber = _.get(body, 'entry[0].changes[0].value.messages[0].from', null);
  const messageType = _.get(body, 'entry[0].changes[0].value.messages[0].type', null);
  const text = _.get(body, 'entry[0].changes[0].value.messages[0].text.body', null);
  
  // If user sends a message that is not text, we don't want to process it
  if (messageType !== 'text' || !text || !userNumber) return;
  // TODO check and save user in dynamoDB
  // TODO save message in dynamoDB
  const ttl = getTTL()
  const message = {
    content: text,
    role: 'user',
    ttl
  }
  if (text === START_MESSAGE) {
    const messageBody = { body: START_MESSAGE_REPLY }
    await sendMessage(userNumber, 'text', messageBody);
    return;
  }
  // TODO fetch conversation and make api call to gpt-3
  // const gptMessages = [{role: 'user', content: text}] // temp until we have conversation in dynamoDB
  // const gptResponse = await promptGPT(gptMessages);
  const messageBody = { body: "hey" }
  await sendMessage(userNumber, 'text', messageBody);
}

const sendMessage =  async (to, type, messageBody) => {
  const headers = {
    Authorization: `Bearer ${process.env.WHATSAPP_SYSTEM_ACCESS_TOKEN}`,
  };
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const messageParams = {
    messaging_product: 'whatsapp',
    to,
    recipient_type: 'individual',
    type,
    [type]: messageBody,
  };
  const messageSentResponse = await axios.post(
    `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
    messageParams,
    { headers },
  );
  const metaMessageId = _.get(messageSentResponse, 'data.messages[0].id', null);
  if (!metaMessageId) return;
  const ttl = getTTL();
  const message = {
    content: type === 'text' ? messageBody.body : "Multi-media message",
    role: 'assistant',
    ttl
  };
  // TODO save message in dynamoDB
}

export const verifyWhatsAppWebhook = (query) => {
  if (query['hub.mode'] === 'subscribe' && query['hub.verify_token'] === "verify_token")
    return query['hub.challenge'];    
}