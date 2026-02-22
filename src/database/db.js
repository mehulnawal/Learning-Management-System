import mongoose from "mongoose";

const database = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`);
        console.log(`Host name - ${connection.connection.host}`);

    } catch (error) {
        console.error("Database connection failed!");
        console.error(error.message);
        process.exit(1);
    }
}

export default database;