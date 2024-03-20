import React from "react";
import CloseIcon from "./CloseIcon";
import NailedItIcon from "./NailedItIcon";

type SolvedMessageModalType = {
    onClose: () => void;
    movesCount: number;
}

const SolvedMessageModal: React.FC<SolvedMessageModalType> = ({ onClose, movesCount }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="close-modal" onClick={onClose} >
                    <CloseIcon />
                </div>
                <NailedItIcon />
                <label className="title">Nailed it!</label>
                <span className="message">You completed the<br />puzzle in {movesCount} moves</span>
            </div>
        </div>
    )
}

export default SolvedMessageModal;