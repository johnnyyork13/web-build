import { useState } from 'react'
import './App.css'
import styled from 'styled-components';
import ChatWindow from './components/ChatWindow'
import Website from './components/Website';
import LoadingModal from './components/LoadingModal';

function App() {
  
  const url = "http://localhost:3000";

  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [showHTML, setShowHTML] = useState(false);

  return (
    <AppContainer>
      <Button onClick={() => setShowHTML(!showHTML)}>Toggle HTML</Button>
      {!showHTML && 
      <>
        <Website generatedContent={generatedContent} image={image}/>
        <ChatWindow url={url} setGeneratedContent={setGeneratedContent} setIsLoading={setIsLoading} setImage={setImage}/>
        {isLoading && <LoadingModal />}
      </>}
      {showHTML && <p>{generatedContent}</p>}
    </AppContainer>
  )
}


const AppContainer = styled.div`
  min-height: 99vh;
  display: grid;
  grid-template-columns:1fr;
  grid-template-rows: 1fr 60px;
  position: relative;
`

const Button = styled.button`
  position: absolute !important;
  top: 0;
  right: 0;
  background-color: grey;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 10px;
`

export default App
