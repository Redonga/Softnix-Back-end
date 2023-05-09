// ใช้งาน mongoose
const mongoose = require('mongoose')

// เชื่อมไปยัง MongoDB
const dbUrl = 'mongodb+srv://Softnix:hAqqeaY6pXHL2Z5d@cluster0.fwoilue.mongodb.net/productDB'
mongoose.set('strictQuery', false);
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

// ออกแบบ Schema
let productSchema = mongoose.Schema({
    id:Number,
    Seed_RepDate:Number,
    Seed_Year:Number,
    Seed_YearWeek:Number,
    Seed_Varify:String,
    Seed_RDCSD:String,
    Seed_Stock2Sale:Number,
    Seed_Season:Number,
    Seed_Crop_Year:String
})

// สร้างโมเดล
let Product = mongoose.model("products",productSchema)

// ส่งออกโมเดล
module.exports = Product

//ออกแบบฟังก์ชั่นสำหรับบันทึกข้อมูล
module.exports.saveProduct=function(model,data){
    model.save(data)
}