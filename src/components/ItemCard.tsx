import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  img: string;
}

const ItemCard = ({ title, img, children }: Props) => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
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
