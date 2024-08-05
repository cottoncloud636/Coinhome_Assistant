import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

/*When creating a new instance of OpenAI, the library expects an object with a property named apiKey to provide the 
actual API key. This property name is a convention defined by the OpenAI client library to correctly configure the 
client. 
*/
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);


/*Function createCompletion: This function creates a completion using the OpenAI API. It takes in an
 array of messages and optionally a model (with a default model provided). The function handles errors
 and returns the first choice from the API response. .
*/
export async function createCompletion(messages, model = 'gpt-4o-mini-2024-07-18') {
  try {
    const completion = await openai.chat.completions.create(
      {
        messages,
        model,
      }
    );
    return completion.choices[0];
  } catch (error) {
    console.error('Error in OpenAI API call', error);
    throw error;
  }
};

