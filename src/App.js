import React, {useEffect, useState} from "react";
import { Box, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import NewJobModel from "./components/NewJobModel";
import { firestore, app } from "./firebase/config";

export default () => {

  const [jobs, setJobs] = useState([]);
  const [newJobModel, setNewJobModel] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const req = await firestore.collection('jobs').get();
    const tempJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, deadline: job.data().deadline.toDate(),}));
    setJobs(tempJobs);
    setLoading(false);
  };
  const postJob = async jobDetails => {
    await firestore.collection("jobs").add({
      ...jobDetails, deadline: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return <ThemeProvider theme={theme}>
    <Header openNewJobModel={() => setNewJobModel(true)} />
    <NewJobModel closeModel={() => setNewJobModel(false)} postJob={postJob} newJobModel={newJobModel} />
    
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <SearchBar />
          {loading ? (
            <Box display="flex" justifyContent="center"><CircularProgress /></Box>
          ) : (
            jobs.map((job) => (<JobCard key={job.id} {...job} />))
          )}
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>;
};
