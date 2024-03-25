import React, { useEffect, useState } from "react";
import "./index.css";
import Tag from "../../../../components/Tag";
import { FoodAttribute, FoodAttributesOption } from "@universalmacro/merchant-ts-sdk";

interface IProps {
  attributes: FoodAttribute[];
  selectedOptions: Map<string, string>;
  onSelectOption: (attribute: FoodAttribute, option: FoodAttributesOption) => void;
}

const SpecificationsOptions: React.FC<IProps> = ({
  attributes,
  selectedOptions,
  onSelectOption,
}) => {
  const checkSelected = (label: string, option: FoodAttributesOption) => {
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
                extra={option.extra ?? 0}
                key={index}
                label={option.label}
                value={option.extra ?? 0}
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
