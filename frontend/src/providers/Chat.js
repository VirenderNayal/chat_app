import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = React.createContext();

export const useChat = () => React.useContext(ChatContext);

const ChatProvider = (props) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            navigate("/");
        }
    }, [navigate])

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat }}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;