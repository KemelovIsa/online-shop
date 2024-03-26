/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetFavoriteProductsQuery } from "../../redux/api/favoriteProductsApi";
import scss from "./FavoriteProducts.module.scss";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";

const FavotiresProducts: React.FC = () => {
  const navigate = useNavigate();

  const perevod = () => {
    navigate("/home");
  };

  const { data: products = [] } = useGetFavoriteProductsQuery();
  return (
    <>
      <Header />
      <div>
        <h3 className={scss.favoritesh}>Избранные</h3>
        <p className={scss.favoritesTag}>
          Здесь собраны понравившиеся Вам модели.
        </p>
        <button onClick={perevod}>to home</button>
        <div className={scss.favoriteOnehundred}>
          {products.map((el: any) => {
            const { productName } = el.product;
            return (
              <div className={scss.favoritesCard}>
                <img className={scss.favoritesImg} src={el.product.photoUrl} />
                <p>{productName}</p>
                <p> {el.product.quantity}</p>
                <p>KGS {el.product.price}</p>
                <button className={scss.favoritesButton}>
                  Добавить в корзину
                </button>
              </div>
            );
          })}{" "}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavotiresProducts;
