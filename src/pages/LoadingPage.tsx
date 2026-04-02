import { Spin } from "antd";
import AppAuth from "../components/auth/AppAuth";

function LoadingPage() {
    return <AppAuth>
        <Spin />
    </AppAuth>;
}

export default LoadingPage;