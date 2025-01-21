import React, { useState }from "react";
import { Box, Grid, Select, MenuItem, FilledInput, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        cursor: "pointer",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,

        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
        },
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    },
}));

export default (props) => {

    const initJobDetails = {
        title: props.job ? props.job.title : "",
        deadline: props.job ? props.job.deadline: new Date(),
        type: props.job ? props.job.type : "Full time",
        companyName: props.job ? props.job.companyName : "",
        location: props.job ? props.job.location : "Remote",
        link: props.job ? props.job.link : "",
        description: props.job ? props.job.description : "",
        skills: props.job ? props.job.skills : [],
    }


    const [loading, setLoading] = useState(false);
    const [updateJobDetails, setUpdateJobDetails] = useState([]);
//    const [updateJobDetails, setUpdateJobDetails] = useState(initJobDetails);

    // const setOpen = () => {
    //     props.setOpen();
    //     setUpdateJobDetails(() => {
    //         for (const field in props.job) {
    //             updateJobDetails[field] = props.job[field]
    //         }
    //     });
    //     return true;
    // }

    const handleChange = e => {
        e.persist();
        setUpdateJobDetails(prevJob => ({...prevJob,[e.target.name]: e.target.value}));
    };
    const handleDateChange = date => {
        setUpdateJobDetails(oldState => ({...oldState, deadline: date}));
    };
    const addRemoveSkill = skill => {
        updateJobDetails.skills.includes(skill)
        // uncheck the skill
         ? setUpdateJobDetails(oldState => ({
            ...oldState, skills: oldState.skills.filter((s) => s !== skill),
        }))
        // check the skill
         : setUpdateJobDetails(oldState => ({
            ...oldState, skills: oldState.skills.concat(skill)
        }));
    };

    const closeUpdate = () => {
        setLoading(false);
        props.closeUpdate();
    };

    const classes = useStyles();
    const skills = ["JavaScript","Python", "Java", "Flask", "Django", "Node.js", "React", "Node", "Vue", "MongoDB", "SQL"];

    console.log("Update Job");
    console.log(props.job);
    console.log(props.job.deadline);

    return (
        <Dialog open={props.open} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    New position
                    <IconButton onClick={closeUpdate}> <CloseIcon /> </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="title" autoComplete="off" defaultValue={props.job.title} value={updateJobDetails.title} disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="type" displayEmpty value={props.job.type} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyName" autoComplete="off" defaultValue={props.job.companyName} value={updateJobDetails.companyName} disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="location" displayEmpty value={props.job.location} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="On site">On site</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="link" autoComplete="off" defaultValue={props.job.link} value={updateJobDetails.link} disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                            <Grid>
                                <KeyboardDatePicker onChange={handleDateChange} name="deadline" disableToolbar variant="filled" format="MM-dd-yyyy" label="Deadline *" value={props.job.deadline} />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" autoComplete="off" defaultValue={props.job.description} value={updateJobDetails.description} disableUnderline fullWidth multiline rows={4} />
                    </Grid>
                </Grid>

                <Box mt={2}>
                    <Typography>Skill Set</Typography>
                    <Box display="flex" flexWrap="wrap">
                        {skills.map((skill) => (
                            <Box onClick={() => addRemoveSkill(skill)} className={`${classes.skillChip} ${props.job.skills.includes(skill) && classes.included}`} key={skill}>{skill}</Box>
                        ))}
                    </Box>
                </Box>

            </DialogContent>

            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">* Required field</Typography>
                    <Button 
                    onClick={async (e) => {
                        e.preventDefault();
                        console.log("clicked update");
                        for (const field in updateJobDetails) {
                            console.log(updateJobDetails[field]);
                        };
                        console.log(updateJobDetails);
                        await props.updateThisJob(props.id, updateJobDetails);
                        closeUpdate();
                    }}
                    variant="contained" disableElevation color="primary" disabled={loading}>
                        {loading ? (<CircularProgress color="secondary" size={22}/>) : ("Update job")}
                    </Button>
                </Box>
            </DialogActions>

        </Dialog>
    )
}