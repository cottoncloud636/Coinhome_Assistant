import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let assistantId = 'asst_QDUH2Y2cVDyUPXMshM2uDwRM'; // Assume the assistant is already created

// export async function createAssistant() {
//   try {
//     const assistant = await openai.beta.assistants.create({
//       name: "Coinhome_Assistant",
//       instructions: `
//         Role Description: You are a virtual assistant for CoinHome, a global digital asset trading platform. Your primary responsibilities include providing accurate and helpful information about CoinHome's services, including:
//         Cryptocurrency Trading: Details on how to trade, supported cryptocurrencies, transaction fees, and trading tips.
//         Account Management: Guidance on creating, managing, and securing user accounts, including KYC (Know Your Customer) procedures.
//         Security Measures: Information on CoinHome's security protocols, tips for users to secure their accounts, and handling security issues.
//         Regulatory Compliance: Updates on relevant regulations and how CoinHome complies with global standards.
//         Communication Languages: Assist users in both English and Chinese.
//         Tone: Ensure all interactions are professional, clear, and user-friendly.
//         Privacy and Security: Prioritize user privacy and security in every response.
//         Information Retrieval: Primary Source: Use the information provided in the uploaded files to answer user questions.
//         Secondary Source: If the required information is not found in the uploaded files, use OpenAI to search the internet.
//       `,
//       model: "gpt-3.5-turbo-0125",
//       tools: [{ type: "file_search", vector_store_id: "vs_8pBUXwFrR4StzzmvhnyczaNj" }], // Use the correct vector store ID
//     });

//     assistantId = assistant.id; // Store the assistant ID for use in other functions
//     console.log('Assistant created with ID:', assistantId);
//     return assistant;
//   } catch (error) {
//     console.error('Error creating assistant:', error);
//     throw error;
//   }
// }

export async function createThread() {
  try {
    const thread = await openai.beta.threads.create();
    return thread;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
}

export async function addMessageToThread(threadId, content) {
  try {
    const message = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content,
    });
    return message;
  } catch (error) {
    console.error('Error adding message to thread:', error);
    throw error;
  }
}

/*
1) res: res obj comes from Express.js and is part of the request-response lifecycle in an Express route handler.
*/
export async function runAssistant(threadId, res) { 
  return new Promise((resolve, reject) => {
    try {
      let accumulatedText = '';
      const run = openai.beta.threads.runs.stream(threadId, {
        assistant_id: assistantId,
      })
        .on('textCreated', (text) => {
          process.stdout.write('\nassistant > '); //write to console, for debug and monitoring purpose
          accumulatedText += text;
        })
        .on('textDelta', (textDelta) => {
          res.write(textDelta.value); 
          process.stdout.write(textDelta.value);
          accumulatedText += textDelta.value;
        })
        .on('end', () => {
          resolve(accumulatedText);
          res.end();//++++++++++++++++++++++++
        })
        .on('error', (error) => {
          console.error('Error during assistant run:', error);
          reject(error);
        });
    } catch (error) {
      console.error('Error running assistant:', error);
      reject(error);
    }
  });
}


