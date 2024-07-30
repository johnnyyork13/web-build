import styled from "styled-components";
import { useState, useEffect } from "react";   
import {v4 as uuidv4} from "uuid";
import SendIcon from '@mui/icons-material/Send';

export default function ChatWindow(props: {url: string, setGeneratedContent: Function, setIsLoading: Function, setImage: Function}) {

    const [message, setMessage] = useState({
        message: "",
        image: "",
    });
    const [messages, setMessages] = useState([
        {role: "system", 
            content: `You build complete HTML, CSS, and JavaScript web pages. 
                        You will only output HTML, CSS, and JavaScript in a format that can be rendered by a browser. 
                        Each response must be a complete HTML document. 
                        The first generated document must fit the description provided by the initial prompt.
                        Subsequent documents must be generated based on the user's input.
                        The given output must start with <!DOCTYPE html>.
                        If the user asks for an image or image placeholder, it must be an img tag.
                        `}
    ]);
    const [updateMessages, setUpdateMessages] = useState(false);

    useEffect(() => {
        if (updateMessages) {
            async function sendMessage() {
                props.setIsLoading(true);
                const url = props.url + "/ai";
                await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        messages: messages,
                        image: message.image,
                        regenerate: message.message.length > 0 ? true : false,
                    })
                }).then((res) => res.json())
                .then((res) => {
                    setMessages(res.messages);
                    if (res.image.length > 0 ) props.setImage(res.image);
                    props.setGeneratedContent(res.messages[res.messages.length - 1].content);
                    console.log(res.messages[res.messages.length - 1].content);
                    setUpdateMessages(false);
                    setMessage({message: "", image: ""});
                    props.setIsLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setUpdateMessages(false);
                })
            }
            sendMessage();
        }
    }, [updateMessages])

    function handleSendMessage() {
        if (message.message.length > 0) {
            const newMessage = {
                role: "user",
                content: message.message
            }
            setMessages([...messages, newMessage]);
        }
        setUpdateMessages(true);
    }


    return (
        <ChatWindowContainer>
            <InputContainer onSubmit={(e) => e.preventDefault()}>
                <Input name="message" onChange={(e) => setMessage((prev) => ({...prev, message: e.target.value}))} value={message.message} type="text" placeholder="Type a message..." />
                <ImageInput name="image" onChange={(e) => setMessage((prev) => ({...prev, image: e.target.value}))} value={message.image} type="text" placeholder="Image keywords" />
                <SendButton onClick={handleSendMessage}><SendIcon /></SendButton>
            </InputContainer>
        </ChatWindowContainer>
    )
}

const ChatWindowContainer = styled.div`
    position: sticky;
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100vw;
`

const InputContainer = styled.form`
    height: 60px;
    display: flex;
    align-items: center;
`

const Input = styled.input`
    height: 100%;
    width: 70%;
    border-radius: 20px;
    margin: 10px;
    font-size: 1.5rem;
    padding-left: 10px;
`

const ImageInput = styled(Input)`
    width: 20%;
`

const SendButton = styled.button`
    height: 100%;
    width: 10%;
    svg {
        color: #22d3ee;
        width: 100%;
        height: 100%;
    }
    background-color: #cffafe !important;
    border: 1px solid #0e7490;
    border-radius: 10px;
    &:hover {
        background-color: #a5f3fc;
        cursor: pointer;
    }
`

