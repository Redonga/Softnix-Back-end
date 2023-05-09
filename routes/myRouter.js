//จัดการ Routing
const express = require('express')
const router = express.Router()
//เรียกใช้งานโมเดล
const Product = require('../models/products')


//เพิ่มข้อมูล
router.get('/',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('index',{products:doc})
    })
})

router.get('/add-product',(req,res)=>{
    if(req.session.login){
        res.render('form') //บันทึกสินค้า
    }else{
        res.render('admin') //เข้าสู่ระบบ
    }
})

router.get('/manage',(req,res)=>{
    if(req.session.login){
        Product.find().exec((err,doc)=>{
            res.render('manage',{products:doc})
        })
    }else{
        res.render('admin') //เข้าสู่ระบบ
    }
})

//ออกจากระบบ
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/manage')
    })
})

//ลบข้อมูล
router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
})

//บันทึกข้อมูล
router.post('/insert',(req,res)=>{
    let data = new Product({
        id:req.body.id,
        Seed_RepDate:req.body.Seed_RepDate,
        Seed_Year:req.body.Seed_Year,
        Seed_YearWeek:req.body.Seed_YearWeek,
        Seed_Varify:req.body.Seed_Varify,
        Seed_RDCSD:req.body.Seed_RDCSD,
        Seed_Stock2Sale:req.body.Seed_Stock2Sale,
        Seed_Season:req.body.Seed_Season,
        Seed_Crop_Year:req.body.Seed_Crop_Year,
    })
    console.log(data)
    Product.saveProduct(data,(err)=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
})

// แก้ไขข้อมูล
router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        //นำข้อมูลเดิมที่ต้องการแก้ไข ไปแสดงในแบบฟอร์ม
        res.render('edit',{product:doc})
    })
})

router.post('/update',(req,res)=>{
    //ข้อมูลใหม่ที่ถูกส่งมาจากฟอร์มแก้ไข
    const update_id = req.body.update_id
    let data = {
        id:req.body.id,
        Seed_RepDate:req.body.Seed_RepDate,
        Seed_Year:req.body.Seed_Year,
        Seed_YearWeek:req.body.Seed_YearWeek,
        Seed_Varify:req.body.Seed_Varify,
        Seed_RDCSD:req.body.Seed_RDCSD,
        Seed_Stock2Sale:req.body.Seed_Stock2Sale,
        Seed_Season:req.body.Seed_Season,
        Seed_Crop_Year:req.body.Seed_Crop_Year,
    }
    //อัพเดตข้อมูล
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
        res.redirect('/manage')
    })
})

//เข้าสู่ระบบ
router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 86400000 // 1 วัน

    if(username === "admin" && password==="123"){
        //สร้าง session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge=timeExpire
        res.redirect('/manage')
    }else{
        res.render('404')
    }
})


module.exports = router