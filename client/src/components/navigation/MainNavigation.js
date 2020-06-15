import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Contacts from "../../screens/userScreens/Contacts";
import Groups from "../../screens/userScreens/Groups";
import CreateQuiz from "../../screens/userScreens/CreateQuiz";
import MyQuizzes from "../../screens/userScreens/MyQuizzes";
import Home from "../../screens/authenticationScreens/Home";
import Login from "../../screens/authenticationScreens/Login";
import Register from "../../screens/authenticationScreens/Register";
import * as authActions from "../../store/actions/authActions";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  return isAuthenticated ? (
    <Router>
      <div>
        <nav className="side-drawer">
          <ul>
            <li>
              <Link to="/">My Quizzes</Link>
            </li>
            <li>
              <Link to="/groups">Groups</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li>
              <Link to="/createQuiz">Create quiz</Link>
            </li>
            <li>
              <Link to="/">
                {" "}
                <button
                  onClick={() => {
                    dispatch(authActions.logout());
                  }}
                >
                  SignOut
                </button>
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/createQuiz">
            <CreateQuiz />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Route path="/">
            <MyQuizzes />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />;
        <Route path="/register" component={Register} />;
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default MainNavigation;
