"use client";

import { Button, Space, Table, TableProps } from "antd";
import { useCollection } from "../hook/use-collection";
import { PlusCircle } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { Collection } from "../schema/collection.schema";
import CollectionModalActionRecoil from "../store/collection-action";

export const CollectionTable = () => {
    const { data, isLoading } = useCollection();
    const setModalAction = useSetRecoilState(CollectionModalActionRecoil);
    const columns: TableProps<Collection>["columns"] = [
        {
            title: "No",
            key: "no",
            render: (_, __, index) => <>{index + 1}</>,
            align: "center",
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "File Name",
            key: "cmetadata.name",
            dataIndex: "cmetadata.name",
            render: (_, record) => <>{record.cmetadata.name}</>,
        },
        {
            title: "File Type",
            key: "cmetadata.type",
            dataIndex: "cmetadata.type",
            render: (_, record) => <>{record.cmetadata.type}</>,
        },
    ];

    return (
        <main className="p-4">
            <Space className="flex flex-row-reverse w-full mb-2">
                <Button
                    type="primary"
                    icon={<PlusCircle />}
                    iconPosition="end"
                    onClick={() => setModalAction({ isOpen: true })}
                >
                    Add
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={data?.data ?? []}
                loading={isLoading}
                rowKey={(record) => record.uuid}
            />
        </main>
    );
};
