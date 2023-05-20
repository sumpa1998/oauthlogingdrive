import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./Login.css";
import useDrivePicker from 'react-google-drive-picker';

const Login = () => {
  let [user, setUser] = useState({});


  const [openPicker] = useDrivePicker()
  const handleOpenPicker = () => {
      openPicker({
        clientId: "1013878646769-3hnhbffnf9b8s81jk1lerocngo8d4pi1.apps.googleusercontent.com",
        developerKey: "AIzaSyBsMhogstxRtR_0A0hgxaRBjKcRvPiy5Bo",
        viewId: "DOCS",
        showUploadView: true,
        showUploadFolders: true,
        token:"ya29.a0AWY7CknZ8pNiSDoPadNsxRtjDPR_hwpgwgdOfRwJXXwDXf4bU3BpLMT8g1oTB9OL6sS0dFDklL6WmV1lQqz5rqhlBeEnczCUJGYBCJaXNJyvb6Kgv252TdE-Q-S0PMFReIVh8Tt335YdIRvI-Ik-QIROX0YZaCgYKAeASARISFQG1tDrp5layUgy6zGaQFb1Db_JUDA0163",
        supportDrives: true,
        multiselect: true,
        callbackFunction: (data) => {
          if (data.action === 'cancel') {
            console.log('User clicked cancel/close button')
          }
          console.log(data)

        },
      })
  }
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    var userobject = jwt_decode(response.credential);
    console.log(userobject);
    setUser(userobject);
    document.getElementById("signInDiv").hidden = true;
    // window.location.href = '/home';
  }

  function handleSignOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1013878646769-3hnhbffnf9b8s81jk1lerocngo8d4pi1.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <div className="login">
      <h1 className="hdr" id="hdr">
        Login using Google
      </h1>
      <div id="signInDiv"></div>
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
      {Object.keys(user).length != 0 && (
        <div>
         <button className="btn1" onClick={() => handleOpenPicker()}>Open Drive</button>
         <button className="btn" onClick={() => handleSignOut()}>
            Sign Out{" "}
          </button>
         </div>
      )}
    

      
    </div>
  );
};

export default Login;
