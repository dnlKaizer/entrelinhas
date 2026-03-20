import { Footer } from 'antd/es/layout/layout'
import Text from 'antd/es/typography/Text'


function AppFooter() {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            <Text type="secondary">EntreLinhas</Text>
        </Footer>
    )
}

export default AppFooter