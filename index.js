const express = require('express');
const { exec } = require('child_process');  
const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    url = req.body.url;
    exec(`yt-dlp --write-auto-sub --skip-download --convert-subs srt ${url}`, (err, stdout, stderr) => {
  if (err) {
    return console.log(err);
  }

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
    const files = fs.readdirSync('./');
    let srtFile = files.find(file => file.endsWith('.srt'));
    const data = fs.readFileSync(srtFile, 'utf8');
    res.send(data);
    fs.unlinkSync(srtFile);
    console.log('File deleted');
});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
