'use strict';

var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'rokkoo', 
    api_key: '839181651442274', 
    api_secret: 'dqFAGoJ0HryVMl_ujYFtVrn-c2k' 
  });

  module.exports = cloudinary;