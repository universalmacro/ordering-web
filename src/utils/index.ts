import { FoodAttributesOption, FoodAttribute, FoodSpec } from "@universalmacro/merchant-ts-sdk";
import { CartOrder, Spec } from "../views/order";

//检查object的每个属性是否为空。只要有一个属性为空就返回true
export function isEmptyObject(object: Record<string, string> | undefined | null): boolean {
  if (object === null || object === undefined) {
    return true;
  }

  // 检查对象本身是否为空
  if (Object.keys(object).length === 0) {
    return true;
  }

  let flag = false;

  // 检查对象的属性值是否为空
  for (const key in object) {
    if (object[key] == "" || object[key] === undefined) {
      flag = true;
      return flag;
    }
  }
  return flag;
}
export function getAttributePricing(attribute: FoodAttribute, label: string) {
  return attribute.options
    .filter((option) => option.label === label)
    .reduce((total, current) => total + (current.extra ?? 0), 0);
}

export function getAttribute(attributes: FoodAttributesOption[], label: string) {
  return attributes.filter((attribute) => attribute.label === label)[0];
}

export function getLabel(pairs: Spec[], label: string) {
  return pairs.filter((pair) => pair.attribute === label);
}

export function PairToMap(pairs: Spec[] | undefined) {
  const m = new Map<string, string>();
  pairs?.forEach((pair) => m.set(pair.attribute, pair.optioned));
  return m;
}

export function getPricing(order: FoodSpec) {
  const m = PairToMap(order.spec);

  const extra = order.food?.attributes?.reduce(
    (total: any, attribute: any) => total + getAttributePricing(attribute, m.get(attribute.label)!),
    0
  );
  return order.food?.price + extra;
}

export function MapToPair(m: Map<string, string>) {
  const pairs: Spec[] = [];
  m.forEach((v, k) => {
    pairs.push({ attribute: k, optioned: v });
  });
  return pairs;
}

export function getAmount(orders: FoodSpec[], id: string) {
  return orders.filter((order) => order.food.id === id).length;
}

export function MapEqual(m: Map<string, string>, m2: Map<string, string>) {
  if (m.size !== m2.size) {
    return false;
  }
  let equal = true;
  m.forEach((v, k) => {
    if (m2.get(k) !== v) {
      equal = false;
    }
  });
  return equal;
}

export function OptionEqual(m: Spec[] | undefined, m2: Spec[] | undefined) {
  return MapEqual(PairToMap(m), PairToMap(m2));
}

export function getCart(orders: FoodSpec[], cartOrders: CartOrder[] = []): CartOrder[] {
  if (orders.length === 0) return cartOrders;
  const [order] = orders;
  const amount = orders.filter(
    (o) => o.food.id === order.food.id && OptionEqual(o.spec, order.spec)
  ).length;
  const tail = orders.filter(
    (o) => o.food.id !== order.food.id || !OptionEqual(o.spec, order.spec)
  );
  const newCartOrders = [
    {
      amount: amount,
      order: order,
    },
    ...cartOrders,
  ];
  return getCart(tail, newCartOrders);
}
