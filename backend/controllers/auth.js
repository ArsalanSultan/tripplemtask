const User = require('../model/user')

exports.register=async(req,res,next)=>{
const {email,name,password,plan} = req.body
try {
    if(req.method != 'POST') return res.status(400)
    const user =await User.create({
        email,
        name,
        password, 
        plan
    })
    res.status(201).json({ message:'user created', user})
} catch (error) {
    console.log(error)
    res.status(500).json({message:'Internal Server Error'})
}
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
     if(password !== user.password){
        return res.status(401).json({ message: 'Invalid email or password' });
     }
  
      res.status(200).json({message:'loggen in', user });
    } catch (error) {
      console.error(error);
     return res.status(500).json({ message: 'Internal server error' });
    }
  };


  exports.getAllUsers=async(req,res)=>{
    try {
      const users = await User.find()
      if(users){
       return res.status(200).json({message:'got all users', users });
      }
     return res.status(404).json({message:'no users found' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  