import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  img: string;
  scale: number;
  onHover?: () => void;
  onUnhover?: () => void;
  hovered?: boolean;
}

const ItemCard = ({
  title,
  img,
  scale,
  children,
  onHover,
  onUnhover,
  hovered,
}: Props) => {
  return (
    <>
      <div
        className="card"
        style={{
          width: scale + "rem",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transformOrigin: "center center", // keep scaling from the center
        }}
        onMouseEnter={() => {
          onHover && onHover();
        }}
        onMouseLeave={() => {
          onUnhover && onUnhover();
        }}
      >
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{children}</p>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
