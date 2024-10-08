const connect_obj=require('../Database/myconnector')

class india 
{
     Add_Record(req,res)
     {
          if(req.method=='GET')
          {
               res.render('Record')
               res.end()
          }
          else 
          {
                 connect_obj.getConnection((err,connectn)=>
                {
                          if(err)
                          {
                              res.send(err)
                              res.end()
                          }
                          else 
                          {
                            const q=`insert into Human(name,Adharcard,address)values('${req.body.name}','${req.body.adhr}','${req.body.address}')`
                            connectn.query(q,(err)=>
                            {
                                  if(err)
                                  {
                                    res.send(err)
                                    res.end()
                                  }
                                  else 
                                  {
                                    res.render('Record',{message:req.body.name+" Record Added Successfully"})
                                    res.end()
                                  }
                            })
                          }
                })
          }
     }

      Fetch_All_Record(req,res)
      {
            connect_obj.getConnection((err,connections)=>
            {
                if(err)
                {
                    res.send(err)
                    res.end()
                }
                else 
                {
                      const q=`select * from Human`
                      connections.query(q,(err,data)=>
                      {
                         if(err)
                         {
                            res.send(err)
                            res.end()
                         }
                         else 
                         {
                            res.render('display',{record:data})
                            res.end()
                         }

                      })
                }
            })
      }

      Delete_Record(req,res)
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
                        var Human_id=req.query.hm_id
                        const q=`delete from Human where id='${Human_id}'`
                        myconnection.query(q,(err)=>
                        {
                                if(err)
                                {
                                     res.send(err)
                                     res.end()
                                }
                                else 
                                {
                                     this.Fetch_All_Record(req,res)  
                                }
                        })
                   }
            })
      }

      Update_record(req,res)
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

                  
                       const q=`update Human set name='${req.body.name}',adharcard='${req.body.adhrcard}',address='${req.body.address}' where id='${req.body.id}'`
                       myconnection.query(q,(err)=>
                        {
                                   if(err)
                                    {
                                           res.send(err)
                                           res.end()
                                    }  
                                    else 
                                    {
                                          this.Fetch_All_Record(req,res)
                                    }
                        })
                  }
            })
      }

      Search_Record(req,res)
      {
            if(req.method=='GET')
            {
                 res.render('Search')
                 res.end()
            }
            else 
            {
                              connect_obj.getConnection((err,myconnection)=>
                              {
                                    if(err)
                                    {
                                          res.send(err)
                                          res.end(err)
                                    }
                                    else 
                                    {
                                          const q=`select * from Human where name='${req.body.name}'`
                                          myconnection.query(q,(err,data)=>
                                          {
                                                if(err)
                                                {
                                                      res.send(err)
                                                      res.end()
                                                }
                                                else 
                                                {
                                                      if(data.length>0)
                                                      {
                                                            res.render('Search',{record:data})
                                                            res.end()
                                                      }
                                                      else 
                                                      {
                                                            res.render('Search',{message:'Record Not Exists'})
                                                            res.end()
                                                      }
                                                }
                                          })
                                    }
                              })
            }
      }
      

      Login_Check(req,res)
      {
                 if(req.method==='GET')
                  {
                      res.render('login')
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
                                      const q=`select * from user where email='${req.body.email}' and password='${req.body.password}'`
                                          myconnection.query(q,(err,data)=>
                                          {
                                                if(err)
                                                {
                                                       res.send(err)
                                                       res.end()
                                                }
                                                else 
                                                {
                                                         if(data.length>0)
                                                         {
                                                                 req.session.myemailid=req.body.email
                                                                res.redirect('/Welcome_Dashboard')
                                                         }
                                                         else 
                                                         {
                                                            res.render('login',{message:'Invalid Credentials'})
                                                            res.end()
                                                         }
                                                }
                                          })
                                  }
                        })
                  }
      }

      Signup_user(req,res)
      {
            if(req.method==='GET')
                  {
                      res.render('signup')
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
                                      const q=`insert into user(name,email,password,gender,mobile,address)values
                                        ('${req.body.name}','${req.body.email}','${req.body.password}','${req.body.gender}','${req.body.mobile}','${req.body.address}')`

                                    myconnection.query(q,(err)=>
                                    {
                                            if(err)
                                            {
                                                 res.send(err)
                                                 res.end()
                                            }
                                            else 
                                            {
                                                  res.render('signup',{message:req.body.name+" Signup Successfully"})
                                                  res.end()
                                            }
                                    })
                                }
                        })
                  }
      }

      change_pass(req,res)
      {
           if(req.method==='GET')
           {
                res.render('changepassword')
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
                              const q=`select * from user where email='${req.session.myemailid}' and password='${req.body.oldpass}'`
                              myconnection.query(q,(err,data)=>
                              {
                                     if(err)
                                     {
                                           res.send(err)
                                           res.end()
                                     }
                                     else 
                                     {
                                            if(data.length>0)
                                            {
                                                   if(req.body.newpass==req.body.confpass)
                                                   {
                                                      const q1=`update user set password='${req.body.newpass}' where email='${req.session.myemailid}'`
                                                      myconnection.query(q1,(err)=>
                                                      {
                                                             if(err){
                                                                  res.send(err) 
                                                                  res.end()}
                                                             else 
                                                             {
                                                                  res.render('changepassword',{message:'Password Change successfully',message2:'Relogin?'})
                                                             res.end()

                                                             }
                                                      })
                                                   }
                                                   else 
                                                   {
                                                      res.render('changepassword',{message:'New & Confirm password Mismatch'})
                                                      res.end()
                                                   }
                                            }
                                            else 
                                            {
                                                res.render('changepassword',{message:'Old Password Inccorect'})
                                                res.end()
                                            }
                                     }
                              })
                         }
                  })
           }
      }
}


const obj=new india()

module.exports=obj