import React from 'react';
import styled from 'styled-components';
import useModalStore from '../store/modalStore';
import useCartStore from '../store/cartStore';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  background-color: ${(props) => (props.primary ? '#5d5bf0' : '#ccc')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  padding: 10px 17px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => (props.primary ? '#7a77f2' : '#ddd')};
  }
`;

const Modal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalText>담아두신 모든 음반을 삭제하시겠습니까?</ModalText>
        <ButtonContainer>
          <ModalButton
            primary
            onClick={() => {
              clearCart(); // 장바구니 초기화
              closeModal(); // Modal 닫기
            }}
          >
            네
          </ModalButton>
          <ModalButton onClick={closeModal}>아니요</ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;