import React from "react";
import "./index.css";
import clockPngUrl from "../../assets/png/clock.png";
import { useLocation } from "react-router-dom";
import FoodCard from "../order/components/FoodCard";

const Complete: React.FC = () => {
  const location = useLocation();
  const pickupNumber = "A103";
  const cartOrders = location.state.cartOrders;

  return (
    <div className="complete page-container">
      {/* <div className="complete__pickup-wrapper">
        <p className="pickup-label">取餐码</p>
        <p className="pickup-number">{pickupNumber}</p>
      </div> */}
      <img className="complete__img" src={clockPngUrl} alt="请等待取餐" />
      <div className="complete__text">下单成功～ </div>
      <div className="complete__textNum">取餐號：{location.state.bill.pickUpCode}</div>
      <div className="complete__detail">
        {cartOrders.map((cartOrder: any, index: any) => {
          return (
            <FoodCard
              editable={false}
              options={cartOrder.order.options}
              amount={cartOrder.amount}
              removeCart={
                () => {}
                // removeCart(cartOrder.order.item, PairToMap(cartOrder.order.options))
              }
              pushCart={() => {}}
              onSelect={(item) => {}}
              item={cartOrder.order.item}
              actionType="cart"
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Complete;
