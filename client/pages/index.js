import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  //   axios
  //     .get("/api/users/current_user")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  console.log(currentUser);
  return currentUser ? <h1>Landing page 2</h1> : <h1>you are not signed in</h1>
};

LandingPage.getInitialProps = async (context) => {
  console.log("in landing")
  const client = buildClient(context);
  const { data } = await client.get('/api/users/current_user');
  return data;

};
export default LandingPage;
