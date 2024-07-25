const cloudinary = require('cloudinary').v2;
const File = require('../models/File');


exports.localFileUpload = (req, res) => {
  const file = req.files.file;
  console.log("File aagyi ", file);

  let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
  console.log(path);

  file.mv(path, (err) => {
    if (err) {
      console.log("Error in uploading file!");
    }
  });

  res.json({
    success: true,
    message: "File uploaded successfully to local storage!",
  });
};

function isFileTypeSupported(fileType, supportedTypes){
  return supportedTypes.includes(fileType);
}

async function uploadToCloudinary(file, folder, quality){
  const options = {folder};
  options.resource_type = 'auto';
  options.quality = quality;
  return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async(req, res)=>{
  try {
    const {name, tags, email} = req.body;
    console.log(name,tags, email);

    const file = req.files.imgFile;
    console.log(file);

    const supportedTypes = ['jpg', 'jpeg', 'png'];
    const fileType = file.name.split(".")[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
      res.json({
        success : false,
        message : "File type not supported!"
      })
    }

    const response = await uploadToCloudinary(file, "FileUploadProject");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url
    })

    res.json({
      success : true,
      imageUrl: response.secure_url,
      message :"File uploaded successfully to cloudinary!!"
    })

  } catch (err) {
    res.status(400).json({
      success : false,
      message : "Error in uploading"
    })
  }
}

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log(file);

    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();


    if (!isFileTypeSupported(fileType, supportedTypes)) {
      res.json({
        success: false,
        message: "File type not supported!",
      });
    }

    const response = await uploadToCloudinary(file, "FileUploadProject");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "File uploaded successfully to cloudinary!!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in uploading",
    });
  }
};

exports.imageSizeReducerUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imgFile;
    console.log(file);

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      res.json({
        success: false,
        message: "File type not supported!",
      });
    }

    const response = await uploadToCloudinary(file, "FileUploadProject", 60);
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "File uploaded successfully to cloudinary!!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in uploading",
    });
  }
};