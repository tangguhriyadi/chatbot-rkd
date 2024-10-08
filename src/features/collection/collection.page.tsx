"use client";

import { CollectionTable } from "./components/collection-table";
import { CreateCollectionModal } from "./components/create-collection-modal";

const CollectionPage = () => {
    return (
        <>
            <CollectionTable />
            <CreateCollectionModal />
        </>
    );
};

export default CollectionPage;
