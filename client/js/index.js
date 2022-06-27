import { renderNav } from "./components/navbar.js";
import { renderLanding } from "./components/render-landing.js";
import { callSessionAPI } from "./functions/gitConnect-api-calls.js";
callSessionAPI((res) => {
    if (res.data.success) {
        console.log("User is logged in ");
    } else {
        console.log("User is not logged in ");
    }
});
renderNav();
renderLanding();



