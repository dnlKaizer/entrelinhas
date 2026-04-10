import { Button, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  tooltip?: string;
}

export function BackButton({ tooltip = "Voltar" }: BackButtonProps) {
  const navigate = useNavigate();

  const button = (
    <Button
      shape="circle"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(-1)}
      style={{
        position: "fixed",
        top: 15,
        left: 15,
        zIndex: 10,
        background: "#fff",
        boxShadow: "0 0px 10px rgba(0,0,0,0.15)",
      }}
    />
  );

  return tooltip ? (
    <Tooltip title={tooltip} placement="right">
      {button}
    </Tooltip>
  ) : (
    button
  );
}