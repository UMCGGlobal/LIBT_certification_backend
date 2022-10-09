import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import IssueCertificateForm from './IssueCertificateForm';


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

  useEffect(() => {

    fetch('http://ec2-3-91-144-53.compute-1.amazonaws.com:3000/api/getAll')
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

      )
  }, [])

  if (!customers) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Issue Certificate"
    >
      <Container maxWidth="lg">
        <Header />
        <IssueCertificateForm customers={customers} />
      </Container>
    </Page>
  );
}

export default IssueCertificateView;
