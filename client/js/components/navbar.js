import { makeAnEl } from "../../utils/dom-create.js";
import { renderRepoListBs } from "./render-repo-search.js";
import { whichPageToShow, page, logOut } from "../functions/Functions.js";
export function renderNav() {
  const navBar = document.getElementById("navbar");

  // creating a bootstrap container for logo
  const logoContainer = makeAnEl("a", {
    className: "navbar-brand",
    href: "#",
  });

  const logo = makeAnEl("img", {
    src: "./img/gclogo.png",
    className: "img-fluid",
    id: "navbar-logo",
    alt: "Gitconnect logo",
  });

  logoContainer.appendChild(logo);
  navBar.appendChild(logoContainer);
  logo.addEventListener("click", (event) => {
    window.location = "/";
  });

  // const row = makeAnEl('div', [logo])
  const toggleResponsiveDropDown = makeAnEl(
    "button",
    {
      class: "navbar-toggler",
      type: "button",
      data: {
        bsToggle: "collapse",
        bsTarget: "#navbarNavAltMarkup",
      },
    },
    [
      makeAnEl("span", {
        class: "navbar-toggler-icon",
      }),
    ]
  );
  navBar.appendChild(toggleResponsiveDropDown);

  const allNavItemsContainer = makeAnEl("div", {
    className: ["collapse", "navbar-collapse"],
    id: "navbarNavAltMarkup",
  });
  const allNavItems = makeAnEl("div", {
    className: "navbar-nav",
    // id: "navbar-nav"
  });
  allNavItemsContainer.appendChild(allNavItems);
  navBar.appendChild(allNavItemsContainer);

  const sendingrequest = async () => {
    // This is done as we have to wait for the response from the GitConnect server before rendering the page
    // temporary
    const resp = await axios.get("/api/session").then((result) => {
      if (result.data.success) {
        document.cookie = `gitHubName=${result.data.githubname}`;
        document.cookie = `email=${result.data.email}`;
        document.cookie = `email=${result.data.gitConnectId}`;
        const githubName = result.data.githubname;
        const id = result.data.id;
        const editProfileForm = makeAnEl("a", {
          className: "nav-link",
          textContent: "EDIT PROFILE",
          href: "#",
          id: "navbar-edit-profile",
        });
        const editRepoForm = makeAnEl("a", {
          className: "nav-link",
          textContent: "EDIT PROJECT",
          href: "#",
          id: "navbar-edit-repo",
        });
        const addRepoForm = makeAnEl("a", {
          className: "nav-link",
          textContent: "ADD PROJECT",
          href: "#",
          id: "navbar-add-repo",
        });

        const viewProfile = makeAnEl("a", {
          className: "nav-link",
          textContent: "VIEW PROFILE",
          href: "#",
          id: "navbar-view-profile",
        });

        const viewProject = makeAnEl("a", {
          className: "nav-link",
          textContent: "VIEW PROJECT",
          href: "#",
          id: "navbar-view-project",
        });

        const logOutNav = makeAnEl("a", {
          className: ["nav-link", "float-end"],
          textContent: "LOG OUT",
          href: "#",
          id: "navbar-log-out",
        });
        allNavItems.appendChild(editProfileForm);
        allNavItems.appendChild(addRepoForm);
        allNavItems.appendChild(viewProfile);
        allNavItems.appendChild(logOutNav);
        logOutNav.addEventListener("click", () => {
          logOut();
        });
        // doesnt search anything yet
        const searchBar = document.createElement("form");
        searchBar.setAttribute("class", "d-flex");
        searchBar.innerHTML = `            
            <input class="form-control ms-5 me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-light" type="submit">Search</button>
          `;

        // navBar.appendChild(editProfileForm);
        editProfileForm.addEventListener("click", () => {
          weightClear();
          editProfileForm.style.fontWeight = "500";
          whichPageToShow(page.ProfileEdit, "");
        });

        addRepoForm.addEventListener("click", () => {
          weightClear();
          addRepoForm.style.fontWeight = "500";
          renderRepoListBs(githubName, id);
        });

        editRepoForm.addEventListener("click", () => {
          weightClear();
          editRepoForm.style.fontWeight = "500";
          whichPageToShow(page.ProjectEdit, "");
        });
        viewProfile.addEventListener("click", () => {
          weightClear();
          viewProfile.style.fontWeight = "500";
          whichPageToShow(page.Profile, id);
        });
        viewProject.addEventListener("click", () => {
          weightClear();
          viewProject.style.fontWeight = "500";
          whichPageToShow(page.Project, "");
        });
        whichPageToShow(page.Landing, result.data.githubname);
      } else {
        const logInNav = makeAnEl("a", {
          className: "nav-link",
          textContent: "LOG IN",
          href: "#",
          id: "navbar-log-in",
        });
        logInNav.addEventListener("click", () => {
          registerNav.style.fontWeight = "300";
          logInNav.style.fontWeight = "500";
          whichPageToShow(page.Login);
        });
        const registerNav = makeAnEl("a", {
          className: "nav-link",
          textContent: "REGISTER",
          href: "#",
          id: "navbar-register",
        });
        registerNav.addEventListener("click", () => {
          logInNav.style.fontWeight = "300";
          registerNav.style.fontWeight = "500";
          whichPageToShow(page.Rego);
        });
        allNavItems.appendChild(logInNav);
        allNavItems.appendChild(registerNav);
      }
    });
  };
  sendingrequest();
}
// clearing font weight for navbar links
function weightClear() {
  editProfileForm.style.fontWeight = "300";
  editRepoForm.style.fontWeight = "300";
  addRepoForm.style.fontWeight = "300";
  viewProfile.style.fontWeight = "300";
  viewProject.style.fontWeight = "300";
}
