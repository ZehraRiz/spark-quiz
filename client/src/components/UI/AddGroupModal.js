import React, { useState } from "react";
import * as userActions from "../../store/actions/quizzesListActions";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

//MAIN
const AddGroupModal = ({ closeModal, user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [groupName, setGroupName] = useState("");

  //HOOKS

  //HANDLERS
  const handleAddContact = (e) => {
    const selectedContact = JSON.parse(e.target.value);
    if (e.target.checked) {
      setGroupMemberList([...groupMemberList, selectedContact]);
    } else {
      const updatedList = groupMemberList.filter(
        (member) => member._id !== selectedContact._id
      );
      setGroupMemberList(updatedList);
    }
  };

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName === "" || groupMemberList.length === 0) {
      alert("Please add group info and at least one member");
      return;
    }
    const group = {
      name: groupName,
      contacts: groupMemberList,
    };
    dispatch(userActions.addGroup(group));
    closeModal();
  };
  //RETURN
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Make a group
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="standard-basic"
              label="Group Name"
              onChange={handleGroupName}
            />
          </Grid>
          <Grid
            item
            container
            spacing={2}
            xs={12}
            style={{ overflowY: "scroll" }}
          />
          {user &&
            user.contacts &&
            user.contacts.map((contact, index) => (
              <Grid item lg={3} key={index}>
                <label htmlFor={contact.name}>{contact.name}</label>
                <input
                  type="checkbox"
                  name={contact}
                  onChange={handleAddContact}
                  value={JSON.stringify(contact)}
                />
              </Grid>
            ))}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit">Done</Button>
        </Grid>
      </form>
    </div>
  );
};

export default AddGroupModal;
