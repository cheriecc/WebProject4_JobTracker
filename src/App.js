import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import NewJobModel from "./components/NewJobModel";
import ViewJob from "./components/ViewJob";
import { db } from "./firebase/config";
import {  collection, query, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore/lite";


const initState = {
  title: "",
  deadline: new Date(),
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
  const [displayJob, setDisplayJob] = useState(initState);

  const fetchJobs = async () => {
    setLoading(true);
    setCustomSearch(false);
    const req = await getDocs(collection(db, 'jobs'));
    const tempJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, deadline: job.data().deadline.toDate(),}));
    setJobs(tempJobs);
    setLoading(false);
  };
  const fetchJobsCustoms = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await query(collection(db, 'jobs')).where("type", "==", jobSearch.type).where("location", "==", jobSearch.location).get();
    const tempJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, deadline: job.data().deadline.toDate(),}));
    setJobs(tempJobs);
    setLoading(false);
  };
  const postJob = async jobDetails => {
    await addDoc(collection(db, "jobs"), jobDetails);
    fetchJobs();
  };
  const deleteJob = async (id) => {
    setLoading(true);
    try {
      const toDelete = deleteDoc(doc(db, 'jobs', id));
      await toDelete.delete();
      console.log('Document successfully deleted');
      setDisplayJob(initState);
      fetchJobs();
    } catch (error) {
    console.error('error removing document');
    }
  };
  const onUpdate = async (id, newJob) => {
    // console.log(id);
    // for (const field in newJob) {
    //   console.log(newJob[field]);
    // }
    setDisplayJob()
    try{
      await updateDoc(doc(db, 'jobs', id), newJob);
      setDisplayJob(initState);
      fetchJobs();
    } catch (error) {
      console.log(newJob);
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
            {jobs.map((job) => (<JobCard open={() => {setDisplayJob(job)}} key={job.id} {...job} />))}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>;
};
