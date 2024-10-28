"use client";

import React, { useState } from "react";
import { Menu, Layout, Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import { MenuConfig } from "../../configs/menu.config";
import { MenuOutlined } from "@ant-design/icons";

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="h-screen">
            <Layout.Sider
                trigger={null}
                className="h-screen"
                collapsible
                collapsed={collapsed}
                color="primary"
            >
                <div
                    className={cn(
                        "flex m-4",
                        collapsed ? "justify-center" : "justify-end"
                    )}
                >
                    <Button
                        icon={<MenuOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        type="primary"
                    ></Button>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    items={MenuConfig}
                    onClick={({ key }) => {
                        router.push(key.toString());
                    }}
                />
            </Layout.Sider>
        </div>
    );
};

export default Sidebar;
