const defaultBlocked = ["facebook.com","instagram.com"];

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.local.set({blockedSites:defaultBlocked});
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details)=>{
    const url = details.url;
    if(!url.startsWith("http")) return;
    
const {blockedSites} = await chrome.storage.local.get("blockedSites");
if(!blockedSites) return;

if(blockedSites.some(site=> url.includes(site))){
   console.log("Ayy bruda! ts is blocked", url); 
    
    chrome.tabs.update(details.tabId,{
        url: chrome.runtime.getUrl("blocked.html")
    });
}
});

