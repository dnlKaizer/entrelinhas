import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

function CleanLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ backgroundColor: '#fafafa', padding: 25 }}>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default CleanLayout