/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApi";
import Modal from "../../components/modal/Modal";
// import AddProductForm from "../../components/forms/addProductForm/AddProductFrom";
import { useToggleFavoriteProductMutation } from "../../redux/api/favoriteProductsApi";
import scss from "./Home.module.scss";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import { useToggleBusketProductMutation } from "../../redux/api/busketProducts";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const { data: products = [], refetch } = useGetProductsQuery();
  const [toogleFavoriteProduct] = useToggleFavoriteProductMutation();
  const [toggleBusketProduct] = useToggleBusketProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isEdit, setIsEdit] = useState<string | null>(null);

  // Function to close the modal
  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEdit(null);
  };

  // Function to save edited products
  const handleSaveProducts = async (id: number) => {
    const newData = {
      price: price,
      quantity: quantity,
      productName: productName,
      photoUrl: photoUrl,
    };
    await updateProduct({ id, newData });
    setIsEdit(null);
  };

  // Function to handle editing a product
  const handleEditProduct = async (item: any) => {
    setPhotoUrl(item.photoUrl);
    setProductName(item.productName);
    setQuantity(item.quantity);
    setPrice(item.price);
    setIsEdit(item._id);
  };

  // Effect to check authentication status and refetch products
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth !== "true") {
      navigate("/");
    }
    refetch();
  }, [navigate, refetch]);

  return (
    <>
      <Header />
      <button onClick={() => setIsOpen(true)}>Добавить новый товар</button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {/* <AddProductForm
          price={price}
          setPrice={setPrice}
          closeModal={handleCloseModal}
          quantity={quantity}
          setQuantity={setQuantity}
          productName={productName}
          setProductName={setProductName}
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
        /> */}
        <button onClick={handleEditProduct}>Сохранить изменения</button>
      </Modal>
      <div className={scss.con}>
        {products.map((product: any) => (
          <div className={scss.Cart} key={product._id}>
            {isEdit !== product._id ? (
              <div>
                <img
                  className={scss.images}
                  src={product.photoUrl}
                  alt={product.name}
                />
                <div className={scss.CardOne}>
                  <div>
                    <p>NEW NOW</p>
                    <p>Gucci</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>KGS: {product.price}</p>
                  </div>
                  <label className={scss.container}>
                    <input
                      onClick={() => {
                        toogleFavoriteProduct(product._id);
                      }}
                      type="checkbox"
                    />
                    <svg
                      id="Layer_1"
                      version="1.0"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                    </svg>
                  </label>
                </div>
                <button
                  className={scss.korzina}
                  onClick={() => {
                    toggleBusketProduct(product._id);
                  }}
                >
                  Добавить в корзину
                </button>
                <img
                  onClick={() => handleEditProduct(product)}
                  src="src/assets/background.svg"
                  alt=""
                />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <button onClick={() => setIsEdit(null)}>Cancel</button>
                <button
                  onClick={() => {
                    handleSaveProducts(product._id);
                  }}
                >
                  Save
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
