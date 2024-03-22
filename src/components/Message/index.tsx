import React, { useState, useEffect } from "react";
import "./index.css";

interface MessageProps {
  message: string;
  onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return visible ? (
    <div className="message">
      <p>{message}</p>
      {/* <button onClick={handleClose}>关闭</button> */}
    </div>
  ) : null;
};

export default Message;
