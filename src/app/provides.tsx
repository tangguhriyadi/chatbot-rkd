"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";
import queryClientConfig from "../configs/tanstack.config";
import theme from "../configs/theme.config";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClientConfig}>
            <AntdRegistry>
                <RecoilRoot>
                    <ConfigProvider theme={theme}>
                        <App>{children}</App>
                    </ConfigProvider>
                </RecoilRoot>
            </AntdRegistry>
        </QueryClientProvider>
    );
}
