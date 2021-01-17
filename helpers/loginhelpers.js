var db = require('../config/connection')
var bcrypt = require('bcrypt')
const { response } = require('express')

module.exports = {

    signup: (details) => {

        return new Promise(async (resolve, reject) => {
            details.password = await bcrypt.hash(details.password, 10)

            db.get().collection('signup').insertOne(details).then((data) => {
                resolve(data.ops[0])

            })
        })
    },
login: (details) =>{
    return new Promise (async(resolve,reject)=>{
        let response={}
       await db.get().collection('signup').findOne({email:details.email}).then((user)=>{
            if(user){
               bcrypt.compare(details.password,user.password).then((product)=>{
                   if (product){
                    //    console.log(product);
                    //    console.log(user);
                       response.user=user
                       response.status=true; 
                    console.log('user matching');
                    console.log(response);
                    resolve(response)
                }else{
                   response.status=false; 
                    console.log('input miss match');
                    resolve({status:false})
                    loginerr=true
                }
                    
                })
                
            }else{
                console.log('no user found');
                response.status=false;
                resolve({status:false})
            }
        })
    })
}
}