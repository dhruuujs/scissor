const defaultBlocked = ["facebook.com","instagram.com"];

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.local.set({blockedSites:defaultBlocked});
    console.log("Default blocked sites set:",defaultBlocked);
});

function getBlockedSites(){
    return new Promise((resolve)=>{
        chrome.storage.local.get("blockedSites",(result)=>{
            resolve(result.blockedSites || []);
        });
    });
}


chrome.webNavigation.onBeforeNavigate.addListener(async (details)=>{
    const url = details.url;
    if(!url.startsWith("http")) return;
    
const blockedSites = await getBlockedSites();

if(!blockedSites) return;

if(blockedSites.some(site=> url.includes(site))){
   console.log("Ayy bruda! this site is blocked", url); 
    
    chrome.tabs.update(details.tabId,{
        url: chrome.runtime.getURL("blocked.html")
    });
}
},{url:[{urlMatches:"*"}] });