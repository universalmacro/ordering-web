import React from "react";
import "./index.css";

interface IProps {
  value: string | number;
  label: string;
  selected: boolean;
  onClick: (value: string | number) => void;
}

const TableTag: React.FC<IProps> = ({ label, value, selected, onClick }) => {
  return (
    <div
      className={`tag${selected ? " tag__selected" : " tag__normal"}`}
      onClick={() => onClick(value)}
    >
      {label}
    </div>
  );
};

export default TableTag;
