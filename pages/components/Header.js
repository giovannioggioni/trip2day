import { Button, ButtonGroup } from "react-bootstrap";
import { useSession } from "next-auth/client";
import Link from "next/link";

function Header() {
  function showUserName() {
    return session ? session.user.name : "User Name";
  }
  // function showProfilePicture() {
  //   return session ? session.user.image : "profile";
  // }

  const [session, loading] = useSession();
  return (
    <div className="case">
      <br />
      {/* <div className="img-container">
        <img className="img-profile" src={showProfilePicture()} />
      </div> */}
      <br />

      <div className="description-profile">
        <h1 className="profile-name">{showUserName()}</h1>
        <br />
        <p className="myStory">
          Hi guys! Welcome to Trip2Day, the new platform that will allow you to
          create a real travel experience. You can leverage your community of
          friends to get tips directly on your daily planner and share your
          photos. Enjoy your trip!
        </p>
      </div>

      <br />

      <div className="buttonPosition">
        <Link href="./SearchLocation">
          <button className="button-to-trip">
            <a className="button-text"> Plan your next trip </a>
          </button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <div className="text-center">
        <ButtonGroup aria-label="Basic example">
          <Link href="./TravelBook">
            <Button variant="secondary">My Travel Book</Button>
          </Link>

          <Link href="./Photos">
            <Button className="button-my-photo" variant="secondary">
              My Photos
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Header;
