import RegistrationForm from "../../components/forms/registrationForm/RegistrationForm"
import Footer from "../../components/layout/footer/Footer"
import Header from "../../components/layout/header/Header"

interface RegistrationProps {

}

const Registration: React.FC<RegistrationProps> = () => {
    return <div>
        <Header/>
        <RegistrationForm />
        <Footer/>
    </div>
}

export default Registration