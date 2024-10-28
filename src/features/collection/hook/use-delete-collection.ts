"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/query-keys.constant";

const deleteCollection = async (id: string) => {
    console.log("BLOH");
    const res = await fetch(`/api/collection/${id}`, {
        method: "DELETE",
    });
    return await res.json();
};

export const useDeleteCollection = (id?: string, onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteCollection(id!),
        mutationKey: QUERY_KEYS.COLLECTION.DELETE(id!),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.COLLECTION.ALL,
            });
            if (onSuccess) {
                onSuccess();
            }
        },
    });
};
