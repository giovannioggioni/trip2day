import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Button } from "react-bootstrap";
import UploadFile from "../functions/Upload";
import TopNavbar from "../components/TopNavbar";
import moment from "moment";
import Footer from "../components/Footer";
import InputSuggestion from "../components/InputSuggestion";
import Link from "next/link";
import "react-big-calendar/lib/css/react-big-calendar.css";

function loginCheck() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/");
    }
  }, [session, loading]);
}

function Trip() {
  const router = useRouter();
  const { id } = router.query;

  const [location, setLocation] = useState([]);

  const getLocation = async () => {
    try {
      const response = await fetch("http://localhost:3001/location");
      const jsonData = await response.json();
      setLocation(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const localizer = momentLocalizer(moment);

  const [myEventsList, setmyEventsList] = useState([]);
  const [toDoList, setToDoList] = useState([]);

  const getToDoList = async () => {
    try {
      const response = await fetch("http://localhost:3001/tripToDoList");
      const jsonData = await response.json();
      console.log(jsonData);
      const todos = jsonData[jsonData.length - 1].todo
        .slice(2, -2)
        .split('","');
      setToDoList(todos);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getEventsList = async () => {
    try {
      const response = await fetch("http://localhost:3001/tripEventsList");
      const jsonData = await response.json();
      console.log(jsonData[jsonData.length - 1].events);
      const events = jsonData[jsonData.length - 1].events;
      setmyEventsList(events);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEventsList();
    getToDoList();
    getLocation();
  }, []);

  function BigCalendar() {
    return (
      <div className="app">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    );
  }

  function renderToDoList() {
    return (
      <>
        <h3 className="to-do-list">Your To Do List:</h3>
        {toDoList.map((activity, indexActivity) => (
          <ul key={indexActivity}>
            <li>{activity}</li>
          </ul>
        ))}
      </>
    );
  }

  return (
    <>
      <div>{loginCheck()}</div>
      <TopNavbar />

      <div className="case">
        <br />
        <br />
        <div className="create-new-trip-title">
          <h1> Your trip to {id} </h1>
        </div>
        <br />
        <br />
        <br />

        <div className="header-new-trip">
          <div className="to-do-list-container">{renderToDoList()}</div>

          <div className="upload-image-container">
            <h3 className="to-do-list">Upload Image of your trips</h3>
            <UploadFile />
            <br />
            <InputSuggestion />
            <br />
            <Link
              href="/photos/[id]"
              as={`/photos/${location[0] ? location[0].location : ""}`}
            >
              
              <Button>Your photos</Button>
            </Link>
          </div>
        </div>

        <br />
        <br />
        <br />
      </div>
      <BigCalendar />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3001/location`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default Trip;
