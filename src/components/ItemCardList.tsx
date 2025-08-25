import { useState, type ReactNode } from "react";
import ItemCard from "./ItemCard";

interface Props {
  heading?: string;
  headingColor?: string;
  cards: [title: string, img: string, description: ReactNode][];
}

const ItemCardList = ({ cards, heading, headingColor }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      {heading && (
        <h1 style={{ color: headingColor ? headingColor : "#ffffff" }}>
          {heading}
        </h1>
      )}
      <div className="d-flex gap-3 flex-wrap">
        {cards.map(([title, img, description], index) => (
          <ItemCard
            key={index}
            title={title}
            img={img}
            onHover={() => setSelectedIndex(index)}
            onUnhover={() => setSelectedIndex(-1)}
            hovered={selectedIndex === index}
            scale={18 + 2}
          >
            {description}
          </ItemCard>
        ))}
      </div>
    </>
  );
};

export default ItemCardList;
