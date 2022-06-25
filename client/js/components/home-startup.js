import { makeAnEl } from "../../utils/dom-create.js";
// to render the home page
export function renderHome() {
  const main = document.getElementById("main");
  const heroDiv = makeAnEl('div')
  const homeLogo = document.createElement("img"); 
  main.innerHTML = "";
  
  // temporariiy removing search-boxes (sorry Danny)
  heroDiv.style.display = 'flex'
  heroDiv.style.justifyContent = 'center'
  main.appendChild(heroDiv)
// setting logo
  homeLogo.src = "./img/gclogo.png";
  homeLogo.setAttribute("id", "home-logo");
  homeLogo.style.textAlign = "center"
  heroDiv.appendChild(homeLogo);
}


