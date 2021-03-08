import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingBox from "../components/LoadingBox";

//   await axios
//     .get("/api/devices/lamp")
//     .then((response) => {
//       setIsLoaded(true);
//       setState(response.data.state);
//     })
//     .catch((error) => {
//       setIsLoaded(true);
//       setError(error);
//     });

function MqttScreen() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState(false);

  const [isStatus, setStatus] = useState(true);
  setTimeout(() => {
    setStatus(!isStatus);
  }, 3000);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/devices/lamp");
      setState(response.data.state);
      setIsLoaded(true);
    };

    fetchData();
  }, [isStatus]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <LoadingBox />;
  } else {
    return (
      <div>
        <h1 style={{ textAlign: "center", fontSize: "10rem" }}>
          Stan: {state}
        </h1>
      </div>
    );
  }
}

export default MqttScreen;
