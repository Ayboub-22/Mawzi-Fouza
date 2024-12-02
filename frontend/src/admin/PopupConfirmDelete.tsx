import React from "react";
import "./PopupConfirmDelete.css";

interface PopupConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const PopupConfirmDelete: React.FC<PopupConfirmDeleteProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Are you sure you want to delete this?</h2>
        <div className="popup-actions">
          <button className="btn-confirm" onClick={onConfirm}>Yes</button>
          <button className="btn-cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmDelete;
