const express=require('express')
const router=express.Router()
const math_obj=require('./controller/Math')
const india_obj=require('./controller/india')
const stu_obj=require('./controller/college')

//-----------These Libry For File Upload Any Type--------
const multer=require('multer') // Upload the Destination Location
const fs=require('fs')   // Handle The File Type and Read
const path=require('path')  // Find The Where you Want To Store
//---------------------End---------------------

// Set up Multer for file upload
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadDir = './static/student_image';
            if (!fs.existsSync(uploadDir)){
                fs.mkdirSync(uploadDir);
            }
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)); // unique file name (images or any kind of file)
        }
    });  
const upload = multer({ storage: storage });



router.get('/',(req,res)=>
{
     res.render('Home')
     res.end()
})

router.get('/ram',(req,res)=>
    {
         res.render('About')
         res.end()
    })

router.get('/zirakpur',(req,res)=>
{
    res.render('contact')
    res.end()
})

router.get('/findsum',(req,res)=>
{
    res.render('sum')
    res.end()
})

router.post('/cal',(req,res)=>
{
        var a=req.body.a 
        var b=req.body.b 
        var c=parseInt(a)+parseInt(b)
        res.render('sum',{result:'Sum is '+c})
        res.end()
})

router.use('/subtract',(req,res)=>
{
      if(req.method==='GET')
      {
        res.render('Subtraction')
        res.end()
      }
      else 
      {
        var a=req.body.a 
        var b=req.body.b 
        var c=parseInt(a)-parseInt(b)
        res.render('Subtraction',{result:'Ans is '+c})
        res.end()
      }
})

router.use("/multi",(req,res)=>
{
     math_obj.Multiplcation(req,res)
})

router.use("/Test",(req,res)=>
{
     math_obj.Bootstrap_Page(req,res)
})

router.use('/Testing',(req,res)=>
{
        res.render('Test2')
        res.end()
})

router.use('/record_registartion',(req,res)=>
{
          india_obj.Add_Record(req,res)
})

router.use('/display_record',(req,res)=>
{
        india_obj.Fetch_All_Record(req,res)
})

router.use('/delete_record',(req,res)=>
{
        india_obj.Delete_Record(req,res)
})

router.use('/update_human_record',(req,res)=>
{
          india_obj.Update_record(req,res)
})

router.use('/find_Record',(req,res)=>
{
           india_obj.Search_Record(req,res)
})

router.use('/student_add',upload.single('photo'),(req,res)=>
{
        stu_obj.Add_Student(req,res)
})

router.use('/student_display',(req,res)=>
{
        stu_obj.Display_Student(req,res)
})
router.use('/login',(req,res)=>
{
    india_obj.Login_Check(req,res)
})

router.use('/signup',(req,res)=>
{
        india_obj.Signup_user(req,res)
})

router.use('/Welcome_Dashboard',(req,res)=>
{
     if(req.session.myemailid)
     {
       res.render('Dashboard')
       res.end()
     }
     else 
     {
        res.render('login',{message:'Lgoin Here.....'})
        res.end()
     }
})

router.use('/logout',(req,res)=>
{
      req.session.destroy()
      res.render('login',{message:'Logout Successfully'})
        res.end()
})
module.exports=router