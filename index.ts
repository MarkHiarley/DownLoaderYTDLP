import { exec } from 'child_process';

function downloadVideo(url: string) {
    const command = `yt-dlp -f b ${url}`;
    //yt-dlp -f bestaudio
    //yt-dlp -f bestvideo

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao baixar o vídeo: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

const videoUrl = 'https://www.youtube.com/watch?v=o2qFATSNdu4';
downloadVideo(videoUrl);
