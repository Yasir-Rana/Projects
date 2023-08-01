const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;
const host = "10.8.33.0";   // Replace it with your IP Address
const upload = multer({ dest: 'uploads/' });


app.use(cors());

app.post('/upload', upload.single('image'), async (req, res) => {
    const { file } = req;
  
    if (!file) {
      return res.status(400).json({ error: 'Missing image file' });
    }
  
    try {
      const image = fs.readFileSync(file.path, { encoding: 'base64' });
      // const response = await axios({
      //   method: 'POST',
      //   url: 'https://detect.roboflow.com/pest-detection-v9gfo/4?api_key=KFHfRxmWBdlorK6B27vn',
      //   params: {
      //     confidence: 0.2,
      //   },
      //   data: image,
      // });

      const response = await axios.post('https://detect.roboflow.com/pest-detection-v9gfo/4?api_key=KFHfRxmWBdlorK6B27vn', image, { params: { confidence: 0.2 }});

      console.log(response.data);
      return res.status(200).json({ message: 'Image uploaded and analyzed successfully', data: response.data });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Error analyzing image' });
    }
  });

app.listen(port, host, () => {
  console.log('Server is running on port: 3000');
});



