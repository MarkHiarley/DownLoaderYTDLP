import { exec } from 'child_process';
function downloadVideo(url: string) {
    const command = `yt-dlp -f bestvideo ${url}`;
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
const videoUrl = 'https://youtu.be/rC7Y04k5Tbo?si=7voBvKQZioR5Pj1m';
downloadVideo(videoUrl);
