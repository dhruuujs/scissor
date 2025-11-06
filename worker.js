const defaultBlocked = ["facebook.com","instagram.com"];


chrome.runtime.onInstalled.addEventListner(()=>{
    chrome.storage.local.set({blockedSites:defaultBlocked});
});

chrome.webNavigation.onBeforeNavigate.addEventListener(async (details)=>{
    const url = details.url;
    if(!url.startsWith("http")) return;
    
if(blockedSites.some(site=> url.includes(site))){
   console.log("Ayy bruda! ts is blocked", url); 
    
    chrome.tabs.update(details.tabId,{
        url: chrome.runtime.getUrl("blocked.html")
    });
}
});

