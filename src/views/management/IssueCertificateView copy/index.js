import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import IssueCertificateForm from './IssueCertificateForm';
import { BASE_URL } from '../../../constants/baseUrl';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function IssueCertificateView() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [qualifications, setQualifications] = useState(null);
  const getStudents = () => {
    fetch(`${BASE_URL}:3000/api/getAll`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCustomers(result);

        },

        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }

      );

  }
  console.log(qualifications + 'ashfkahfakhfkahfk');
  const getQualifications = () => {
    fetch(`${BASE_URL}:3000/api/qualifications/getAll`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setQualifications(result);

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }

  useEffect(() => {
    getStudents();
    getQualifications();

  }, [])

  if (!customers) {
    return null;
  };


  if (!qualifications) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Issue Certificate"
    >
      <Container maxWidth="lg">
        <Header />
        <IssueCertificateForm customers={customers} qualifications={qualifications} />
      </Container>
    </Page>
  );
}

export default IssueCertificateView;
