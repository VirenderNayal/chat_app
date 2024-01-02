import React, { useEffect, useState } from 'react'
import { useChat } from '../providers/Chat';
import ScrollableFeed from 'react-scrollable-feed'
import axios from 'axios';

function Texting({ isSmall }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();

    const { user, setUser, selectedChat, setSelectedChat } = useChat();

    const fetchMessages = async () => {
        if (!selectedChat) {
            console.log("retuned on !selectedChat");
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

            setMessages(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                };

                setNewMessage("");
                const { data } = await axios.post("/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                console.log(data);

                setMessages([...messages, data]);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [messages])

    useEffect(() => {
        const currUser = JSON.parse(localStorage.getItem('userInfo'));

        const setChat = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${currUser.token}`,
                    },
                };

                const { data } = await axios.post("/api/chat", { userId: currUser._id }, config);
                console.log(data);
                setUser(currUser)
                setSelectedChat(data);
            } catch (error) {
                console.log(error);
            }
        }
        setChat();
    }, [])

    return (
        <div className='d-flex flex-column border w-100 h-100 p-2 rounded text-white'>
            <div className='d-flex flex-column mw-75'>
                <ScrollableFeed>
                    {messages && messages.map((m, i) =>
                        <div key={m._id} className='d-flex p-2 my-1 rounded bg-primary' style={{ width: "fit-content" }}>
                            <span>{m.content}</span>
                        </div>
                    )}
                </ScrollableFeed>
            </div>
            {!isSmall && <div onKeyDown={handleSendMessage} className="form-group m-2" style={{ position: "fixed", bottom: "0", left: "0", width: "950px" }}>
                <input onChange={(e) => setNewMessage(e.target.value)} type="text" className="form-control" id="chatbox" value={newMessage} placeholder='Write message...' />
            </div>}
        </div>
    )
}

export default Texting