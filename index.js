"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function downloadVideo(url) {
    var command = "yt-dlp -f b ".concat(url);
    //yt-dlp -f bestaudio
    //yt-dlp -f bestvideo
    (0, child_process_1.exec)(command, function (error, stdout, stderr) {
        if (error) {
            console.error("Erro ao baixar o v\u00EDdeo: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.error("stderr: ".concat(stderr));
            return;
        }
        console.log("stdout: ".concat(stdout));
    });
}
var videoUrl = 'https://www.youtube.com/watch?v=o2qFATSNdu4';
downloadVideo(videoUrl);
