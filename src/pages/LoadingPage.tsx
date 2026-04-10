import { Spin } from "antd";
import AppBackground from "../components/AppBackground";

function LoadingPage() {
    return <AppBackground>
        <Spin />
    </AppBackground>;
}

export default LoadingPage;