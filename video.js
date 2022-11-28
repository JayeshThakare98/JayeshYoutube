const video_details_div = document.getElementById("video_details")

const playVideo = () => {
    let { id, snippet } = JSON.parse(localStorage.getItem("clicked_item")) || []
    // console.log("data:", id);
    let title = snippet.title

    let iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed/${id}/?autoplay=1&mute=1`
    iframe.width = "100%";
    iframe.height = "50%";
    iframe.setAttribute("allowfullscreen", true)
    iframe.setAttribute("autoplay", true)
    // console.log(iframe);

    let info = document.createElement('h2')
    info.setAttribute("id", "info")
    info.innerText = title

    video_details_div.append(iframe, info);
}
// for apt calling at the recomandation 
const API_KEY = `AIzaSyB7DTRRzM0jDQSo1Vhdnc7Fda53FsuypIg`;
const trending = async () => {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=5&regionCode=IN&key=${API_KEY}`)
        let data = await res.json()
        let NewData = data.items
        recolist(NewData)
    } catch (err) {
        console.log(err);
    }
}
trending()
const recovid = document.getElementById("recomandation");

const recolist = (NewData) => {
    // console.log(NewData)
    recovid.innerHTML = null;
    NewData.forEach(({ snippet }) => {
        const title = snippet.title;
        const thumbnail = snippet.thumbnails.high.url;
        const channel_name = snippet.channelTitle;

        let div = document.createElement("div")

        const img = document.createElement("img")
        img.src = thumbnail;
        img.setAttribute("id", "recimg")

        const title_html = document.createElement("p")
        title_html.innerText = title;

        const channel_html = document.createElement("p")
        channel_html.innerText = channel_name;

        div.append(img, title_html, channel_name);
        recovid.append(div)
    })

}
// recolist(NewData)

