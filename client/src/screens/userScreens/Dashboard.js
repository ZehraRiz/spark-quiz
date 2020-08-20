import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "../../style/dashboardStyles";
import { useTheme } from "@material-ui/core/styles";

import CustomDrawer from "../../components/mui/CustomDrawer";
import UserQuizzesScreen from "./UserQuizzesScreen";
import CreateQuizScreen from "./CreateQuizScreen";
import ContactsScreen from "./ContactsScreen";
import GroupsScreen from "./GroupsScreen";
import MyAccountScreen from "./MyAccountScreen";
import Statistics from "./Statistics";

import * as quizActions from "../../store/actions/quizActions";
import * as authActions from "../../store/actions/authActions";
import * as userActions from "../../store/actions/userActions";

const Dashboard = ({ window, history }, props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  let { path, url } = useRouteMatch();
  const user = useSelector((state) => state.auth.user); //verfies user on each page reload

  const [mobileOpen, setMobileOpen] = useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  //USER VERIFICATION ON RELOADS
  const getUser = async () => {
    await dispatch(authActions.loadUser());
    dispatch(userActions.fetchQuizzes());
  };
  useEffect(() => {
    if (!user) getUser();
  }, []);

  //HANDLERS
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  const handleClearQuizState = () => {
    dispatch(quizActions.clearCurrentQuiz());
  };

  //MAIN
  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbarItems}>
            <div className={classes.navItemsLeft}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5">{user ? user.name : ""}</Typography>
            </div>
            <Button
              color="inherit"
              className={classes.logoutButton}
              onClick={logoutHandler}
              data-testid="logout-button"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden mdUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <CustomDrawer url={url} clearQuizState={handleClearQuizState} />
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <CustomDrawer url={url} clearQuizState={handleClearQuizState} />
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <Switch>
            <Route exact path={`${url}/`} component={UserQuizzesScreen} />
            <Route exact path={`${url}/myquizzes`} component={UserQuizzesScreen} />
            <Route path={`${url}/updatequiz`} component={CreateQuizScreen} />
            <Route path={`${url}/createquiz`} component={CreateQuizScreen} />
            <Route path={`${url}/contacts`} component={ContactsScreen} />
            <Route path={`${url}/groups`} component={GroupsScreen} />
            <Route path={`${url}/myAccount`} component={MyAccountScreen} />
            <Route path={`${url}/statistics`} component={Statistics} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
