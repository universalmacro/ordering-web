import "./index.css";
import cancelPngUrl from "../../../../assets/png/cancel.png";
import { useEffect, useMemo, useState } from "react";
import SpecificationsOptions from "../SpecificationsOptions";
import { getAttributePricing } from "../../../../utils";
import { Attribute, Item, Option } from "@dparty/restaurant-ts-sdk";

interface IProps {
  item?: Item;
  onCancel: () => void;
  pushCart: (item: Item, selectedOptions: Map<string, string>) => void;
}

const SelectSpecifications: React.FC<IProps> = ({ item, onCancel, pushCart }) => {
  const attributes = useMemo(() => {
    if (!item) return [] as Attribute[];
    return item.attributes.map((att) => {
      return {
        label: att.label,
        options: att.options,
      } as Attribute;
    });
  }, [item]);
  const [selectedOptions, setSelectedOptions] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  useEffect(() => {
    setSelectedOptions(new Map<string, string>());
  }, [item]);
  const extraTotal = useMemo(() => {
    if (!item) return 0;
    return item.attributes.reduce((total, attribute) => {
      const label = selectedOptions.get(attribute.label);
      if (!label) return total;
      return total + getAttributePricing(attribute, label);
    }, 0);
  }, [item, selectedOptions]);
  const total = useMemo(() => {
    if (!item) return 0;
    return item.pricing + extraTotal;
  }, [item, extraTotal]);
  const onSelectOption = (a: Attribute, o: Option) => {
    const selected = selectedOptions.get(a.label);
    if (selected === o.label) {
      selectedOptions.delete(a.label);
      setSelectedOptions(new Map(selectedOptions));
      return;
    }
    setSelectedOptions((map) => new Map(map.set(a.label, o.label)));
  };
  if (!item) return null;
  return (
    <div className="select-specifications">
      <div className="select-specifications__mask" onClick={onCancel}></div>
      <div className="select-specifications__content">
        <div className="select-specifications__content-header">
          <div className="select-specifications__content-header-title">{item?.name ?? ""}</div>
          <div className="select-specifications__content-header-cancel" onClick={onCancel}>
            <img className="cancel-img" src={cancelPngUrl} alt="關閉" />
          </div>
        </div>
        <div className="select-specification__description"></div>
        <div className="select-specifications__content-body">
          <div className="specifications-container">
            <SpecificationsOptions
              onSelectOption={onSelectOption}
              attributes={attributes}
              selectedOptions={selectedOptions}
            />
            <div className="specifications-container-bottom">
              <div className="specifications-price">
                價錢: <span>${total / 100}</span>
              </div>
              <button
                className={"specifications-submit-btn specifications-submit-btn-usable"}
                onClick={() => pushCart(item, selectedOptions)}
              >
                + 加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSpecifications;
