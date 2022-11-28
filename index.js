// GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=India&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
const API_KEY = `AIzaSyB7DTRRzM0jDQSo1Vhdnc7Fda53FsuypIg`;
const trending = async () => {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`)
        let data = await res.json()
        let NewData = data.items
        appendVideos(NewData)




    } catch (err) {
        console.log(err);
    }
}
trending()






// let res = await fetch (`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${API_KEY}`) 

const SearchingVideos = async () => {
    try {
        let query = document.getElementById("query").value;
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`);
        const data = await res.json()
        const actual_data = data.items;
        // console.log(data)
        appendVideos(actual_data);
    } catch (err) {
        console.log(err);
    }
}

let container = document.getElementById("container");

const appendVideos = (data) => {
    console.log(data);
    container.innerHTML = null;
    data.forEach(({ snippet, id}) => {
        // console.log(videoId);
        const title = snippet.title;
        // const video = id.videoId;
        const thumbnail = snippet.thumbnails.high.url;
        const channel_name = snippet.channelTitle;


        let div = document.createElement("div")

        const img = document.createElement("img")
        img.src = thumbnail;
        img.setAttribute("id", "divimg")

        const title_html = document.createElement("h4")
        title_html.innerText = title;

        const channel_html = document.createElement("h5")
        channel_html.innerText = channel_name;

        let data = {
            id,
            snippet,
        }
        // div.addEventListener("")
        div.onclick = () => {
            // console.log(title)
            storeClickedvideo(data)

        }
        div.append(img, title_html, channel_name);
        container.append(div)
        
    })
}

const storeClickedvideo= (data)=>{
    localStorage.setItem("clicked_item", JSON.stringify(data));
    // console.log(data);
window.location.href="video.html"

}
