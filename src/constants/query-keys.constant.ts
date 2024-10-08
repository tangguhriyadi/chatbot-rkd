export const QUERY_KEYS = {
    COLLECTION: {
        ONE: (id: string) => ["collection", id],
        ALL: ["collections"],
        CREATE: ["create-collection"],
        DELETE: (id: string) => ["delete-collection", id],
        UPDATE: (id: string) => ["update-collection", id],
    },
    USER: {
        ONE: (id: string) => ["user", id],
        ALL: ["users"],
        CREATE: ["create-user"],
        DELETE: (id: string) => ["delete-user", id],
        UPDATE: (id: string) => ["update-user", id],
    },
} as const;
