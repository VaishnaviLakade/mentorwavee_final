import NavBar from "./components/home/NavBar";
import Footer from "./components/home/Footer";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/home/Home";

const LazyABout = React.lazy(() => import("./components/about/About"));
const LazyBlog = React.lazy(() => import("./components/blog/Blog"));
const LazyMyAccount = React.lazy(() =>
  import("./components/account/MyAccount")
);
const LazyMentors = React.lazy(() =>
  import("./components/mentorspage/Mentors")
);

function App() {
  // Redirect to Project B's SignUp page
  const handleLoginClick = () => {
    window.location.href = "http://localhost:3000/"; // Change to deployed URL if needed
  };

  return (
    <>
      <NavBar handleClick={handleLoginClick} />
      <hr />
      <Routes>
        <Route path="/" element={<Home handleClick={handleLoginClick} />} />
        <Route
          path="/about"
          element={
            <React.Suspense
              fallback={
                <div className="ui segment">
                  <div className="ui active loader"></div>
                  <h2>Hang in there..</h2>
                </div>
              }
            >
              <LazyABout />
            </React.Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <React.Suspense
              fallback={
                <div className="ui segment">
                  <div className="ui active loader"></div>
                  <h2>Hang in there..</h2>
                </div>
              }
            >
              <LazyBlog />
            </React.Suspense>
          }
        />
        <Route
          path="/mentors"
          element={
            <React.Suspense
              fallback={
                <div className="ui segment">
                  <div className="ui active loader"></div>
                  <h2>Hang in there..</h2>
                </div>
              }
            >
              <LazyMentors handleLoginClick={handleLoginClick} />
            </React.Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <React.Suspense
              fallback={
                <div className="ui segment">
                  <div className="ui active loader"></div>
                  <h2>Hang in there..</h2>
                </div>
              }
            >
              <LazyMyAccount />
            </React.Suspense>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
