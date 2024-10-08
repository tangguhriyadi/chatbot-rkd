import { atom } from "recoil";

type CollectionModal = {
    isOpen: boolean;
};

const CollectionModalActionRecoil = atom<CollectionModal>({
    key: "CollectionModalActionRecoil",
    default: {
        isOpen: false,
    },
});

export default CollectionModalActionRecoil;
