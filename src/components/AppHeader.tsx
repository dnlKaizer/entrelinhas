import { Header } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title"

function AppHeader() {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e2e2e2',
                height: '70px',
                padding: '0 20px'
            }}
        >
            <Title
                level={4}
                style={{ 
                    margin: 0,
                    fontFamily: 'Lobster, cursive',
                    color: '#001010',
                    fontSize: '30px',
                    fontWeight: 'normal',
                }}
                    >
                EntreLinhas
            </Title>

        </Header>
    )
}

export default AppHeader