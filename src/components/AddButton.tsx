import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TStatus } from "../types/book.type";

interface AddButtonProps {
    category: TStatus;
    tooltip?: string;
    action?: (status: TStatus) => void;
}

export function AddButton({ category, action, tooltip }: AddButtonProps) {

    const button = (
        <Button
            icon={<PlusOutlined />}
            onClick={() => action?.(category)}
            shape="circle"
            type="primary"
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #afafaf',
                boxShadow: "0 0px 10px rgba(0,0,0,0.15)",
                color: '#0c0c0c'
            }}
        />
    );

    return tooltip ? (
        <Tooltip title={tooltip} placement="left">
            {button}
        </Tooltip>
    ) : (
        button
    );
}
