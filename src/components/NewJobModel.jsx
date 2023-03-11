import React, { useState } from "react";
import { Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon} from "@material-ui/icons"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

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
    dateSelector: {
        margin: "0px 0px 20px 0px",
    },
}));

const initState = {
    title: "",
    deadline: new Date(),
    type: "Full time",
    companyName: "",
    location: "Remote",
    link: "",
    description: "",
    skills: [],
}

export default (props) => {

    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState(initState);

    const handleChange = e => {
        e.persist();
        setJobDetails(oldState => ({...oldState, [e.target.name]: e.target.value}));
    };
    const handleDateChange = date => {
        setJobDetails(oldState => ({...oldState, deadline: date}));
    };
    const addRemoveSkill = skill => {
        jobDetails.skills.includes(skill)
        // Remove the skill
         ? setJobDetails(oldState => ({
            ...oldState, skills: oldState.skills.filter((s) => s !== skill),
        }))
        // Add the skill
         : setJobDetails(oldState => ({
            ...oldState, skills: oldState.skills.concat(skill)
        }));
    };
    const handleSubmit = async () => {
        setLoading(true);
        await props.postJob(jobDetails);
        closeModel();

        // To check if any blank
        // for (const field in jobDetails) {
        //     if (typeof jobDetails[field] == "string" && !jobDetails[field])
        //     return console.log("not validated.")
        // }
        // if (!jobDetails.skills.length) return console.log("not validated")
        // return console.log("Validated.")

    };
    const closeModel = () => {
        setJobDetails(initState);
        setLoading(false);
        props.closeModel();
    };

    const classes = useStyles();
    const skills = ["JavaScript","Python", "Java", "Flask", "Django", "Node.js", "React", "Node", "Vue", "MongoDB", "SQL"];

    // console.log(jobDetails);

    return (
        <Dialog open={props.newJobModel} fullWidth>

            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    New position
                    <IconButton onClick={closeModel}> <CloseIcon /> </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="title" value={jobDetails.title} autoComplete="off" placeholder="Job Title *" disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="type" value={jobDetails.type} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyName" value={jobDetails.companyName} autoComplete="off" placeholder="Company Name *" disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="location" value={jobDetails.location} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="On site">On site</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="link" value={jobDetails.link} autoComplete="off" placeholder="Job Link *" disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6} container justifyContent="center" alignItems="center">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                            <Grid>
                                <KeyboardDatePicker onChange={handleDateChange} name="deadline" disableToolbar variant="inline" format="MM-dd-yyyy" label="Deadline *" value={jobDetails.deadline} KeyboardButtonProps={{'aria-label': 'change date',}} />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" value={jobDetails.description} autoComplete="off" placeholder="Job description *" disableUnderline fullWidth multiline rows={4} />
                    </Grid>

                </Grid>

                <Box mt={2}>
                    <Typography>Skill Set</Typography>
                    <Box display="flex" flexWrap="wrap">
                        {skills.map((skill) => (
                            <Box onClick={() => addRemoveSkill(skill)} className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`} key={skill}>{skill}</Box>
                        ))}
                    </Box>
                </Box>

            </DialogContent>

            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">* Required field</Typography>
                    <Button onClick={handleSubmit} variant="contained" disableElevation color="primary" disabled={loading}>
                        {loading ? (<CircularProgress color="secondary" size={22}/>) : ("Post job")}
                    </Button>
                </Box>
            </DialogActions>

        </Dialog>
    )
}