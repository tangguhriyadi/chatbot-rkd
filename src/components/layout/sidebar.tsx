"use client";

import React, { useState } from "react";
import { Menu, Layout, Button } from "antd";
import { MenuIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import { MenuConfig } from "../../configs/menu.config";

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
                        className="bg-primary"
                        color="primary"
                        icon={<MenuIcon color="white" />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 32,
                            height: 32,
                        }}
                    />
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
