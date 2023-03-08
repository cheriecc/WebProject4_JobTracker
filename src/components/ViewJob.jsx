import React, { useState } from "react";
import { Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons"
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
    info: {
        "& > *": {
            margin: '4px',
        },
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    },
}))



export default (props) => {

    const classes = useStyles();

    return (
    <Dialog open={props.job.length === 0 ? false : true} fullWidth>
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {props.job.title}
                <IconButton onClick={props.closeDisplay}><CloseIcon /></IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Company: </Typography>
                <Typography variant="body2">{`${props.job.companyName}`}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Deadline: </Typography>
                <Typography variant="body2">{props.job.deadline && format(props.job.deadline, 'MMM-dd-yyyy')}</Typography>
            </Box>
            <Box className={classes.info} display="flex">            
                <Typography variant="caption">Job type: </Typography>
                <Typography variant="body2">{ `${props.job.type}`}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Job location: </Typography>
                <Typography variant="body2">{ `${props.job.location}`}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Link: </Typography>
                <Typography variant="body2" component="a" href={props.job.link}>{ `${props.job.link}`}</Typography>
            </Box>
            <Box ml={0.5}>
                <Typography variant="caption">Skills: </Typography>
                <Grid container alignItems="center">
                    { props.job.skills && props.job.skills.map((skill) => (
                        <Grid item className={classes.skillChip} key={skill}>{skill}</Grid>
                    ))}
                </Grid>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Description: </Typography>
                <Typography variant="body2">{ `${props.job.description}`}</Typography>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined">Update</Button>
            <Button variant="outlined">Delete</Button>
        </DialogActions>
    </Dialog>
    )
}