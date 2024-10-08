import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable(
    "user",
    {
        id: varchar("id", { length: 256 }).primaryKey(),
        name: varchar("name", { length: 256 }),
        email: varchar("email", { length: 256 }),
    },
    (table) => {
        return {
            emailIndex: uniqueIndex("user_email_index").on(table.email),
        };
    }
);

export const schema = {
    user: userTable,
};
