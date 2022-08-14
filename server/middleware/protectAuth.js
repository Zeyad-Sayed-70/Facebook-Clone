const jwt = require('jsonwebtoken')
require('dotenv').config()

const protectAuth = async (req, res, next) => {
        const authorization = req.headers.authorization
    
        if ( authorization?.split(' ')[0] === 'Bearer' && authorization?.split(' ')[1] ) {
            try {
                const token = authorization.split(' ')[1]
                
                jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                    
                    if ( err ) {
                        console.log('### Not Valid Authorization ###')
                        res.status(200).json({ status: 500, message: 'Not Valid Authorization' })
                        return
                    }
    
                    next()
                })
            } catch (error) {
                console.log('### Authorization Error ###')
                res.status(200).json({ status: 500, message: error.message })
            }    
        } else {
            console.log('### No Authorization ###')
            res.status(200).json({ status: 500, message: 'No Authorization' })
            return
        }
}

module.exports = protectAuth