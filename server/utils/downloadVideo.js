const fs = require('fs');
const http = require('http');
function downloadVideo(data) {
    console.log(data)
    // const video = fs.createWriteStream("test.mp4");
    // const request = http.get(data.url, function (response) {
    //     response.pipe(video);

    //     // after download completed close filestream
    //     video.on("finish", () => {
    //         video.close();
    //         console.log("Download Completed");
    //     });

    // });
}
module.exports = downloadVideo