import express from 'express';
import dotenv from 'dotenv';
import {createCompletion} from './openaiService.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/openai', async(req, res)=>{ //asynchronous, meaning it will wait for the response before proceeding.
    try {
      const {prompt} = req.body;//If req.body contains a prompt property, its value will be assigned to the prompt variable. If not, prompt will be undefined
                              //it relieves the burden to write req.body.prompt every time.
      const messages = [
          { role: "system", content: "You are a helpful assistant." }, 
          { role: "user", content: prompt }
      ];
      const completion = await createCompletion(messages);
      res.json(completion);
    } catch (error) {
      res.status(500).json({error: 'Error calling OpenAI API'});
    }
  }
);

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
  }
);