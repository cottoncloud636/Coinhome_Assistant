import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; //logs HTTP req and res, for debug purpose
import authRouter from './routes/auth.routes.js';

import mongoose from 'mongoose';


import {createThread, addMessageToThread, runAssistant} from './openaiService.js';//????????????

/*
 * step 1: configure express, dotevn 
 * step 2: connect mongoDB using mongoose 
 * step 3: create user model
 * step 4: use 
 */

const app = express();

dotenv.config();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, { //this connect return a promise
    useNewUrlParser: true, //these are to take care of deprecations warnings
    useUnifiedTopology: true
}).then(() => {
    // console.log(connection.connections);
    console.log('DB connection successful');
}).catch(
  (err)=>{console.log(err)}
);



// const port = process.env.PORT || 3000; //????????????????

app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this origin
}));

app.use(express.json());//by default, developers are not allowed to send json directly to server, hence, use this
              //middleware provided by Express that parses incoming JSON data in the body of an HTTP request. 


app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);
// app.all('*', (req, res, next)=>{
//   //????????????? place holder
// })

/*
  For testing Restful API purpose
*/
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });


//??????????????????????????
app.post('/api/openai', async(req, res)=>{ //asynchronous, meaning it will wait for the response before proceeding.
    try {
      const { prompt } = req.body;
      
      // Create a new thread for the conversation
      const thread = await createThread();
      // Add the user's prompt as a message to the thread
      await addMessageToThread(thread.id, prompt);
       // Step 4: Run the assistant to get a response
      await runAssistant(thread.id, res);

    // Return the response to the client
    // res.json({ message: responseText }); -- No need to call `res.json()` here since `runAssistant` is handling the response streaming.
  } catch (error) {
    console.error('Error in /api/openai route:', error);
    if (!res.headersSent) {
      if (error.code === 'insufficient_quota') {
        res.status(429).json({ error: 'You have exceeded your quota. Please try again later or upgrade your plan.' });
      } else {
        res.status(500).json({ error: 'An error occurred while processing your request.' });
      }
  }
}
});

app.use((err, req, res, next) => { //accept error as an arg
  const statusCode = err.statusCode || 500; //get the status code caused from the err and save to statusCode
          //or if there is no such status code caused from err, then simply use 500
  const message = err.message || '500: internal server error';
  return res.status(statusCode).json(
    {
      success: false,
      statusCode, //same as code -- statusCode: statusCode, but since key-value are same name, in ES6, 
      //I can omit this "duplicate" name
      message,
    }
  );                
});

const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});