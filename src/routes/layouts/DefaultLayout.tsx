import { Outlet } from "react-router-dom";
import AppFooter from "../../components/AppFooter";
import { Content } from "antd/es/layout/layout";
import AppHeader from "../../components/AppHeader";
import { Layout } from "antd";

function DefaultLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ backgroundColor: '#fafafa', padding: 25, marginBottom: '70px' }}>
                <Outlet />
            </Content>
            <AppFooter />
        </Layout>
    )
}

export default DefaultLayout