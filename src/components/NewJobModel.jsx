import React from "react";
import { Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton } from "@material-ui/core";
import {Close as CloseIcon} from "@material-ui/icons"

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
}));

export default (props) => {

    const classes = useStyles();

    const skills = ["JavaScript", "Node.js", "React", "Node", "Vue", "MongoDB", "SQL"];

    return (
        <Dialog open={false} fullWidth>

            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    New position
                    <IconButton> <CloseIcon /> </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <FilledInput placeholder="Job Title *" disableUnderline fullWidth></FilledInput>
                    </Grid>

                    <Grid item xs={6}>
                        <Select fullWidth disableUnderline variant="filled" defaultValue="Full time">
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput placeholder="Company Name *" disableUnderline fullWidth></FilledInput>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput placeholder="Company URL *" disableUnderline fullWidth></FilledInput>
                    </Grid>

                    <Grid item xs={6}>
                        <Select fullWidth disableUnderline variant="filled" defaultValue="Job location">
                            <MenuItem value="Job location">Job location</MenuItem>
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="On site">On site</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput placeholder="Job Link *" disableUnderline fullWidth></FilledInput>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput placeholder="Job description *" disableUnderline fullWidth multiline rows={4} />
                    </Grid>
                </Grid>

                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {skills.map((skill) => (
                            <Box className={classes.skillChip} key={skill}>{skill}</Box>
                        ))}
                    </Box>
                </Box>

            </DialogContent>

            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">* Required field</Typography>
                    <Button variant="contained" disableElevation color="primary">Post job</Button>
                </Box>
            </DialogActions>

        </Dialog>
    )
}

