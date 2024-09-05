class Math 
{
     a=null 
     b=null
     c=null
     Multiplcation(req,res)
     {
           if(req.method=='GET')
           {
               res.render('Multiple')
               res.end()
           }
           else 
           {
                this.a=req.body.a 
                this.b=req.body.b 
                this.c=parseInt(this.a)*parseInt(this.b)
                 res.render('Multiple',{message:'Multiple is '+this.c})
                 res.end()   
           }
     }
     
     Bootstrap_Page(req,res)
     {
           res.render('Test')
           res.end()
     }
}

const obj=new Math()

module.exports=obj