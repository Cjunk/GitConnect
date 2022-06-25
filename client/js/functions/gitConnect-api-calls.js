//  CONSTANTS
const API_END = `/api/users/myrepos`;

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

