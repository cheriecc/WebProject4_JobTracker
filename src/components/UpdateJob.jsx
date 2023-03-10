import React, { useState }from "react";
import { Box, Grid, Select, MenuItem, FilledInput, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons"

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

    const [loading, setLoading] = useState(false);
    const [updateJobDetails, setUpdateJobDetails] = useState(props.job);

    const handleChange = e => {
        e.persist();
        setUpdateJobDetails(prevJob => ({...prevJob,[e.target.name]: e.target.value}));
    };

    const addRemoveSkill = skill => {
        updateJobDetails.skills.includes(skill)
        // Remove the skill
         ? setUpdateJobDetails(oldState => ({
            ...oldState, skills: oldState.skills.filter((s) => s !== skill),
        }))
        // Add the skill
         : setUpdateJobDetails(oldState => ({
            ...oldState, skills: oldState.skills.concat(skill)
        }));
    };
    const handleUpdate = async () => {
        setLoading(true);
        await props.updateJob(updateJobDetails);
        closeUpdate();
    };
    const closeUpdate = () => {
        setLoading(false);
        props.closeUpdate();
    };

    const classes = useStyles();
    const skills = ["JavaScript","Python", "Java", "Flask", "Django", "Node.js", "React", "Node", "Vue", "MongoDB", "SQL"];

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
                        <FilledInput onChange={handleChange} name="title" autoComplete="off" defaultValue={props.job.title} disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="type" defaultValue={props.job.type} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyName" autoComplete="off" defaultValue={props.job.companyName} disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="location" defaultValue={props.job.location} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="On site">On site</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="link" autoComplete="off" defaultValue={props.job.link} disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="deadline" autoComplete="off" disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" autoComplete="off" defaultValue={props.job.description} disableUnderline fullWidth multiline rows={4} />
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
                    <Button onClick={handleUpdate} variant="contained" disableElevation color="primary" disabled={loading}>
                        {loading ? (<CircularProgress color="secondary" size={22}/>) : ("Update job")}
                    </Button>
                </Box>
            </DialogActions>

        </Dialog>
    )
}