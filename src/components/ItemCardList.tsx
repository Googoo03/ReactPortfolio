import type { ReactNode } from "react";
import ItemCard from "./ItemCard";

interface Props {
  cards: [title: string, img: string, description: ReactNode][];
}

const ItemCardList = ({ cards }: Props) => {
  return (
    <>
      <div className="d-flex gap-3 flex-wrap">
        {cards.map(([title, img, description]) => (
          <ItemCard title={title} img={img}>
            {description}
          </ItemCard>
        ))}
      </div>
    </>
  );
};

export default ItemCardList;
