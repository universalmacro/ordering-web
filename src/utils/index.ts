import { Attribute } from "@dparty/restaurant-ts-sdk";
import { CartOrder, Order, Pair } from "../views/order";

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
export function getAttributePricing(attribute: Attribute, label: string) {
  return attribute.options
    .filter((option) => option.label === label)
    .reduce((total, current) => total + current.extra, 0);
}

export function getAttribute(attributes: Attribute[], label: string) {
  return attributes.filter((attribute) => attribute.label === label)[0];
}

export function getLabel(pairs: Pair[], label: string) {
  return pairs.filter((pair) => pair.left === label);
}

export function PairToMap(pairs: Pair[]) {
  const m = new Map<string, string>();
  pairs.forEach((pair) => m.set(pair.left, pair.right));
  return m;
}

export function getPricing(order: Order) {
  const m = PairToMap(order.options);
  const extra = order.item.attributes.reduce(
    (total, attribute) => total + getAttributePricing(attribute, m.get(attribute.label)!),
    0
  );
  return order.item.pricing + extra;
}

export function MapToPair(m: Map<string, string>) {
  const pairs: Pair[] = [];
  m.forEach((v, k) => {
    pairs.push({ left: k, right: v });
  });
  return pairs;
}

export function getAmount(orders: Order[], id: string) {
  return orders.filter((order) => order.item.id === id).length;
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

export function OptionEqual(m: Pair[], m2: Pair[]) {
  return MapEqual(PairToMap(m), PairToMap(m2));
}

export function getCart(orders: Order[], cartOrders: CartOrder[] = []): CartOrder[] {
  if (orders.length === 0) return cartOrders;
  const [order] = orders;
  const amount = orders.filter(
    (o) => o.item.id === order.item.id && OptionEqual(o.options, order.options)
  ).length;
  const tail = orders.filter(
    (o) => o.item.id !== order.item.id || !OptionEqual(o.options, order.options)
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
