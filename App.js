const tableBody = document.getElementById("t-body");

const input = document.getElementById("js-input");
const cityBtn = document.getElementById("city");
const stateBtn = document.getElementById("state");
const centerBtn = document.getElementById("center");

let centersData = {};
async function getIsroData() {
  const response = await fetch("https://isro.vercel.app/api/centres");
  centersData = await response.json();

  showData();
}

function showData(){
  tableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for(const center of centersData.centres){
    const tr = document.createElement("tr");
    tr.classList.add("t-list");
    for(const key in center){
        if(key!="id"){
            const td = document.createElement("td");
            td.textContent = center[key];
            tr.appendChild(td);
        }
    }
    fragment.appendChild(tr);
  }
  tableBody.append(fragment);
}

let activeBtn = null;

function activate(event) {
  event.target.classList.toggle("active");
  if (activeBtn && event.target.id === activeBtn.id) {
    activeBtn = null;
    showData();
    // console.log(activeBtn);
    return;
  }
  if (activeBtn) activeBtn.classList.toggle("active");

  activeBtn = event.target;
  console.log(activeBtn);
}

function searchData() {
  const inputKey = input.value.toLowerCase();
  // console.log(inputKey);
  tableBody.innerHTML = "";
  console.log(tableBody.innerHTML);
  if (!activeBtn) {
    detailContainer.innerHTML = `<p class="error">Please select a category</p>`;
    return;
  }
  if (!inputKey) {
    detailContainer.innerHTML = `<p class="error">Please enter a ${activeBtn.id} name </p>`;
    return;
  }
  let finderKey = activeBtn.name;
  const fragment = document.createDocumentFragment();
  // console.log(finderKey); 
  for(const center of centersData.centres){
    // console.log(center);
    if (center[finderKey].toLowerCase().includes(inputKey)){
      // console.log("hey",center[finderKey].toLowerCase().includes(inputKey));
      const tr = document.createElement("tr");
      tr.classList.add("t-list");
      for(const key in center){
        if(key != "id"){
            const td = document.createElement("td");
            td.textContent = center[key];
            tr.appendChild(td);
        }
      }
      fragment.appendChild(tr);
    }
  }
  if (!fragment.childElementCount) {
    tableBody.innerHTML = `<p class="error">Please enter a valid ${activeBtn.id} name </p>`;
    return;
  }
  tableBody.append(fragment);
  // console.log("its isro-center");
}

  cityBtn.addEventListener("click", activate);
  stateBtn.addEventListener("click", activate);
  centerBtn.addEventListener("click", activate);

  input.addEventListener("keypress", function (event) {
    if(event.key === "Enter"){
      console.log("raeachesd here");
      searchData(centersData);
    }
  });

  function main(){
    getIsroData();
  }

window.addEventListener('DOMContentLoaded',main);


