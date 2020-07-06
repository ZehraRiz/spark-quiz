import React, { useState } from "react";
import { modalRootStyles } from "../../style/modalStyles";
import CustomSnackbar from "../../components/mui/Snackbar";
import { Grid, Typography, Divider, Button, TextField } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import V from "max-validator";
import { contactValidation } from "../../utils/validation";

const ContactInfoModal = ({ contact, handleSubmit, setSelectedContact, handleDeleteContact, closeModal }) => {
	const [ validationError, setValidationError ] = useState("");
	const rootClasses = modalRootStyles();

	const internalSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value
		const name=  e.target.name.value
		setValidationError("")
		const result = V.validate({email, name }, contactValidation);
			if (result.hasError) {
				if (result.isError('name')){
					setValidationError(result.getError("name"))
					return;
				} else setValidationError(result.getError("email"))
				
		}
		else handleSubmit(name, email)
	}

	return (
		<div className={rootClasses.root}>
			{validationError !== "" && (
				<CustomSnackbar severity="error" message={validationError} handleClose={() => setValidationError("")} />
			)}

			<form onSubmit={internalSubmit}>
				<Grid container spacing={3} justify="center" alignItems="flex-start">
					<Grid item xs={12}>
						<Typography variant="h5" color="secondary" style={{ textAlign: "center" }}>
							{contact.name}'s Information
						</Typography>
						<Divider variant="middle" />
					</Grid>
          <Grid item xs={12} md={6}>
            <Typography>Name: </Typography>
					</Grid>
          <Grid item xs={12} md={6}>
            <TextField variant="outlined"  type="text" id="name" name="name" defaultValue={contact ? contact.name : ""}/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography>Email: </Typography>
					</Grid>
          <Grid item xs={12} md={6}>
            <TextField variant="outlined" id="email" name="email" defaultValue={contact.email}/>
					</Grid>
					<Grid item xs={12} md={4}>
            <Button type="submit" variant="contained"
              color="secondary" startIcon={<SaveIcon />}>Save</Button>
					</Grid>

					<Grid item xs={12} md={4}>
						<Button
							onClick={() => {
								closeModal();
              }}
              variant="contained"
              color="secondary" startIcon={<CloseIcon />}>
							Cancel
						</Button>
					</Grid>
					<Grid item xs={12} md={4}>
						<Button onClick={handleDeleteContact}variant="contained"
              color="secondary" startIcon={<DeleteOutlineIcon />}>
							Delete Contact
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default ContactInfoModal;
