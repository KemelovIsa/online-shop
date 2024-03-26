import { useNavigate } from "react-router-dom"; 
import scss from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const favoritePerevod = () => {
    navigate("/favorites-products");
  };

  const busketPerevod = () => {
    navigate("/busket-products");
  };

  return (
    <div className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div>
            <img className={scss.logo} src="src/assets/logo.svg" alt="" />
          </div>
          <div className={scss.section}>
            <div className={scss.aside}>
              <img
                onClick={logout}
                src="src/assets/Button - Войти.svg"
                alt=""
              />
            </div>
            <div className={scss.aside}>
              <img
                onClick={favoritePerevod}
                src="src/assets/Button - Избранное.svg"
                alt=""
              />
            </div>
            <div className={scss.aside}>
              <img
                onClick={busketPerevod}
                src="src/assets/Group 21.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
