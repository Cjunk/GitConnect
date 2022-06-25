import { makeAnEl } from "../../utils/dom-create.js";
import { makeAnImg } from "../../utils/dom-create.js";
import { whichPageToShow, page,shuffle } from "../functions/Functions.js";
export function renderLanding() {
  const main = document.getElementById("main");
  const heroDiv = makeAnEl("div");
  const homeLogo = document.createElement("img");
  main.innerHTML = "";

  // temporariiy removing search-boxes (sorry Danny)
  heroDiv.style.display = "flex";
  heroDiv.style.justifyContent = "center";
  main.appendChild(heroDiv);
  // setting logo
  homeLogo.src = "./img/gclogo.png";
  homeLogo.setAttribute("id", "home-logo");
  homeLogo.style.textAlign = "center";
  heroDiv.appendChild(homeLogo);

  // storing cards in results
  const results = document.getElementById("results");
//   const main = document.getElementById("main");
//   main.innerHTML = "";
  whichPageToShow(page.Home,'');
  const cardContainer = makeAnEl(
    "div",
    {
      class: ["container-xxl", "px-1", "py-5"],
      id: "custom-cards",
    },
    [
      makeAnEl("h1", {
        class: ["pb-2", "text-white", "border-bottom"],
        innerText: "GitConnect Projects;",
      }),
    ]
  );
  const cardRow = makeAnEl("div", {
    class: ["row", "row-cols-1", "row-cols-lg-3", "align-items-stretch", "g-4", "py-5"],
  });
  results.appendChild(cardContainer);
  cardContainer.appendChild(cardRow);
  axios
    .get("/api/projects")
    .then((dbRes) => {
      // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

      const randomised = shuffle(dbRes.data);
      // need to limit loop
      randomised.map((user) => {
        // set standard variables from response that we want to utilise
        let repoid = user.repoid;
        let username = user.githubname;
        let projectName = user.projectname;
        let description = user.description;
        let avatar = user.githubavatar;
        let repoName = user.githubreponame;
        let location = user.githublocation;
        let userid = user.userid;
        let projectImageUrl = user.projectimageurl;
        const repoCol = makeAnEl("div", {
          class: ["col-md-3", "col-sm-6"],
        });
        const userCard = makeAnEl("div");
        userCard.addEventListener("click", (event) => {
          // console.log(event.target)
          if (event.target.classList.contains("click-to-profile")) {
            whichPageToShow(page.Profile,userid);
          } else {
            whichPageToShow(page.Project, repoid);
          }
        });
        userCard.innerHTML = `
                    <div class="col">
                        <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg border-0"
                            style="background-size:100% 100%; background-image: url('${
                              projectImageUrl ? projectImageUrl : makeAnImg(600, 350)
                            }'); min-height: 272px; max-height: 320px;">
                            <div id="selected-div-${repoid}" class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1" style="background-color: rgba(0, 0, 0, 0.14);">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${repoName}</h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                    <li id="profile-picture-landing" class="me-auto">
                                        <img src="${avatar}" alt="Bootstrap" width="32" height="32" class="click-to-profile rounded-circle border border-white">
                                    <li class="d-flex align-items-center me-3">
                                        <svg class="bi me-2" width="1em" height="1em">
                                            <use xlink:href="#geo-fill" /></svg>
                                        <small>${location}</small>
                                    </li>
                                    <li id="username-landing" class="d-flex align-items-center">
                                        <svg class="bi me-2" width="1em" height="1em">
                                            <use xlink:href="#calendar3" /></svg>
                                        <small class="click-to-profile">/${username}</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                       `;
        cardRow.appendChild(userCard);
        const selectedDiv = document.getElementById(`selected-div-${repoid}`);
        selectedDiv.addEventListener("mouseover", (target) => {
          selectedDiv.style.backgroundColor = "rgba(0,0,0,0)";
        });
        selectedDiv.addEventListener("mouseout", (target) => {
          selectedDiv.style.backgroundColor = "rgba(0,0,0,0.14)";
        });
      });
    })
    .catch((err) => {
      console.log("render-landing error = ", err);
    });
}

    