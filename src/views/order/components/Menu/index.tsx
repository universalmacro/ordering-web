import "./index.css";
import { Order } from "../../index";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import FoodCard from "../FoodCard";
import { Item } from "@dparty/restaurant-ts-sdk";
import { getAmount } from "../../../../utils";

interface IProps {
  pushCart: (item: Item, selectedOptions: Map<string, string>) => void;
  items: Item[];
  orders: Order[];
  removeCart: (item: Item, selectedOptions: Map<string, string>) => void;
  onSelect: (item: Item) => void;
}

const Menu: React.FC<IProps> = ({ removeCart, onSelect, items, orders, pushCart }) => {
  const getItemsByTag = (tag: string) => {
    return items.filter((item) => item.tags.filter((t) => t === tag).length !== 0);
  };
  const tags = useMemo(() => {
    const tags = new Set<string>();
    items
      .reduce((tags, item) => {
        return [...tags, ...item.tags];
      }, new Array<string>())
      .forEach((tag) => tags.add(tag));
    return Array.from(tags);
  }, [items]);

  const [activeTag, setActiveTag] = useState<string>(tags[0]);
  const [isScrollingTo, setScrollingTo] = useState<string | null>(null);

  const tagRefs: { [key: string]: React.RefObject<HTMLDivElement> } = tags.reduce(
    (refs: { [key: string]: React.RefObject<HTMLDivElement> }, tag) => {
      refs[tag] = React.createRef<HTMLDivElement>();
      return refs;
    },
    {}
  );
  //点击左侧菜单时
  const clickLeftTag = (clickTag: string) => {
    setScrollingTo(clickTag);
    tagRefs[clickTag].current!.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      setActiveTag(clickTag);
      setScrollingTo(null); // 点击事件的滚动结束，重置isScrollingTo
    }, 500); // 延时应稍大于滚动动画的时间
  };

  //右侧菜单滚动
  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    if (isScrollingTo) return;
    if (!event.nativeEvent.isTrusted) return;

    const _activeTag = tags.find((tag) => {
      const rect = tagRefs[tag].current!.getBoundingClientRect();
      return rect.top < 280 && rect.bottom > 280;
    });

    setActiveTag(_activeTag ? _activeTag : activeTag);
  };

  useEffect(() => {
    if (tags.length && !activeTag) {
      setActiveTag(tags[0]);
    }
  }, [tags]);

  return (
    <div className="menu page-container">
      <div className="left-menu">
        {tags.map((tag, i) => (
          <div
            key={i}
            className={`left-menu-item ${tag === activeTag ? "active" : "normal"}`}
            onClick={() => {
              clickLeftTag(tag);
            }}
          >
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <div className="right-menu" onScroll={handleScroll}>
        {tags.map((tag, index) => (
          <div key={index} ref={tagRefs[tag]}>
            <div className="right-menu-type text-ellipsis">{tag}</div>
            {getItemsByTag(tag).map((item, index) => (
              <FoodCard
                removeCart={removeCart}
                pushCart={pushCart}
                amount={getAmount(orders, item.id)}
                onSelect={onSelect}
                key={index}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
