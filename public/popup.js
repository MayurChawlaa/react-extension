document.getElementById("start_chart").addEventListener("click",()=>{
    console.log("clicked");
    chrome.tabs.create({url:"index.html"});
});