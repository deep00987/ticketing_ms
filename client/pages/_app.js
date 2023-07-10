import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";
/*
  context === {req, res} --> PageComponent
  context === {Component, ctx: {req, res}} --> AppComponent
*/

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Component {...pageProps} />
    </div>
  );
};



AppComponent.getInitialProps = async (appContext) => {
  // const appProps = await App.getInitialProps(appContext);
  const client = buildClient(appContext.ctx);
  const {data} = await client.get('/api/users/current_user');
  let pageProps = {};
  if (appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  
  console.log(pageProps);
  
  return {pageProps, currentUser: data.currentUser};
}



export default AppComponent;