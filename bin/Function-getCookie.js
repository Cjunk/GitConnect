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
    profileImage:1,
    projectImage:2
}
//  Public  functions
export function uploadProfileImage(theFormData){
    __uploadImageToGitConnect(theFormData,uploadType.profileImage)
}
export function uploadProjectImage(theFormData) {
    __uploadImageToGitConnect(theFormData, uploadType.projectImage);
}

//      Private functions
function __uploadImageToGitConnect(theForm,type) {
  // theForm must include the file and the user ID
  // If uploading a repo/project image (type = projectImage) then a repo id is required too
  //  No sync/await required for now.
    const API = "/api/userimages/uploadImage";
    if (type == profileImage){
        API = "/api/userimages/uploadProfileImage";
    }
      axios
        .post("/api/userimages/uploadimage", theForm)
        .then((response) => {
          //   window.location = '/api/projects';
          return true
        })
        .catch((err) => {
          return false
        });
}