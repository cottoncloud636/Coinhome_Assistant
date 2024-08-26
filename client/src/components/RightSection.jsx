import React, { useState, useEffect, useRef  } from 'react';
import useChatStream from '@magicul/react-chat-stream';
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
    const [streamedContent, setStreamedContent] = useState('');
    const chatAreaRef = useRef(null);

    const { isStreaming } = useChatStream();

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [chat?.messages]);
        
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: message }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            let tempContent = ''; // Store current streamed content

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                let chunk = decoder.decode(value, { stream: true });

                tempContent += chunk;
                let pattern = /【.*?】/g;
                tempContent = tempContent.replace(pattern, '').trim();

                // Update the chat.messages with the streamed content
                const updatedMessages = [...newMessages, { role: 'assistant', content: tempContent }];
                setAllChats(prevChats =>
                    prevChats.map(c =>
                        c.id === chat.id ? { ...c, messages: updatedMessages } : c
                    )
                );
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className='rightbar' ref={chatAreaRef}>  
            <div className='chatArea'>
                {chat.messages.map((msg, index) => (
                    <div key={index} 
                        className = {`conversation ${msg.role} ${msg.role === 'assistant' ? 'bot' : ''}`}>
                        <img src={msg.role === 'user' ? userPen : coinhomeIcon} className='chatIcon'/>
                        <ReactMarkdown>
                            {msg.content}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>

            <div className='sendArea'>
                <div className='inputArea'>
                    <textarea className = 'auto-resize-textarea'
                        // type='text'
                        value={message}
                        onChange = {e => setMessage(e.target.value)}
                        onKeyDown={e => {if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                        placeholder = 'Message Coinhome Assistant'
                        // row='1'
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