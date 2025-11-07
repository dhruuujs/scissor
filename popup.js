const input = document.getElementById("urlInput")
const addBtn = document.getElementById("addBtn")
const list = document.getElementById("urlList")

console.log("Popup loaded");

//Loas the blocked site
function getBlockedSites(){
    return new Promise((resolve)=>{
        chrome.storage.local.get("blockedSites",(result)=>{
            resolve(result.blockedSites || [])
        });
    });
}

function setBlockedSites(sites){
    return new Promise((resolve)=>{
        chrome.storage.local.set({blockedSites:sites}, resolve);
    });
}


(async()=>{
    const blockedSites = await getBlockedSites();
    blockedSites.forEach(addListItem);
})();


function addListItem(site){
    const li = document.createElement("li");
    li.textContent = site;

    const delBtn = document.createElement("button");
    delBtn.setAttribute("class","closeBtn");
    delBtn.textContent='x';

    delBtn.onclick = async ()=>{
        const blockedSites = await getBlockedSites();
        const updated = blockedSites.filter((s)=>s!== site);
        await setBlockedSites(updated);
        li.remove();
    };
    li.appendChild(delBtn);
    list.appendChild(li)
}

addBtn.onclick = async ()=>{
    const site = input.value.trim();
    if(!site) return;

    const blockedSites = await getBlockedSites();
    const updated =  [...blockedSites,site];
    await setBlockedSites(updated);
    addListItem(site);
    input.value="";
};
