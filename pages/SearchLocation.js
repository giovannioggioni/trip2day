import TopNavbar from "./components/TopNavbar";
import InputLocation from "./components/InputLocation";

import Footer from "./components/Footer";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

function loginCheck() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/");
    }
  }, [session, loading]);
}

function SearchLocation() {
  return (
    <div>
      <div>{loginCheck()}</div>
      <TopNavbar />
      <div className="case">
        <img className="location-logo" src="trip2day_logo.png" width="30%" />

        <div className="background-location">
          <h1 className="src-location-title">Prepare for a new adventure!</h1>
          <div className="location-style">
            <InputLocation />
          </div>

          <br />
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default SearchLocation;
