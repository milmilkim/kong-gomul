import styled from "styled-components";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    z-index: 100;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: #fff;
    position: absolute;
    padding: 30px;
    border-radius: 10px;

    .top {
      width: 100%;
      text-align: right;
      font-size: 1.5rem;
      top: 0;
      right: 0;
      cursor: pointer;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      border: none;
      background-color: #ddd;
      padding: 10px;
      margin-top: 5px;
    }

    button {
      width: 100%;
      background-color: ${(props) => props.theme.color.primaryColor};
      border: none;
      padding: 10px;
      margin-top: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const Modal = ({ children, isOpen, setIsOpen, width, height, closeButton }) => {
  const ref = useRef();

  const closeModal = (e) => {
    if (ref && !ref.current.contains(e.target)) {
      //바깥 영역을 클릭했을 때만
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <ModalContainer width={width} height={height} onClick={closeModal}>
          <div className="modal" ref={ref}>
            {closeButton && (
              <div className="top">
                <FaTimes
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            )}

            {children}
          </div>
        </ModalContainer>
      )}
    </>
  );
};

Modal.defaultProps = {
  width: 300,
  height: 500,
  closeButton: true,
};

export default Modal;
