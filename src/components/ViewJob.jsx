import React, {useState} from "react";
import { Box, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons"
import { format } from "date-fns";
import UpdateJob from "./UpdateJob";

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

    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);


    const classes = useStyles();

    const handleDelete = async () => {
        setLoading(true);
        await props.onDelete(props.id);
        setLoading(false);
    };

    // console.log("View Jobs");
    // console.log(props.job);

    return (
        <Box>
        <Dialog open={props.job.title === "" ? false : true} fullWidth>
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
                <Button onClick={() => {setIsUpdate(true)}} variant="outlined">Update</Button>
                <Button onClick={() => handleDelete()} disableElevation variant="outlined" disabled={loading}>
                {loading ? (<CircularProgress color="secondary" size={22}/>) : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>

        <UpdateJob open={isUpdate} id={props.id} job={props.job} closeUpdate={() => setIsUpdate(false)} updateThisJob={props.onUpdate}/>
        </Box>
    )
}