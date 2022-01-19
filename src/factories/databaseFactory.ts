import Database from "better-sqlite3";

export default class DatabaseFactory {
    private static instance: Database.Database = null;

    static getInstance(): Database.Database {
        if (!this.instance) {
            this.instance = new Database("db/database.db", { verbose: console.log });
        }
        return this.instance;
    }
}