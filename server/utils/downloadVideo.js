const fs = require('fs');
const http = require('http');
// const Blob = require('blob')
function downloadVideo(data) {
    console.log(data)
    // const myFile = new File([data.url], "test.mp4", { type: 'video/mp4' });
    // const video = fs.createWriteStream("test.mp4");
    // const text = new Response(data.url).text();
    // const thing = new Blob(data.url)
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