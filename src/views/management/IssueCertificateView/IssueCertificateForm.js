import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes, { element } from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { BASE_URL } from '../../../constants/baseUrl';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  SvgIcon,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import {
  X as XIcon,
  Search as SearchIcon,
  Droplet as DropletIcon
} from 'react-feather';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';
import { values } from 'lodash';



const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  textBox: {
    padding: '15px 12px',
    border: '1px solid rgba(194, 194, 194)',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px',
    '&:hover': {
      cursor: 'pointer',
      border: '1px solid rgba(0, 0, 0)',
    }
  },
  studentList: {
    margin: '10px',
    '&:hover': {
      cursor: 'pointer',
      color: '#5850EC'
    }
  },
  captionText: {
    color: '#546e7a',
    position: 'absolute',
    top: '-9px',
    left: '10px',
    padding: '0px 5px',
    background: 'white'
  },
  arrowIcon: {
    position: 'absolute',
    top: '17px',
    right: '6px'
  },
  moduleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px'
  }
}));

function IssueCertificateForm({ customers, qualifications, className, ...rest }) {

  useEffect(() => {
    let students = [];
    customers.forEach(element => {
      console.log('foreacf' + element.name)
      if (element.isDelete === false) {
        students.push(element.name)
      }

      setStudentNames(students);
    });
  }, [])
  const classes = useStyles();
  const history = useHistory();
  const [studentNames, setStudentNames] = useState([]);
  const [studentNamesOpen, setStudentNamesOpen] = useState(false);
  const [qulificationNameOpen, setQulificationNameOpen] = useState(false);
  const [studentName, setStudentName] = useState('Select a student');
  const [studentId, setStudentId] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [qualification, setQualification] = useState({
    name: 'Select a qualification',
    id: '',
    level4: []
  });

  const [level4Grades, setLevel4Grades] = useState([
    {
      name: '',
      grade: ''
    }
  ])
  const { enqueueSnackbar } = useSnackbar();



  return (
    <Formik
      initialValues={{
        studentName: studentName,
        category: '',
        moduleGrade: '',
        studentId: studentId,
        studentEmail: studentEmail,
        issuedDate: new Date(),
        expireDate: '',
        isDelete: false,
        // salePrice: '',
        // images: [],
        // includesTaxes: false,
        // isTaxable: false,
        //price: '',
      }}
      validationSchema={Yup.object().shape({
        studentName: Yup.string().max(255),
        category: Yup.string().max(255),
        studentId: Yup.string().max(255).nullable(),
        issuedDate: Yup.date().nullable(),
        expireDate: Yup.date().nullable(),
        isDelete: Yup.bool().required(),
        //studentEmail: Yup.string().max(255),
        // salePrice: Yup.number().min(0),
        // images: Yup.array(),
        // includesTaxes: Yup.bool().required(),
        // isTaxable: Yup.bool().required(),
        //price: Yup.number().min(0).required(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        alert(studentId);
        // try {
        //   // Do api call
        //   fetch('http://ec2-3-91-144-53.compute-1.amazonaws.com:3000/api/post', {  // Enter your IP address here

        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        //     body: JSON.stringify({
        //       student: values.studentId,
        //       name: values.name,
        //       email: values.studentEmail,
        //       description: values.description,
        //       course: values.category,
        //       issuedDate: values.issuedDate,
        //       expireDate: values.expireDate,
        //       isDelete: values.isDelete,
        //     }) // body data type must match "Content-Type" header   
        //   })
        //   console.log(JSON.stringify({
        //     student: values.studentId,
        //     name: values.name,
        //     email: values.studentEmail,
        //     description: values.description,
        //     course: values.category,
        //     issuedDate: values.issuedDate,
        //     expireDate: values.expireDate,
        //     isDelete: values.isDelete
        //   }))
        //   setStatus({ success: true });
        //   setSubmitting(false);
        //   enqueueSnackbar('Student Created', {
        //     variant: 'success'
        //   });
        //   history.push('/app/management/students');
        // } catch (err) {
        //   setErrors({ submit: err.message });
        //   setStatus({ success: false });
        //   setSubmitting(false);
        // }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardContent>
                  <div style={{ position: 'relative' }}>

                    <div style={{ position: 'relative' }}>
                      <Typography
                        variant='caption'
                        className={classes.captionText}
                      >
                        Student
                      </Typography>
                      <div className={classes.arrowIcon}>

                        <ArrowDropDownIcon style={{ color: '#6d6c6c', display: studentNamesOpen ? 'none' : 'block' }} />

                      </div>
                      <Typography className={classes.textBox} onClick={() => { setStudentNamesOpen(true) }} >
                        {studentName}
                      </Typography>
                      <IconButton
                        onClick={() => { setStudentNamesOpen(false) }}
                        style={{ position: 'absolute', right: '5px', top: '9px', display: studentNamesOpen ? 'block' : 'none' }}
                      >
                        <SvgIcon style={{ fontSize: '16px' }}>
                          <XIcon />
                        </SvgIcon>
                      </IconButton>
                    </div>
                    <div style={{ display: studentNamesOpen ? 'block' : 'none', background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>

                      <TextField
                        fullWidth
                        placeholder='Search Student'
                        onChange={(e) => setSearchName(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color='#a2a2a2' />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {customers
                        .filter((student) => {
                          return student.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
                        })
                        .map((student, index) => (
                          <Typography key={index} className={classes.studentList} onClick={() => {
                            setStudentName(student.name);
                            setStudentNamesOpen(false);
                            setStudentId(student.student);
                            setStudentEmail(student.email);
                          }
                          }>
                            {student.name}

                          </Typography>
                        ))}


                    </div>
                  </div>
                  <Box mb={3} />

                  {/* Qualification selection */}
                  <div style={{ position: 'relative' }}>

                    <div style={{ position: 'relative' }}>
                      <Typography
                        variant='caption'
                        className={classes.captionText}
                      >
                        Qualification
                      </Typography>
                      <div className={classes.arrowIcon}>

                        <ArrowDropDownIcon style={{ color: '#6d6c6c', display: qulificationNameOpen ? 'none' : 'block' }} />

                      </div>
                      <Typography className={classes.textBox} onClick={() => { setQulificationNameOpen(true) }} >
                        {qualification.name}
                      </Typography>
                      <IconButton
                        onClick={() => { setQulificationNameOpen(false) }}
                        style={{ position: 'absolute', right: '5px', top: '9px', display: qulificationNameOpen ? 'block' : 'none' }}
                      >
                        <SvgIcon style={{ fontSize: '16px' }}>
                          <XIcon />
                        </SvgIcon>
                      </IconButton>
                    </div>
                    <div style={{ display: qulificationNameOpen ? 'block' : 'none', background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>

                      <TextField
                        fullWidth
                        placeholder='Search Student'
                        onChange={(e) => setSearchName(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color='#a2a2a2' />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {qualifications
                        .filter((qulification) => {
                          return qulification.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
                        })
                        .map((qulification, index) => (
                          <Typography key={index} className={classes.studentList} onClick={() => {
                            setQualification({
                              name: qulification.name,
                              id: qulification._id,
                              level4: qulification.l4modules
                            });
                            setQulificationNameOpen(false);
                            console.log(qulification);
                          }
                          }>
                            {qulification.name}

                          </Typography>
                        ))}


                    </div>
                  </div>
                  {/* Qualification selection */}




                  {/* <TextField
                    fullWidth
                    label="Course"
                    name="category"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.category}
                    variant="outlined"
                    onClick={() => { getSelectedQualification(values.category) }}
                  >
                    <option>Select a qualification</option>
                    {qualifications.map((qualification) => (
                      <option
                        key={qualification._id}
                        value={qualification._id}
                      >
                        {qualification.name}
                      </option>
                    ))}
                  </TextField>


                  <Button onClick={() => { console.log(qualificationId) }}>{qualification.name}</Button> */}
                  {(qualification.level4).map((module, index) => (
                    <div key={index} className={classes.moduleRow}>
                      <Typography>{module.name}</Typography>
                      <TextField
                        error={Boolean(touched.moduleGrade && errors.moduleGrade)}
                        helperText={touched.moduleGrade && errors.moduleGrade}
                        placeholder="Enter grade"
                        name="moduleGrade"
                        onBlur={handleBlur}
                        onChange={() => { console.log(module.name) }}
                        value={values.moduleGrade}
                        variant="outlined"

                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Certificate" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box>

            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                <CardHeader title="Other Details" />
                <Divider />
                <CardContent>
                  <Box mt={1}>
                    <TextField
                      error={Boolean(touched.studentId && errors.studentId)}
                      fullWidth
                      helperText={touched.studentId && errors.studentId}
                      //label="Student ID"
                      placeholder="Student Id"
                      name="studentId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={studentId}
                      variant="outlined"
                      disabled
                    />
                  </Box>
                  <Box mt={2} mb={2}>
                    <TextField
                      error={Boolean(touched.studentEmail && errors.studentEmail)}
                      fullWidth
                      helperText={touched.studentEmail && errors.studentEmail}
                      placeholder="Student Email"
                      name="studentEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={studentEmail}
                      variant="outlined"
                      disabled
                    />
                  </Box>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Issued date"
                      value={values.issuedDate}
                      onChange={value => setFieldValue("issuedDate", value)}
                      fullWidth
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />

                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Expire date"
                      value={values.expireDate}
                      onChange={value => setFieldValue("expireDate", value)}
                      fullWidth
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}

                    />

                  </MuiPickersUtilsProvider>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            //onClick={() => { addStudent() }}
            >
              Save student
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

IssueCertificateForm.propTypes = {
  className: PropTypes.string
};

export default IssueCertificateForm;
