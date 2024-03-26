import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../customInput/CustomInput";
import Button, { ButtonProps } from "../../customButton/CustomButton";
import { useCreateUserMutation } from "../../../redux/api/usersApi";
import scss from "./RegistrationFrom.module.scss";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const registrationButtonProps: ButtonProps = {
    type: "submit",
    variant: "primary",
    color: "black",
    width: "300px",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некорректный email")
        .required("Обязательное поле"),
      userName: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      const { email, userName, password } = values;
      const result = await createUser({ email, userName, password });
      if (result) {
        navigate("/");
      }
    },
  });

  return (
    <div>
      <h3 className={scss.register}>Регистрация</h3>
      <form className={scss.forms} onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          label="Email"
          name="email"
          id="email"
          placeholder="Введите адрес почты"
          width="300px"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <Input
          type="text"
          label="Имя "
          name="userName"
          id="userName"
          placeholder="Введите ваше имя"
          width="300px"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.userName && formik.errors.userName && (
          <div style={{ color: "red" }}>{formik.errors.userName}</div>
        )}

        <Input
          type="password"
          label="Пароль"
          name="password"
          placeholder="Введите пароль"
          width="300px"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <Button {...registrationButtonProps}>Зарегистрироваться</Button>
        <div>
          <Link to="/">Уже зарегистрированы? Войти</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
