import { Tooltip, Typography } from "antd";

const { Text } = Typography;

interface InfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  tooltip?: string;
}

export function InfoItem({ icon, children, tooltip }: InfoItemProps) {
  const content = (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fafafa",
        padding: "5px 10px",
        borderRadius: 5
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon}
      </div>

      <Text
        ellipsis
        style={{
          fontSize: 11.5,
          textAlign: "right",
          flex: 1,
        }}
      >
        {children}
      </Text>
    </div>
  );

  return tooltip ? (
    <Tooltip title={tooltip} placement="bottom">
      {content}
    </Tooltip>
  ) : (
    content
  );
}