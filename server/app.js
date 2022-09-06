const express = require('express');
const app = express();
const cors = require('cors');

const cloudinary = require('./utils/cloudinary');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());



app.get('/', (req, res) => {
    res.send('test')
});

app.post('/api/upload', async (req, res) => {
    try {
        const data = req.body.pict

        const uploadResponse = await cloudinary.uploader.upload(data, {
            upload_preset: 'dev_setups'
        });
        
        res.status(200).json({
            msg: 'success register data',
            url: uploadResponse.url
        });
    } catch(err) {
        res.status(500).json({
            err: err,
            msg: "server error try again"
        });
    }
});


app.listen(8000, () => {
    console.log('server berjalan di port 8000')
});