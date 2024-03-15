import mongoose from "mongoose";

export const dbCon = async()=>{
    try {
    await mongoose.connect('mongodb+srv://armyharish786:t3jXJqVME4fVQCTv@cluster0.uanzssj.mongodb.net/')
console.log("Database connected...")
        
    } catch (error) {
        console.log("No DB Connection !!")
        
    }
}