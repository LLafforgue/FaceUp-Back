function checkBody(req, res, next) {
 console.log('ok1');

try{
    const {photoFromFront, type, name }= req.files.photoFromFront
    for (const field in {photoFromFront, type, name }) {
    if (req.files[field] === '') {
      res.status(400).json({result:false, mesage:'field empty'});
    }
  }
  return next();
}catch(err){
    console.error(err);
    return res.status(401).json({result:false, message:'file name not authorized'});
}
  
}

module.exports = { checkBody };
