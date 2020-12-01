//check the authentication of the user and create appropriate cookies
const CryptoJS = require("crypto-js");
let users_data = require("../model/users.json");
class Authentication {
    
    static checkUser(username, password){
            
            let data = users_data.members
            var usernames = []
            var len = Object.keys(data).length;
            
            for (let i = 0; i < len; i++) {
            
                usernames.push((data[i].username));
            }

            if (usernames.includes(username)) {

                var index = data.findIndex(obj => obj.username==username);

                
                if (data[index].password==CryptoJS.MD5(password).toString()){
                    
                    return {"Valid":true,"Role":data[index].role}
                }
                else {
                    return {"Valid":false,"Role":0}
                } 
            } 
            else {
                return {"Valid":false,"Role":-1}
            }
           
    }
     
    static connect(){

        return null

    }

    static disconnect(){

        return null

    }
}
module.exports = Authentication;


