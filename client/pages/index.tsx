import axios from "axios";

const LandingPage = ({ currentUser }: { currentUser: string }) => {
  console.log("currentUser", currentUser);

  return <div>Landing Page</div>;
};

LandingPage.getInitialProps = async ({ req }: any) => {
  const { data } = await axios.get(
    "http://localhost:3004/api/users/currentuser",
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },

    }
  );
    console.log("data",data);
    
  return data;
};
export default LandingPage;
