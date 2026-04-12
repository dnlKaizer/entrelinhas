import { Outlet } from "react-router-dom";
import AppFooter from "../../components/AppFooter";
import { Content } from "antd/es/layout/layout";
import AppHeader from "../../components/AppHeader";
import { Layout } from "antd";

interface DefaultLayoutProps {
    isAdmin: boolean;
}

function DefaultLayout({ isAdmin }: DefaultLayoutProps) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader isAdmin={isAdmin} />
            <Content style={{ backgroundColor: '#f0f5ff', padding: 25, marginBottom: '61px' }}>
                <Outlet />
            </Content>
            <AppFooter />
        </Layout>
    )
}

export default DefaultLayout