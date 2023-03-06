import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core"
import { differenceInCalendarDays } from "date-fns";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        border: "1px solid #F0EEED",
        cursor: "pointer",
        transition: '.3s',
        "&:hover": {
            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
            borderLeft: "6px solid #3C84AB",
        }
    },
    companyName: {
        fontSize: "13.5px",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        cursor: "pointer",
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    },
}));

export default (props) => {

    const classes = useStyles();

    return (
    <Box p={2} className={classes.wrapper}>
        <Grid container alignItems="center">

            <Grid item xs>
                <Typography variant="subtitle1">{props.title}</Typography>
                <Typography className={classes.companyName} variant="subtitle1">{props.companyName}</Typography>                
            </Grid>

            <Grid item container xs>
                {props.skills.map((skill) => (
                    <Grid className={classes.skillChip} key={skill} item>{skill}</Grid>
                ))}
            </Grid>
                
            <Grid item container direction="column" alignItems="flex-end" xs>
                <Grid item>
                {/* differenceInCalendarDays(Date.now(), props.deadline.) */}
                {/* props.deadline.toLocaleDateString() */}
                    <Typography variant="caption">{props.deadline.toLocaleDateString("es-CL")} | {`${props.type}`} | {`${props.location}`}</Typography>
                </Grid>
                <Grid item>
                    <Box mt={2}>
                        <Button variant="outlined">Detail</Button>
                    </Box>
                </Grid>
            </Grid>

        </Grid>
    </Box>
    );
};