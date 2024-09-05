const mysql=require('mysql')

const obj=mysql.createPool({
   host:'localhost',
   database:'india',
   user:'root',
   password:'',
   multipleStatements:true
})

module.exports=obj
