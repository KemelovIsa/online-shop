import LoginForm from "../../components/forms/loginForm/LoginForm"
import Footer from "../../components/layout/footer/Footer"
import Header from "../../components/layout/header/Header"

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    return <div>
        <Header/>
        <LoginForm />
        <Footer/>
    </div>
}

export default Login