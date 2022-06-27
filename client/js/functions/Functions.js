// import { renderFirstTimeRegistration } from "../components/render-first-time-registration.js";
import { renderRego } from "../components/render-rego.js";
import { renderLogin } from "../components/render-login.js";
import { renderProfileEdit } from "../components/render-profile-edit.js";
import { renderProjectEdit } from "../components/render-project-edit.js";
import { renderLanding } from "../components/render-landing.js";
import { renderProfile } from "../components/render-profile.js";
import { renderProject } from "../components/render-project.js";
let PAGE_SHOWS = 0
export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}
/*
Cloudinary Function for uploading images to the GitConnect server

 Copy and past the below import statement to the top of your code.

 import * as imageUploader from "./Function-cloudinary.js"
 USAGE: place in the button controller.
 Also.....ensure there is a input for the user to select the file  <input type="file" name="upload" multiple="multiple" /><br/>
 SYNTAX: imageUploader.uploadProfileImage(<FORM DATA>)
*/
const uploadType = {
  profileImage: 1,
  projectImage: 2,
};
//  Public  functions
export function uploadProfileImage(theFormData) {
  __uploadImageToGitConnect(theFormData, uploadType.profileImage);
}
export function uploadProjectImage(theFormData) {
  __uploadImageToGitConnect(theFormData, uploadType.projectImage);
}
//      Private functions
function __uploadImageToGitConnect(theForm, type) {
  // theForm must include the file and the user ID
  // If uploading a repo/project image (type = projectImage) then a repo id is required too
  //  No sync/await required for now.
  const API = "/api/userimages/uploadImage";
  if (type == profileImage) {
    API = "/api/userimages/uploadProfileImage";
  }
  axios
    .post("/api/userimages/uploadimage", theForm)
    .then((response) => {
      //   window.location = '/api/projects';
      return true;
    })
    .catch((err) => {
      return false;
    });
}
export const page = {
  FirstTimeRegistration: 1,
  Login: 2,
  ProfileEdit: 3,
  Home: 0,
  Rego: 5,
  ProjectEdit: 6,
  SearchRepos: 7,
  Profile: 8,
  RepoList: 9,
  Project: 10,
};
export function whichPageToShow(thePageToShow, data) {
  console.log("PAGE SHOWS = ",PAGE_SHOWS)
  PAGE_SHOWS++;
  switch (thePageToShow) {
    case page.FirstTimeRegistration:
      renderRego(); // The landing page when the user first registers
      break;
    case page.Rego:
      renderRego();
      break;
    case page.Login:
      renderLogin();
      break;
    case page.ProfileEdit:
      renderProfileEdit();
      break;
    case page.ProjectEdit:
      renderProjectEdit();
      break;
    case page.Landing:
      renderLanding();
      break;
    case page.Profile:
      renderProfile(data);
      break;
    case page.RepoList:
      renderRepoListBs();
      break;
    case page.Project:
      renderProject(data);
      break;

    default:
  }
}
export function logOut() {
  axios.delete("/api/session").then(() => {
    window.location = "/";
  });
}
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

