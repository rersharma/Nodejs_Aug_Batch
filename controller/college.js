const connect_obj=require('../Database/myconnector')
class College 
{
      Add_Student(req,res)
      {
          if(req.method=='GET')
          {
              res.render('student')
              res.end()
          }
          else 
          {
               connect_obj.getConnection((err,myconnection)=>
            {
                  if(err)
                  {
                     res.send(err)
                     res.end()
                  }
                  else 
                  {
                         const q=`insert into student(name,roll,photo)values('${req.body.name}','${req.body.roll}','${req.file.path}')`
                         myconnection.query(q,(err)=>
                        {
                               if(err)
                               {
                                 res.send(err)
                                 res.end()
                               }
                               else 
                               {
                                    res.render('student',{message:req.body.name+' Record Save Successfully'})
                                    res.end()
                               }
                        })
                  }
            })
          }
      }

      Display_Student(req,res)
      {
        connect_obj.getConnection((err,myconnection)=>
        {
              if(err)
              {
                res.send(err)
                res.end()
              }
              else 
              {
                 const q="select * from student"
                 myconnection.query(q,(err,data)=>
                {
                      if(err)
                      {
                         res.send()
                         res.end()
                      }
                      else 
                      {
                          res.render('displaystu',{record:data})
                          res.end()
                      }
                })
              }
        })
      }
}

const obj=new College()
module.exports=obj