import jwt from 'jsonwebtoken'
export const isAuth =  (req, res, next) => {
    const bearerHeader = req.headers.authorization
    const token = bearerHeader.split(' ')[1];
    if (!token) {
        // Nếu không có mã thông báo, trả về lỗi
        return res.status(401).send({
          auth: false,
          message: 'Không tìm thấy mã thông báo.'
        });
      }
    
      // Xác thực mã thông báo bằng secret key
      jwt.verify(token, process.env['SECRET_KEY'], (err, decoded) => {
        if (err) {
          // Nếu xác thực không thành công, trả về lỗi
          return res.status(500).send({
            auth: false,
            message: 'Xác thực mã thông báo không thành công.'
          });
        }
         // Lưu thông tin người dùng vào request để sử dụng ở các middleware khác
    req.userId = decoded.id;
    next();
  });
}
