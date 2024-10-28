"use client";

import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteCollection } from "../hook/use-delete-collection";
import { useSetRecoilState } from "recoil";
import CollectionModalActionRecoil from "../store/collection-action";
import { useCallback } from "react";

export const CollectionTableAction = ({ id }: { id: string }) => {
    const setModalAction = useSetRecoilState(CollectionModalActionRecoil);

    const handleSuccessMutation = useCallback(() => {
        setModalAction({
            isOpen: false,
        });
    }, [setModalAction]);

    const deleteMutation = useDeleteCollection(id, handleSuccessMutation);

    return (
        <Popconfirm
            title="Delete Item"
            description="Are you sure want to delete this item ?"
            onConfirm={() => deleteMutation.mutateAsync()}
            placement="topLeft"
        >
            <Button
                icon={<DeleteOutlined />}
                type="primary"
                loading={deleteMutation.isPending}
                danger
            ></Button>
        </Popconfirm>
    );
};
