import jwt from 'jsonwebtoken'
export const isAuth =  (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization
        const accessToken = bearerHeader.split(' ')[1];
        const decodeJWT = jwt.verify(accessToken, process.env['SECRET_KEY'])
        req.userId = decodeJWT.id;
        next()
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).send('Token Expired')
        }
        return res.status(401).send('Authentication not valid')
    }
}
