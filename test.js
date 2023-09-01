const path = require('path');
const fs = require('fs');

function base64_encode (file){
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}; 

exports.image_data = (req) => {
    //const __parentDir = path.join(__dirname, '../.');
    const __parentDir = __dirname; 
    const image_name = req.file?req.file.originalname:(req.body.existing_image?req.body.existing_image:''); 
    const base64str = image_name?base64_encode(path.join(__parentDir + `/public/images/${image_name}`)):'';
    const src = base64str?'data:image;base64,' + base64str:'';

    return src, image_name; 
}; 
