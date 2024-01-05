import { makeAnEl } from "../../utils/dom-create.js";
import { renderLogin } from "./render-login.js";
import { renderRego } from "./render-rego.js";
// import { whichPageToShow,page } from "./functions/Functions.js";

// to render the home page
export function renderHome() {
  const main = document.getElementById("main");
  // temporariiy removing search-boxes (sorry Danny)
  main.innerHTML = "";
  const heroDiv = makeAnEl('div')
  heroDiv.style.display = 'flex'
  heroDiv.style.justifyContent = 'center'
  main.appendChild(heroDiv)

  const homeLogo = document.createElement("img");
  homeLogo.src = "./img/gclogo.png";
  // setting logo
  homeLogo.setAttribute("id", "home-logo");
  homeLogo.style.textAlign = "center"
  heroDiv.appendChild(homeLogo);
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    const resp = await axios
      .get("/api/session")
      .then((result) => {
        if (!result.data.success) {
          // No this user is not logged in
          const login = document.createElement("h4");
          login.textContent = "Login";
          login.setAttribute("id", "login");
          login.classList.add("home-login-signup");
          const signUp = document.createElement("h4");
          signUp.textContent = "Sign Up";
          signUp.setAttribute("id", "sign-up");
          signUp.classList.add("home-login-signup");
          loginContainer.appendChild(login);
          login.addEventListener("click", () => {
            renderLogin();
          });
          loginContainer.appendChild(signUp);
          signUp.addEventListener("click", () => {
            renderRego();
          });
        } else {
          // YES the user is logged in
          console.log("HERE ARE THE RESPONSE FROM TEH SERVER AFTER REGISTRATION", result); //TODO: delete console log
          document.cookie = `gitHubName=${result.data.githubname}`;
          document.cookie = `email=${result.data.email}`;
          document.cookie = `email=${result.data.gitConnectId}`;
          whichPageToShow(page.FirstTimeRegistration, result.data.githubname);
        }
      })
      .catch((error) => {
        console.log(error); //TODO: delete console log
      });

    // setting main name
  };

  sendingrequest();
}

export function logOut() {
    axios.delete("/api/session").then(() => {
      window.location = "/";
    });
  }
