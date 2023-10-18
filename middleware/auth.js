const jwt =require("jsonwebtoken")

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(404).json("no token found")
    }
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(401).json("invalid authentication")
            }
            req.user = user
                
        next();
        })
    
  

        
}
module.exports = isAuthenticated