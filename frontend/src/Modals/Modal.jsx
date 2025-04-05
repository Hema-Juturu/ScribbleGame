// Modal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCirclePlay } from "react-icons/fa6";


// Styled components for the modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background: #ff6347;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #ff4500;
  }
`;


const InputWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row; /* This is the default value for flexbox, but it makes it explicit */
  align-items: center; /* This will align the items vertically in the center if needed */
  gap: 10px; /* Optional: adds space between the label and the input */
`;


const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

const Modal = ({ isOpen, onClose, nav }) => {
  const [players, setPlayers] = useState(2);
  const [rounds, setRounds] = useState(3);
  const [time, setTime] = useState(3);

  // Handle numeric input for players, rounds, and time
  const handlePlayersChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 2) { // Ensure value doesn't go below 2
      setPlayers(Number(value));
    }
  };
  
  const handleRoundsChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 3) { // Ensure value doesn't go below 3
      setRounds(Number(value));
    }
  };
  
  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 3) { // Ensure value doesn't go below 3
      setTime(Number(value));
    }
  };
  

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-4">
          <InputWrapper>
            <Label htmlFor="players">Number of Players</Label>
            <input
              type="number"
              id="players"
              value={players}
              onChange={handlePlayersChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-1"
              placeholder="Enter Number of players"
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="rounds">Number of Rounds</Label>
            <input
              type="number"
              id="rounds"
              value={rounds}
              onChange={handleRoundsChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-1"
              placeholder="Enter Number of rounds"
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="time">Time per Round &nbsp;&nbsp;&nbsp; <br/>(in minutes)</Label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={handleTimeChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-1"
              placeholder="Enter Time for each round"
            />
          </InputWrapper>
        </div>
        <div className='flex flex-row justify-between'>
         <button
                      className="flex justify-center px-2 py-2 text-sm text-slate-200 bg-cyan-600 border  border-cyan-400 rounded-md ring-2 ring-teal-400 hover:ring-4 focus:ring-teal-500"
                    >
                      <div className="h-full a-center">PLAY</div>
                      <div className="h-full a-center pl-1 pt-[2px]">
                        <FaCirclePlay className="text-lg" />
                      </div>
                    </button>
                    <button
                      className="flex justify-center px-2 py-2 text-sm text-slate-200 bg-red-600 border  border-red-400 rounded-md ring-2 ring-orange-400 hover:ring-4 focus:ring-orange-500"
                    onClick={onClose}>
                      <div className="h-full a-center">CLOSE</div>
                      <div className="h-full a-center pl-1 pt-[2px]">
                      </div>
                    </button>
        </div>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
