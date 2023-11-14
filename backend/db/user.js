
const { Schema , model} = require('mongoose');


const UserSchema = new Schema({
    id: { type: Schema.ObjectId}, 
    username: { type: String, require: true },
    password: { type: String, require: true },
});
  
const User = model('User', UserSchema);


const createUser = async(UserName, Password) => {

    try{
        const existingUser = await User.findOne({ username: UserName })
        if (existingUser){
            return null
        } else{
            const newUser = new User({ 
                username: UserName ,
                password : Password
            });
    
            await newUser.save();
            
            return {
                id : newUser._id,
                username: newUser.username ,
            }
        }

    } catch(err){
        return null
    }
}

const checkUser = async(UserName, Password) => {

    try{
        const user = await User.findOne({ username: UserName })
        if(user && user.password == Password){
            return {
                id : user._id,
                username: user.username ,
            } 
        }
        
        return  null

    } catch(err){
        return null
    }
}


module.exports = {createUser , checkUser}
