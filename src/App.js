import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import NewJobModel from "./components/NewJobModel";
import ViewJob from "./components/ViewJob";
import { firestore } from "./firebase/config";
import UpdateJob from "./components/UpdateJob";

const initState = {
  title: "",
  deadline: "",
  type: "Full time",
  companyName: "",
  location: "Remote",
  link: "",
  description: "",
  skills: [],
};

export default () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModel, setNewJobModel] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [displayJob, setDisplayJob] = useState(initState);

  const fetchJobs = async () => {
    setLoading(true);
    setCustomSearch(false);
    const req = await firestore.collection('jobs').get();
    const tempJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, deadline: job.data().deadline.toDate(),}));
    setJobs(tempJobs);
    setLoading(false);
  };
  const fetchJobsCustoms = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore.collection('jobs').where("type", "==", jobSearch.type).where("location", "==", jobSearch.location).get();
    const tempJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, deadline: job.data().deadline.toDate(),}));
    setJobs(tempJobs);
    setLoading(false);
  };
  const postJob = async jobDetails => {
    await firestore.collection("jobs").add(jobDetails);
    fetchJobs();
  };
  const deleteJob = async (id) => {
    setLoading(true);
    try {
      const toDelete = firestore.collection('jobs').doc(id);
      await toDelete.delete();
      console.log('Document successfully deleted');
      setDisplayJob(initState);
      fetchJobs();
    } catch (error) {
    console.error('error removing document');
    }
  };
  const onUpdate = () => {
    setIsUpdate(true);
  }
  const updateJob = async (updateJobDetails) => {
    setLoading(true);
    try{
      const toUpdate = firestore.collection('jobs').doc(updateJobDetails.id);
      await toUpdate.update(updateJobDetails);
      console.log('Document successfully updated');
      setDisplayJob(initState);
      fetchJobs();
    } catch (error) {
      console.log(updateJobDetails);
      console.log('error updating document', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return <ThemeProvider theme={theme}>
    <Header openNewJobModel={() => setNewJobModel(true)} />
    <NewJobModel closeModel={() => setNewJobModel(false)} postJob={postJob} newJobModel={newJobModel} />
    <ViewJob job={displayJob} id={displayJob.id} onDelete={() => {deleteJob(displayJob.id)}} onUpdate={() => onUpdate()} closeDisplay = {() => {setDisplayJob(initState)}}/>
    <UpdateJob open={isUpdate} job={isUpdate ? displayJob : initState} updateJob={updateJob} closeUpdate={() => {setIsUpdate(false)}}/>
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <SearchBar fetchJobsCustoms={fetchJobsCustoms} />

          {loading ? (
            <Box display="flex" justifyContent="center"><CircularProgress /></Box>
          ) : (
            <>
            {customSearch && (
            <Box my={2} display="flex" justifyContent="flex-end">
              <Button onClick={fetchJobs}><CloseIcon size={20}/> Custom search</Button>
            </Box>
            )}
            {jobs.map((job) => (<JobCard open={() => setDisplayJob(job)} key={job.id} {...job} />))}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>;
};
