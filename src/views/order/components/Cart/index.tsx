import "./index.css";
import cancelPngUrl from "../../../../assets/png/cancel.png";
import { ReactNode } from "react";

interface IProps {
  title: string;
  visiable: boolean;
  onCancel: () => void;
  children: ReactNode;
}

const Cart: React.FC<IProps> = ({ title, visiable, onCancel, children }) => {
  return (
    <div className="cart" style={{ zIndex: visiable ? 99999 : -9999 }}>
      <div
        className="cart__mask"
        style={{
          transition: visiable ? "opacity .2s" : "opacity 0s",
          opacity: visiable ? 0.4 : 0,
        }}
        onClick={onCancel}
      ></div>
      <div
        className="cart__content"
        style={{
          height: visiable ? "70%" : "0%",
          transition: visiable ? "height .2s" : "height 0s",
        }}
      >
        <div className="cart__content-header">
          <div className="cart__content-header-title">{title}</div>
          <div className="cart__content-header-cancel" onClick={onCancel}>
            <img className="cancel-img" src={cancelPngUrl} alt="关闭" />
          </div>
        </div>
        <div className="cart__content-body">{children}</div>
      </div>
    </div>
  );
};

export default Cart;
