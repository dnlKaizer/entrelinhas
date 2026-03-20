import { Header } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title"

function AppHeader() {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Title level={4} style={{ margin: 0 }}>
                EntreLinhas
            </Title>
            
        </Header>
    )
}

export default AppHeader