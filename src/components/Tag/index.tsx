import React from "react";
import "./index.css";

export enum FoodCardActionType {
  SPECIFICATIONS = "specifications",
  NORMAL = "normal",
}

interface IProps {
  value: string | number;
  label: string;
  extra: number;
  selected: boolean;
  onClick: (value: string | number) => void;
}

const Tag: React.FC<IProps> = ({ label, value, selected, onClick, extra }) => {
  return (
    <div
      className={`tag${selected ? " tag__selected" : " tag__normal"}`}
      onClick={() => onClick(value)}
    >
      {label}
      {extra ? "+" + extra / 100 + "$" : ""}
    </div>
  );
};

export default Tag;
