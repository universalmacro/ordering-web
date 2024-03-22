import React, { useEffect, useState } from "react";
import "./index.css";
import Tag from "../../../../components/Tag";
import { Attribute, Option } from "@dparty/restaurant-ts-sdk";

interface IProps {
  attributes: Attribute[];
  selectedOptions: Map<string, string>;
  onSelectOption: (attribute: Attribute, option: Option) => void;
}

const SpecificationsOptions: React.FC<IProps> = ({
  attributes,
  selectedOptions,
  onSelectOption,
}) => {
  const checkSelected = (label: string, option: Option) => {
    return selectedOptions.get(label) === option.label;
  };
  return (
    <div className="specifications-options">
      {attributes.map((attribute) => (
        <div className="specifications-options__item" key={attribute.label}>
          <div className="specifications-options__title">{attribute.label}</div>
          <div className="specifications-options__container">
            {attribute.options.map((option, index) => (
              <Tag
                extra={option.extra}
                key={index}
                label={option.label}
                value={option.extra}
                onClick={() => onSelectOption(attribute, option)}
                selected={checkSelected(attribute.label, option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecificationsOptions;
