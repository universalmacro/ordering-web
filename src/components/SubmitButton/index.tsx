import "./index.css";
import cartPngUrl from "../../assets/png/cart.png";
import React from "react";

interface IProps {
  onShow?: () => void;
  onSubmit: () => void;
  btnText: string;
  price: number;
  disable?: boolean;
  showCartImg?: boolean;
  count: number;
}

const SubmitButton: React.FC<IProps> = ({
  onShow,
  onSubmit,
  btnText,
  price,
  disable,
  showCartImg,
  count,
}) => {
  const submit = () => {
    if (disable) return;
    onSubmit();
  };
  return (
    <div className="submit-button">
      <div className="submit-button__left" onClick={onShow}>
        {showCartImg && (
          <div className="submit-button__left-cart">
            {!disable && <span className="cart-count">{count}</span>}
            <div className={`cart-img ${disable ? "disable" : "usable"}`}>
              <img src={cartPngUrl} alt="购物车" />
            </div>
          </div>
        )}
        <div className="submit-button__left-price">
          <span>${price / 100}</span>
        </div>
      </div>
      <div className={`submit-button__text${disable ? " disable" : " usable"}`} onClick={submit}>
        {btnText}
      </div>
    </div>
  );
};

export default SubmitButton;
