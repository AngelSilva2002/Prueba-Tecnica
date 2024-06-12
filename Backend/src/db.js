import mongoose from 'mongoose'

export const connectDB = async () => {
    
    try{
        await 
        mongoose.connect('mongodb://localhost/databasedb')
        console.log("Db Connect")
    } catch (error) {
        console.log(error)
    }
}
