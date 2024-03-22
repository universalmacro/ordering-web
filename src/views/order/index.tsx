import "./index.css";
import foodIntroductionUrl from "../../assets/png/food-introduction.png";
import SubmitButton from "../../components/SubmitButton";
import Cart from "./components/Cart";
import { useMemo, useState } from "react";
import Menu from "./components/Menu";
import SelectSpecifications from "./components/SelectSpecifications";
import { useLoaderData, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import { restaurantApi, billApi } from "../../api/api";
import { Item, Restaurant, Table } from "@dparty/restaurant-ts-sdk";
import { MapEqual, MapToPair, PairToMap, getCart, getPricing } from "../../utils";
import FoodCard from "./components/FoodCard";
import PageHeader from "../../components/PageHeder";
import { createBill } from "../../api/api";
import Notification from "../../components/Notification";

export interface Pair {
  left: string;
  right: string;
}
export interface Order {
  item: Item;
  options: Pair[];
}

export interface FoodProps {
  id: number;
  name: string;
  desc: string;
  price: number;
  count: number;
  specifications?: any;
  remark?: string;
}

export interface CartOrder {
  order: Order;
  amount: number;
}

const OrderPage = () => {
  const navigate = useNavigate();
  const { table, items, restaurant } = useLoaderData() as {
    table: Table;
    items: Item[];
    restaurant: Restaurant;
  };
  const [cartVisiable, setCartVisiable] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectingSpecificationsItem, setSelectingSpecificationsItem] = useState<Item>();

  const [showMessage, setShowMessage] = useState(false);
  const cartCount = useMemo(() => {
    return orders.length;
  }, [orders]);
  const total = useMemo(() => {
    return orders.reduce((total, order) => total + getPricing(order), 0);
  }, [orders]);

  const pushCart = (item: Item, selectedOptions: Map<string, string>) => {
    setSelectingSpecificationsItem(undefined);
    setOrders([...orders, { item: item, options: MapToPair(selectedOptions) }]);
  };
  const removeCart = (item: Item, options: Map<string, string>) => {
    let index = -1;
    orders.forEach((order, i) => {
      if (order.item.id === item.id && MapEqual(PairToMap(order.options), options)) {
        index = i;
      }
    });
    setOrders(orders.filter((_, i) => i !== index));
  };
  const [disable, setDisable] = useState(false);
  const cartOrders = useMemo(() => {
    return getCart(orders, []);
  }, [orders]);

  const submit = async () => {
    if (!cartVisiable) {
      setCartVisiable(true);
      return;
    }
    setDisable(true);
    const sp = orders.map((order) => ({
      itemId: order.item.id,
      options: order.options,
    }));

    try {
      const res = await createBill(table.id, { specifications: sp });
      // console.log(res);

      // const res = await billApi.createBill({
      //   id: table.id,
      //   createBillRequest: {
      //     specifications: sp,
      //   },
      // });
      if (res) {
        console.log(res);
        navigate("/complete", { state: { bill: res, cartOrders: cartOrders } });
      }
    } catch (e) {
      console.log(e);
    }
    // const res = billApi
    //   .createBill({
    //     id: table.id,
    //     createBillRequest: {
    //       specifications: sp,
    //     },
    //   })
    //   .then((res: any) => {
    //     console.log(res);
    //     navigate("/complete", { state: { bill: res, cartOrders: cartOrders } });
    //   })
    //   .catch((res: any) => {
    //     console.log(res);
    //     // navigate("/complete");
    //   });

    //   .createBill({
    //     id: table.id,
    //     createBillRequest: {
    //       specifications: sp,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // navigate("/complete");
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //     // navigate("/complete");
    //   });
  };

  return (
    <div className="order page-container">
      <PageHeader name={restaurant.name} table={table.label} />
      <div className="order_top">
        {/* 最上面的的图片 */}
        <div className="order_top-img">
          <img className="img" src={foodIntroductionUrl} alt="菜品介紹" />
        </div>
        <div className="page-notice">
          <Notification
            duration={20}
            message={[
              "過量飲酒危害健康",
              "CONSUMIR BEBIDAS ALCOÓLICAS EM EXCESSO PREJUDICA A SAÚDE",
              "EXCESSIVE DRINKING OF ALCOHOLIC BEVERAGES IS HARMFUL TO HEALTH",
              "禁止向未滿十八歲人士銷售或提供酒精飲料",
              "A VENDA OU DISPONIBILIZAÇÃO DE BEBIDAS ALCOÓLICAS A MENORES DE 18 ANOS É PROIBIDA",
              "THE SALE OR SUPPLY OF ALCOHOLIC BEVERAGES TO ANYONE UNDER THE AGE OF 18 IS PROHIBITED",
            ]}
          />
        </div>
        {/* 中间滚动的menu */}
        <div className="order_top-menu">
          <Menu
            pushCart={pushCart}
            orders={orders}
            removeCart={removeCart}
            onSelect={setSelectingSpecificationsItem}
            items={items}
          />
        </div>
        {/* 购物车 如果购物车是空的不会弹起 */}
        <Cart title="購物車" visiable={cartVisiable} onCancel={() => setCartVisiable(false)}>
          {/* 购物车里面的每个菜品 */}
          {cartOrders.map((cartOrder, index) => {
            return (
              <FoodCard
                options={cartOrder.order.options}
                amount={cartOrder.amount}
                removeCart={() =>
                  removeCart(cartOrder.order.item, PairToMap(cartOrder.order.options))
                }
                pushCart={pushCart}
                onSelect={(item) => {}}
                item={cartOrder.order.item}
                actionType="cart"
                key={index}
              />
            );
          })}
        </Cart>
      </div>
      {/* 最下面的选好了按钮 */}
      <div className="order_bottom">
        <SubmitButton
          disable={cartCount === 0 || disable}
          count={cartCount}
          onShow={() => setCartVisiable(true)}
          onSubmit={submit}
          btnText={cartVisiable ? "確定" : "選好了"}
          price={total}
          showCartImg
        />
      </div>
      {/* 选规格modal */}
      <SelectSpecifications
        pushCart={pushCart}
        item={selectingSpecificationsItem}
        onCancel={() => setSelectingSpecificationsItem(undefined)}
      />
      {showMessage && <Message message="請在購物車中操作" onClose={() => setShowMessage(false)} />}
    </div>
  );
};

export default OrderPage;
