import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCollection } from "../schema/create-collection.schema";
import { QUERY_KEYS } from "../../../constants/query-keys.constant";

const createCollection = async (body: CreateCollection) => {
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("name", body.name);

    const res = await fetch("/api/collection", {
        method: "POST",
        body: formData,
    });
    return await res.json();
};

export const useCreateCollection = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCollection,
        mutationKey: QUERY_KEYS.COLLECTION.CREATE,
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
