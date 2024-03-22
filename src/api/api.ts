import { Configuration, ConfigurationParameters, RestaurantApi, BillApi } from "@dparty/restaurant-ts-sdk";
import axios from "axios";

export const token = localStorage.getItem("token");

// export const basePath = "https://ordering-api-uat.sum-foods.com";
export const basePath = "https://restaurant-uat.sum-foods.com";
// if (window.location.hostname === "ordering-uat.sum-foods.com") {
//   basePath = "https://ordering-api-uat.sum-foods.com";
// }

export const restaurantApi = new RestaurantApi(
  new Configuration({
    basePath: basePath,
  } as ConfigurationParameters)
);

export const billApi = new BillApi(
  new Configuration({
    basePath: basePath,
  } as ConfigurationParameters)
);


const config = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`,
  },
};



export const createBill = async (tableId: string, data: any) => {
  const res = await axios.post(`${basePath}/tables/${tableId}/orders`, data, config);
  return res.data;
};
