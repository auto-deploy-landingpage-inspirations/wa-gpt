import { BOT_PHONE_NUMBER, SUPPORTED_LANGUAGES, START_MESSAGE } from "./constants.mjs";
export const getAction = (event) => event.rawPath?.split("/")[1];
import querystring from 'querystring';
import qs from 'qs';

export const getBody = (event) => {
  let body;
  if (event.headers?.['content-type'] === 'application/x-www-form-urlencoded') {
    const decodedBody = Buffer.from(event.body, 'base64').toString('utf-8');
    body = parseFormUrlEncoded(decodedBody);
  } else {
    body = event.body ? JSON.parse(event.body) : {};
  } 
  return body;
}

// const parseFormUrlEncoded = (bodyString) => {
//   const params = {};
//   const keyValuePairs = bodyString.split('&');
//   keyValuePairs.forEach(keyValuePair => {
//     const [key, value] = keyValuePair.split('=');
//     const decodedKey = decodeURIComponent(key);
//     const decodedValue = decodeURIComponent(value);
//     if (decodedKey.includes('[')) {
//       const keys = decodedKey.split(/\[|\]/).filter(Boolean);
//       let obj = params;
//       for (let i = 0; i < keys.length; i++) {
//         const currentKey = keys[i];
//         if (i === keys.length - 1) {
//           if (Array.isArray(obj[currentKey])) {
//             obj[currentKey].push(decodedValue);
//           } else if (obj[currentKey]) {
//             obj[currentKey] = [obj[currentKey], decodedValue];
//           } else {
//             obj[currentKey] = decodedValue;
//           }
//         } else {
//           obj[currentKey] = obj[currentKey] || {};
//           obj = obj[currentKey];
//         }
//       }
//     } else {
//       params[decodedKey] = decodedValue;
//     }
//   });
//   return params;
// }

const parseFormUrlEncoded = (bodyString) => {
  const params = {};

  const decode = (str) => {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  };

  bodyString.split('&').forEach(keyValuePair => {
    const [key, value] = keyValuePair.split('=');
    const decodedKey = decode(key);
    const decodedValue = decode(value);

    const keys = decodedKey.split('.');
    let currentParams = params;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLastKey = i === keys.length - 1;

      if (isLastKey) {
        if (currentParams[key] !== undefined) {
          if (!Array.isArray(currentParams[key])) {
            currentParams[key] = [currentParams[key]];
          }
          currentParams[key].push(decodedValue);
        } else {
          currentParams[key] = decodedValue;
        }
      } else {
        if (!currentParams[key]) {
          currentParams[key] = {};
        }
        currentParams = currentParams[key];
      }
    }
  });

  return params;
}




export const handleBadRequest = () => ({
  statusCode: 400,
  body: "Bad Request",
});

export const handleNotificationReceived = () => ({
  statusCode: 200,
  body: "Notification Received",
});

export const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "*",
  "X-Requested-With": "*",
  "Access-Control-Allow-Origin": "*",
};

export const limitTextLength = (text, maxLength) => {
  if (text.length > maxLength) {
      return text.substring(0, maxLength);
  } else {
      return text;
  }
}

export const checkIfMediaRequest = (text, type) => text.startsWith(`/${type}`);

export const extractMediaRequestPrompt = (text, type) => {
  const prompt = text.slice(`/${type}`.length).trim();
  return prompt;
}

// export const generateStickerPrompt = text => {
//   return 'A visual sticker with white stroke of: #FFFFFF.' + text;
// }

export const getWhatsAppBotUrl = (lang) => {
  lang = lang.toLowerCase();
  if(!SUPPORTED_LANGUAGES.includes(lang)) lang = "en";
 const WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=${BOT_PHONE_NUMBER}&text=${START_MESSAGE[lang].replace(/ /g, "%20").replace("?","%3F")}`;
  return WHATSAPP_URL
}

export const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

export const getNextRenewalUnixTime = (prevRenewalUnixTime) => prevRenewalUnixTime + 30 * 24 * 60 * 60;