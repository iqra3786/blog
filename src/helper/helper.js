//const {translations} = require('../helpers/languages')
exports.responseOk = (req, res, message, data = null, statusCode = 200) => {
    
    
   // message = translations[req.headers.languages || "en"][message]
    // console.log(req.headers.language)
    // if (!message) throw { message: "Invalid message in language transaction please add message in it" }
    return res.status(statusCode).send({
        success: true,
        message: message,
        data: data
    })
}
exports.responseError = (req, res, message, data = null, statusCode = 400) => {
  //  message = translations[req.headers.language ?? "en"][message]
 //   if (!message) throw { message: "Invalid message in language transaction please add message in it" }
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    })
}

// exports.asyncWrapper = (cb) => {
//     return (req, res, next) => cb(req, res, next).catch((err) => {
//         console.log(err.message)
//         return res.status(500).json({ success: false, message: err.message, data: null })
//     })
// }

// exports.asyncWrapper = (cb) => {
//     return async (req, res, next) => {
//       try {
//         await cb(req, res, next);
//       } catch (err) {
//         console.log(err.message);
//         return res.status(500).json({ success: false, message: err.message, data: null });
//       }
//     };
//   };
  
exports.asyncWrapper = (cb) => {
    return async (req, res, next) => {
      try {
        await Promise.resolve(cb(req, res, next));
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: err.message, data: null });
      }
    };
  };
  
exports.verifyJWTTokenSync = (token, type) => {
    const key = type == "normal" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET
    return this.verifyJWTToken.verify(token, key, (err, decoded) => err || !decoded ? false : decoded)
}

/**
 * synchronously verify given token using a secret key or a public key to get a decoded token 
 * token=JWT string to verify
 * SecretOrPublicKey-either the secret for HMAC algorithm,or thhe PEM encoded public key for RSA and ECDSA.
 * [options]-options for the verification
 * returns-the decoded token
 */
