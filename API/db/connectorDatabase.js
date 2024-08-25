import mongoose from "mongoose";

const ConnectorDatabse = async(DATABASE_URL) => {
     try {
          const DB_OPTION = {
               dbName: "Contact"
          }
          await mongoose.connect(DATABASE_URL, DB_OPTION)
          console.log("Database Connected Succesfully...")
     } catch (error) {
          console.log(error)
     }
}
export default ConnectorDatabse;