//  CONSTANTS
const API_END = `/api/users/myrepos`;
let SessionCalls = 0
let ProjectByRepoId = 0
//  PUBLIC API CALLS
export function getRepoDetailFromGitConnect(githubname) {
  // function to get the users repo details
  const sendingrequest = async () => {
    // Must wait till axios receives a response before processing more code
    // temporary
    return await axios
      .post(API_END)
      .then((result) => {
        return result;
      })
      .catch((err) => {});
  };
  return sendingrequest();
}
export async function callSessionAPI(next) {
  SessionCalls++  
  console.log("callSessionAPI = ", SessionCalls);
  const ret = await axios.get("/api/session").then((result) => {
    return result;
  });
  next(ret);
};
export async function getProjectByRepoID(repoid, next) {
  ProjectByRepoId++;  
  console.log("ProjectByRepoId = ", ProjectByRepoId);
  const ret = await axios.get(`/api/projects/${repoid}`).then((result) => {
      return result;

  });
  next(ret);
};

