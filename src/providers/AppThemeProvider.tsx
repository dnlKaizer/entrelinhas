import { ConfigProvider, theme } from 'antd'
import ptBR from 'antd/locale/pt_BR'
import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export function AppThemeProvider({ children }: Props) {
    return (
        <ConfigProvider
            locale={ptBR}
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#5b9bd5',
                    colorSuccess: '#70ad47',
                    colorWarning: '#ffc000',
                    colorError: '#ff6b6b',
                    colorInfo: '#5b9bd5',
                    colorTextBase: '#4a5568',
                    colorBgBase: '#f7fafc',
                    colorPrimaryBg: '#e6f0fa',
                    colorPrimaryBgHover: '#d0e1f5',
                    colorPrimaryBorder: '#a3c9ea',
                    colorPrimaryBorderHover: '#7fb3e0',
                    colorPrimaryHover: '#4a8bc5',
                    colorPrimaryActive: '#3a7cb8',
                    colorPrimaryText: '#5b9bd5',
                    colorPrimaryTextHover: '#4a8bc5',
                    colorPrimaryTextActive: '#3a7cb8',
                    colorSuccessBg: '#eef7e9',
                    colorSuccessBgHover: '#ddefd6',
                    colorSuccessBorder: '#b8dfab',
                    colorSuccessBorderHover: '#9ecf90',
                    colorSuccessHover: '#5fa73f',
                    colorSuccessActive: '#4f9a2f',
                    colorSuccessText: '#70ad47',
                    colorSuccessTextHover: '#5fa73f',
                    colorSuccessTextActive: '#4f9a2f',
                    colorWarningBg: '#fff8e6',
                    colorWarningBgHover: '#fff0cc',
                    colorWarningBorder: '#ffe699',
                    colorWarningBorderHover: '#ffd966',
                    colorWarningHover: '#e6ac00',
                    colorWarningActive: '#cc9900',
                    colorWarningText: '#ffc000',
                    colorWarningTextHover: '#e6ac00',
                    colorWarningTextActive: '#cc9900',
                    colorErrorBg: '#ffeaea',
                    colorErrorBgHover: '#ffd6d6',
                    colorErrorBorder: '#ffb3b3',
                    colorErrorBorderHover: '#ff9999',
                    colorErrorHover: '#ff5252',
                    colorErrorActive: '#ff3838',
                    colorErrorText: '#ff6b6b',
                    colorErrorTextHover: '#ff5252',
                    colorErrorTextActive: '#ff3838',
                    colorInfoBg: '#e6f0fa',
                    colorInfoBgHover: '#d0e1f5',
                    colorInfoBorder: '#a3c9ea',
                    colorInfoBorderHover: '#7fb3e0',
                    colorInfoHover: '#4a8bc5',
                    colorInfoActive: '#3a7cb8',
                    colorInfoText: '#5b9bd5',
                    colorInfoTextHover: '#4a8bc5',
                    colorInfoTextActive: '#3a7cb8',
                    colorText: 'rgba(74, 85, 104, 0.9)',
                    colorTextSecondary: 'rgba(74, 85, 104, 0.7)',
                    colorTextTertiary: 'rgba(74, 85, 104, 0.5)',
                    colorTextQuaternary: 'rgba(74, 85, 104, 0.3)',
                    colorTextDisabled: 'rgba(74, 85, 104, 0.3)',
                    colorBgContainer: '#ffffff',
                    colorBgElevated: '#ffffff',
                    colorBgLayout: '#f7fafc',
                    colorBgSpotlight: 'rgba(74, 85, 104, 0.85)',
                    colorBgMask: 'rgba(74, 85, 104, 0.45)',
                    colorBorder: '#e2e8f0',
                    colorBorderSecondary: '#edf2f7',
                    borderRadius: 12,
                    borderRadiusXS: 4,
                    borderRadiusSM: 8,
                    borderRadiusLG: 16,
                    padding: 20,
                    paddingSM: 16,
                    paddingLG: 28,
                    margin: 20,
                    marginSM: 16,
                    marginLG: 28,
                    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
                    boxShadowSecondary: '0 8px 24px 0 rgba(0, 0, 0, 0.08)',
                },
                components: {
                    Button: {
                        controlHeight: 40,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}