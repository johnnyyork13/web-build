import styled from "styled-components";

export default function LoadingModal() {

    return (
        <ModalContainer>
            <Modal>
                <Spinner />
            </Modal>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Modal = styled.div`
    width: 200px;
    height: 200px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid black;
    border-radius: 50%;
    border-top: 5px solid blue;
    animation: spin 1s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

