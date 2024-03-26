/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGetBusketProductsQuery } from "../../redux/api/busketProducts";
import { useNavigate } from "react-router-dom";
import scss from "./BusketProduct.module.scss";

const BusketProducts: React.FC = () => {
  const { data } = useGetBusketProductsQuery();
  const navigate = useNavigate();
  const perevod = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className={scss.musoraZero}>
        <p>Женская</p>
        <button onClick={perevod}>to home</button>
      </div>
      {data?.map((el: any) => {
        const { productName } = el.product;

        return (
          <div className={scss.header}>
            <div className={scss.farth}>
              <div className={scss.musoraFifth}>
                <p className={scss.musoraFifthFirst}>
                  Трикотажное платье в полоску
                </p>
              </div>
              <div className={scss.contImages}>
                <img src="src/assets/Vector (1).svg" alt="" />
                <img src="src/assets/Vector (2).svg" alt="" />
                <img src="src/assets/Vector (3).svg" alt="" />
              </div>
            </div>
            <div className={scss.musora}>
              <img className={scss.busketImage} src={el.product.photoUrl} />
              <div className={scss.musoraFirst}>
                <p className={scss.busketColors}>Цвета в наличии</p>
              </div>
              <div className={scss.musorasecond}>
                <div className={scss.musoraThird}>
                  <p className={scss.busketRazmersFirst}>Размеры в наличии</p>
                  <p className={scss.busketRazmersSecond}>
                    XXS, XS, S, M, L, XL, XXL
                  </p>
                </div>
                <p>{productName}</p>
                <div className={scss.musoraForth}>
                  <p>{el.product.quantity}</p>
                  <p>KGS {el.product.price}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusketProducts;
