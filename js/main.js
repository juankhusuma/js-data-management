import catNameGenerator from "./catlist.js";
import { NetworkError } from "./utils.js";

const selection = document.getElementById("category");
const container = document.getElementById("cats-container");

selection.addEventListener("change", async (e) => {
  const url = `https://api.thecatapi.com/v1/images/search?category_ids=${e.target.value}&api_key=live_X3Ve6rPvnTm0lGEnp1Zr3quzx6ajb97T9hb2cRkelhmKXlpsUliB8OuEwr1aPFzJ&limit=10`;
  const res = await fetch(url);
  if (!res.ok) throw new NetworkError("Failed API Call", res);
  const data = await res.json();

  const nameMap = JSON.parse(localStorage.getItem("catnames-tana0031") || "{}");

  container.textContent = "";

  data.forEach((cat) => {
    const img = document.createElement("img");
    const p = document.createElement("p");
    const div = document.createElement("div");
    img.src = cat.url;
    if (nameMap[cat.id]) {
      p.innerHTML = nameMap[cat.id];
    } else {
      const randName = catNameGenerator();
      nameMap[cat.id] = randName;
      p.innerHTML = randName;
    }
    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
  });

  localStorage.setItem("catnames-tana0031", JSON.stringify(nameMap));
});
