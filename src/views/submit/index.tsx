import SubmitButton from "../../components/SubmitButton";
import "./index.css";
import { FoodProps } from "../order";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const navigate = useNavigate();

  const sessionStoragePrice = sessionStorage.getItem("price");
  const sessionStorageSelectedFoods = sessionStorage.getItem("selectedFoods");
  const sessionStorageCartCount = sessionStorage.getItem("cartCount");

  const price = sessionStoragePrice ? JSON.parse(sessionStoragePrice) : 0;
  const selectedFoods: FoodProps[] = sessionStorageSelectedFoods
    ? JSON.parse(sessionStorageSelectedFoods)
    : [];
  const cartCount = sessionStorageCartCount ? JSON.parse(sessionStorageCartCount) : 0;

  const onSubmit = () => {
    navigate("/complete");
  };
  return (
    <div className="submit page-container">
      <div className="submit__top">
        <div className="submit__top-food-card">
          <div className="food-card-title">餐品列表</div>
          <div className="food-card-divider"></div>
          <div className="food-list">
            {selectedFoods.map((food, index) => {
              return (
                <div key={index} className="food-container">
                  <div className="food-img">
                    <img src="/default.png" alt="食物" />
                  </div>
                  <div className="food-info">
                    <p className="food-info-name text-ellipsis">{food.name}</p>
                    <p className="food-info-specifications text-ellipsis">
                      {food.specifications ? Object.values(food.specifications).join(",") : ""}
                    </p>
                    <p className="food-info-count">x{food.count}</p>
                  </div>
                  <div className="food-price">
                    $<span>{food.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="submit__top-remark">
          <textarea placeholder="请输入您的口味喜好～" />
        </div>
      </div>
      <div className="submit__btn-container">
        <SubmitButton count={cartCount} onSubmit={onSubmit} btnText="提交订单" price={price} />
      </div>
    </div>
  );
};

export default Submit;
