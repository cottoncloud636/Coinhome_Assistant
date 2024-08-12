import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import userPen from '../assets/user-pen.svg';
import send from '../assets/send.svg';
import coinhomeIcon from '../assets/coinhomeIcon.svg';
import './styles.css';


const RightSection = ({allChats, setAllChats}) => {
    const {chatId} = useParams();
    const chat = allChats.find(c=>c.id === parseInt(chatId));
    const [message, setMessage] = useState('');
    if (!chat){
        return <div className='rightbar'>Select a chat</div>
    }
    
    // const [allMessages, setAllMessages] = useState([]); /*store all messages into an array*/
    const sendMessage = async ()=>{ /*async: since send message to GPT and receive answer from GPT takes time */
        if (!message.trim()) return; //if after trim all unnessary white space, and message is still false, that means message is empty
        //add user's message to the conversation
        const newMessages = [
            ...chat.messages,
            {
                role: 'user',  //this role, content format came from openai API libaray definition, see index.js
                content: message
            }
        ];
        // setAllMessages(newMessages);
        // setMessage(''); //clear input field
        const updatedChats = allChats.map(
            c => c.id === chat.id ? {...c, messages: newMessages} : c
        );
        setAllChats(updatedChats);
        setMessage('');

        /*integrate with backend in here. User send a request to this endpoint, and specify the request method and content */
        try {
            const response = await fetch('http://localhost:3000/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' //a standard HTTP header used to indicate the media type of the resource
                },
                body: JSON.stringify({prompt: message}),//"message": The value assigned to the prompt property. Same value as "message" in state
                                                     //"prompt": name of the property being sent in the request body"
                }
            );
            const data = await response.json();
            console.log('Received data from backend:', data);
            let responseContent = data.message;

            let pattern = /【.*?】/g;
            responseContent = responseContent.replace(pattern, '').trim();
            
            if (Array.isArray(responseContent)) {
                responseContent = responseContent.join(' ');
            }
            
            // If the responseContent is an object with keys 'value' and 'annotations', use 'value'
            // if (typeof responseContent === 'object' && responseContent.value) {
            //     responseContent = responseContent.value;
            // }
            if (typeof responseContent === 'object') {
                responseContent = JSON.stringify(responseContent);
            }
            
            // Ensure responseContent is a string
            if (typeof responseContent !== 'string') {
                responseContent = JSON.stringify(responseContent);
            }

            if (responseContent.startsWith("[object Object]")) {
                responseContent = responseContent.replace("[object Object]", "").trim();
              }
            
            

            if (responseContent) {
                const assistantMessage = {
                    role: 'assistant',
                    content: responseContent
                };
                setAllChats(prevChats => prevChats.map(
                    c => c.id === chat.id ? { ...c, messages: [...newMessages, assistantMessage] } : c
                ));
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    

    return (
        <div className='rightbar'>  
            <div className='chatArea'>
                {chat.messages.map((msg, index) => (
                    <div key={index} 
                        className = {`conversation ${msg.role} ${msg.role === 'assistant' ? 'bot' : ''}`}>
                        <img src={msg.role === 'user' ? userPen : coinhomeIcon} className='chatIcon'/>
                    
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                ))}
            </div>

            <div className='sendArea'>
                <div className='inputArea'>
                    <textArea className = 'auto-resize-textarea'
                        // type='text'
                        value={message}
                        onChange = {e => setMessage(e.target.value)}
                        onKeyDown={e => {if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                        placeholder = 'Message Coinhome Assistant'
                        row='1'
                    />
                    <button onClick={sendMessage} className='send'>
                        <img src={send} alt='sendIcon' className='sendIcon'/>
                    </button>
                </div>
                <p className='footer'>Our chat assistant could make mistake, please check important information.</p>
            </div>
        </div>
  );
}

export default RightSection;