import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Header() {
  const [user, loading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !user) {
      return;
    }
    const q = query(collection(db, "users"), where("email", "==", user.email));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
      });
    });
  }, [loading, user]);

  function handleLogoutClick() {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <>
      {loading ? (
        <></>
      ) : !user ? (
        <>
          <nav className="flex items-center justify-between flex-wrap text-white bg-red-800 p-2">
            <div className="flex items-center flex-shrink-0 mr-6 ml-2">
              <span className="font-semibold text-xl tracking-tight">
                <Link to="/">English Quiz Game</Link>
              </span>
            </div>
            <div className="flex items-center justify-between flex-wrap">
              <a
                className="btn btn-ghost"
                href="https://github.com/SaranshDhage/English-Quiz-Game"
                target="_blank"
                rel="noreferrer"
                content="noopener noreferrer"
              >
                SOURCE CODE
              </a>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="flex items-center justify-between flex-wrap w-screen text-white bg-red-800 p-2">
            <div className="flex items-center flex-shrink-0 mr-6 ml-2">
              <span className="font-semibold text-xl tracking-tight">
                {userDetails.isAdmin ? (
                  "English Quiz Game"
                ) : (
                  <Link to="/">English Quiz Game</Link>
                )}
              </span>
            </div>
            <div className="flex flex-row">
              <div className="flex items-center justify-between flex-wrap mr-4">
                <a
                  className="btn btn-ghost"
                  href="https://github.com/SaranshDhage/English-Quiz-Game"
                  target="_blank"
                  rel="noreferrer"
                  content="noopener noreferrer"
                >
                  SOURCE CODE
                </a>
              </div>
              <div className="flex-none gap-2 dropdown dropdown-end dropdown-hover">
                <button
                  className="btn btn-ghost mr-2"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
