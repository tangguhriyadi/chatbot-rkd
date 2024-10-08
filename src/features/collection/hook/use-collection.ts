import { useQuery } from "@tanstack/react-query";
import { Collection } from "../schema/collection.schema";
import { BaseResponse } from "../../../interfaces/response,interface";

const getCollections = async () => {
    const res = await fetch("/api/collection");
    return await res.json();
};

export const useCollection = () => {
    return useQuery<BaseResponse<Collection[]>>({
        queryKey: ["collections"],
        queryFn: () => getCollections(),
    });
};
