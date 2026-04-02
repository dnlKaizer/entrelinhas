import AppAuth from "../components/auth/AppAuth"
import AppLoginForm from "../components/auth/AppLoginForm"

function LoginPage() {
    return <AppAuth>
            <AppLoginForm />
        </AppAuth>
}

export default LoginPage