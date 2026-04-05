import { Spin } from "antd";

interface LoaderProps {
  description?: string;
  clean?: boolean;
}

export function Loader({ description, clean }: LoaderProps) {
  return (

    <div
      style={{
        height: clean ? "100vh" : "calc(100vh - 150px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spin size="large" description={description} />
    </div>
  );
}