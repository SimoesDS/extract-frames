const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const extractFrames = require('ffmpeg-extract-frames');

const fs = require('fs');

const extractAllFrames = async () => {
    let allMP4PathFiles = await fs.promises.readdir('../');
    
    allMP4PathFiles = allMP4PathFiles
        .filter(file => /\.MP4$/.test(file));
    
    for (const fullFileName of allMP4PathFiles) {
        const fileName = /(.+)\.MP4/.exec(fullFileName)[1];
        
        console.log(`Iniciando ${fileName}`);
        await extractFrames({
            input: `../${fileName}.MP4`,
            output: `../frames/${fileName}-%d.png`
          });
    }
}

extractAllFrames().then(() => console.log('Finalizou!!'));