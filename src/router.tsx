import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "./App";
import { restaurantApi, getSpace, getTables, getFoods } from "./api/api";
import { Food, FoodStatus } from "@universalmacro/merchant-ts-sdk";

export function lazyWithRetry(componentImport: any) {
  return lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem("page-has-been-force-refreshed") || "false"
    );
    try {
      const component = await componentImport();
      window.localStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      const err = error as Error;
      if (err.name === "ChunkLoadError" && !pageHasAlreadyBeenForceRefreshed) {
        window.localStorage.setItem("page-has-been-force-refreshed", "true");
        return window.location.reload();
      }
      throw error;
    }
  });
}

const Home = lazyWithRetry(() => import("./views/home"));
const Order = lazyWithRetry(() => import("./views/order"));
const Submit = lazyWithRetry(() => import("./views/submit"));
const Complete = lazyWithRetry(() => import("./views/complete"));
const Tables = lazyWithRetry(() => import("./views/tables"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "tables",
        element: (
          <Suspense>
            <Tables />
          </Suspense>
        ),
      },
      {
        path: "ordering",
        element: (
          <Suspense>
            <Order />
          </Suspense>
        ),
        loader: async ({ params }) => {
          const search = window.location.search;
          const query = new URLSearchParams(search);
          const tableId = query.get("tableId") || (params.tableId as string);
          const restaurantId = query.get("restaurantId") || (params.restaurantId as string);
          const label = query.get("label");

          try {
            // 獲取空間信息
            const space = await getSpace(restaurantId);
            // 獲取 tables
            const tables = await getTables(restaurantId);
            // 獲取 items
            const foods = await getFoods(restaurantId);

            return new Promise((resolve, reject) => {
              // 如果獲取不到id，直接跳轉，防止後面 Promise 報錯
              if (!tableId && !restaurantId) {
                window.location.href = "/tables";
              }

              const table =
                label === null
                  ? tables.find((table: any) => table.id === tableId)
                  : tables.find((table: any) => table.label === label);
              const items = foods;
              if (table) {
                resolve({
                  table: table,
                  items: items.filter((i: Food) => i.status === FoodStatus.Available),
                  restaurant: space,
                });
              } else {
                window.location.href = `/tables?restaurantId=${restaurantId}`;
              }
            });
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        path: "submit",
        element: (
          <Suspense>
            <Submit />
          </Suspense>
        ),
      },
      {
        path: "complete",
        element: (
          <Suspense>
            <Complete />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
