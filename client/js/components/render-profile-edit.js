import { renderProfile } from './render-profile.js';
import { getCookie } from '../functions/Functions.js';
export function renderProfileEdit(id) {
  axios.get(`api/profiles/profilepage/${id}`).then(result => {
 
    let profile = result.data.user
    let { firstname, lastname, aboutme, portfoliolink, location } = '';
    if (profile.firstname) {
      firstname = profile.firstname;
    }
    if (profile.lastname) {
      lastname = profile.lastname;
    }
    if (profile.aboutme) {
      aboutme = profile.aboutme;
    }
    if (profile.portfoliolink) {
      portfoliolink = profile.portfoliolink;
    }
    if (profile.gitHubLocation) {
      location = profile.gitHubLocation;
    };

    const main = document.getElementById('main');
    main.innerHTML = '';
    
    const results = document.getElementById('results')
    results.innerHTML = "";
    
    main.innerHTML = `
    <div class="container bg-dark text-white px-5 py-5">
      <div class="row">
        <div class="col-md-6 py-4 gx-2 offset-md-3">
            <h3>Update Profile</h3>
            <form action="/" id="edit-profile-form" method="POST">
                <div class="form-group mb-4">
                    <label for="first-name">First Name</label>
                    <input type="text" class="form-control" id="first-name" name="first-name" value="${firstname ? firstname : ''}" placeholder="Enter your first name">
                </div>

                <div class="form-group mb-4">
                    <label for="last-name">Last Name</label>
                    <input type="text" class="form-control" id="last-name" name="last-name" value="${lastname ? lastname : ''}" placeholder="Enter your last name">
                </div>

                <div class="form-group mb-4">
                    <label for="about-me">Intro</label>
                    <textarea type="text" class="form-control" id="about-me" name="about-me" placeholder="Bring in some personality - your brand statement, your strengths, what you like and types of projects you want to work on">${aboutme ? aboutme : ''}</textarea>
                </div>
                <div class="form-group mb-4">
                    <label for="location">Location</label>
                    <input type="text" class="form-control" value="${location ? location : ''}" id="location" name="location" placeholder="Where are you located?">
                </div>
                  <div class="form-group mb-4">
                  <label for="portfolio-link">Personal website link</label>
                  <input type="text" class="form-control" id="portfolio-link" name="portfolio-link" value="${portfoliolink ? portfoliolink : ''}" placeholder="If you have a personal website you can link add it here">
                </div>
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
            </form>
        </div>
    </div>
</div>
    `
    let form = document.getElementById("edit-profile-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const userId = getCookie("gitConnectId");
      const data = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        aboutme: formData.get("about-me"),
        location: formData.get("location"),
        portfoliolink: formData.get("portfolio-link"),
      };
      axios
        .post(`/api/profiles/${id}`, data)
        .then((response) => {
          console.log("render-profile-edit api/profiles",response)
          renderProfile(id)
        })
        .catch((err) => {
          console.log("render-profile-edit api/profiles",err);
          console.log("render-profile-edit api/profiles",err.response.data);
          let errorMessage = err.response.data.message;
          alert(errorMessage);
        });
      // console.log(data);
    }); 
  });
}
