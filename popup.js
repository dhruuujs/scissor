const input = document.getElementById("urlInput")
const addBtn = document.getElementById("addBtn")
const list = document.getElementById("urlList")


try{
//Loas the blocked site
chrome.storage.local.get("blockedSites",({blockedSites})=>{
    if(blockedSites) blockedSites.forEach(addListItem);
});

function addListItem(site){
    const li = document.createElement("li");
    li.textContent = site;
    const delBtn = document.createElement("button");
    delBtn.textContent='x';
    delBtn.onclick = async ()=>{
        const {blockedSites} = await chrome.storage.local.get("blockedSites");
        const updated = blockedSites.filter(s=>s!= site);
        await chrome.storage.local.set({blockedSites:updated});
        li.remove();
    };
    li.appendChild(delBtn);
    list.appendChild(li)
}

addBtn.onclick = async ()=>{
    const site = input.value.trim();
    if(!site) return;
    const {blockedSites} = await chrome.storage.local.get("blockedSites");
    const updated =  blockedSites ? [...blockedSites,site]:[site];
    await chrome.storage.local.set({blockedSites:updated});
    addListItem(site);
    input.value="";
};
}catch(err){
    alert("Error",err);
}