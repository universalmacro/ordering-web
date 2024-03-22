import React from "react";
import "./index.css";
import TableTag from "./TableTag";
import { Table } from "@dparty/restaurant-ts-sdk";

interface IProps {
  options: Table[] | null;
  selectedOption: Table | null;
  onSelectOption: (option: Table) => void;
}

const SelectTableNum: React.FC<IProps> = ({ options, selectedOption, onSelectOption }) => {
  const checkSelected = (option: Table) => {
    return selectedOption?.label === option?.label;
  };
  return (
    <div className="select-tables-modal">
      <div className="select-tables-modal__container">
        {options?.map((option: Table) => (
          <TableTag
            key={option.id}
            label={option.label}
            value={option.id}
            onClick={() => onSelectOption(option)}
            selected={checkSelected(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectTableNum;
