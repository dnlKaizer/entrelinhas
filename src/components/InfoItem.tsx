import { Space, Tooltip, Typography } from "antd";

const { Text } = Typography;

interface InfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  tooltip?: string;
}

export function InfoItem({ icon, children, tooltip }: InfoItemProps) {
  const content = (
    <Space size={3} align="center">
      {icon}
      <Text
        style={{
          fontSize: 12.5,
        }}
      >
        {children}
      </Text>
    </Space>
  );

  return tooltip ? (
    <Tooltip title={tooltip}>
      {content}
    </Tooltip>
  ) : (
    content
  );
}