import 'date-fns';
import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
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
  makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';

const categories = [
  {
    id: 'level-7-diploma-in-strategic-management-and-leadership',
    name: 'Level 7 Diploma in Strategic Management and Leadership'
  },
  {
    id: 'level-7-diploma-in-educational-management-and-leadership',
    name: 'Level 7 Diploma in Educational Management and Leadership'
  },
  {
    id: 'level-7-diploma-in-international-business-law',
    name: 'Level 7 Diploma in International Business Law'
  },
  {
    id: 'level-7-extended-diploma-in-accounting-finance',
    name: 'Level 7 Diploma in Accounting and Finance'
  },
  {
    id: 'level-7-diploma-in-computing',
    name: 'Level 7 Diploma in Computing'
  },
  {
    id: 'level-7-diploma-in-human-resource-management',
    name: 'Level 7 Diploma in Human Resource Management'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

function ProductCreateForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  function addStudent() {

    // Send data to the backend via POST
    fetch('http://ec2-3-91-144-53.compute-1.amazonaws.com:3000/api/post', {  // Enter your IP address here

      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      //mode: 'no-cors',
      body: JSON.stringify({
        student: "005",
        name: "Uditha Nayanajith",
        email: "uditha@gmail.com",
        description: "The QUALIFI Level 4 & 5 Diploma in Information Technology course is made up of 12 modules and 12 written assignments. On completion of the modules, students will be given access to the assignments. The assignments are approximately 2,000 words each.",
        course: "Level 4 & 5 Diploma in Information Technology",
        issuedDate: "2022/08/12",
        expireDate: "2022/08/13"
      }) // body data type must match "Content-Type" header

    })
    console.log('added')
  }

  const [issuedDate, setIssuedDate] = React.useState(new Date());
  const [expireDate, setExpireDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setIssuedDate(date);
  };
  const handleDateChangeExpire = (date) => {
    setExpireDate(date);
  };

  return (
    <Formik
      initialValues={{
        category: '',
        description: '',
        images: [],
        includesTaxes: false,
        isTaxable: false,
        name: '',
        price: '',
        studentId: '',
        studentEmail: '',
        salePrice: ''
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().max(255),
        description: Yup.string().max(5000),
        images: Yup.array(),
        includesTaxes: Yup.bool().required(),
        isTaxable: Yup.bool().required(),
        name: Yup.string().max(255).required(),
        price: Yup.number().min(0).required(),
        studentId: Yup.string().max(255),
        studentEmail: Yup.string().max(255),
        salePrice: Yup.number().min(0)
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Do api call
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Product Created', {
            variant: 'success'
          });
          history.push('/app/products');
        } catch (err) {
          setErrors({ submit: err.message });
          setStatus({ success: false });
          setSubmitting(false);
        }
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
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Student Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.description}
                      onChange={(value) => setFieldValue('description', value)}
                    />
                  </Paper>
                  {(touched.description && errors.description) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )}
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
              {/* <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          fullWidth
                          helperText={touched.price && errors.price
                            ? errors.price
                            : 'If you have a sale price this will be shown as old price'}
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.salePrice && errors.salePrice)}
                          fullWidth
                          helperText={touched.salePrice && errors.salePrice}
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.salePrice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={values.isTaxable}
                            onChange={handleChange}
                            value={values.isTaxable}
                            name="isTaxable"
                          />
                        )}
                        label="Product is taxable"
                      />
                    </Box>
                    <Box mt={2}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={values.includesTaxes}
                            onChange={handleChange}
                            value={values.includesTaxes}
                            name="includesTaxes"
                          />
                        )}
                        label="Price includes taxes"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box> */}
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                <CardHeader title="Organize" />
                <Divider />
                <CardContent>
                  <Box mt={1}>
                    <TextField
                      error={Boolean(touched.studentId && errors.studentId)}
                      fullWidth
                      helperText={touched.studentId && errors.studentId}
                      label="Student ID"
                      name="studentId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.studentId}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2} mb={2}>
                    <TextField
                      error={Boolean(touched.studentEmail && errors.studentEmail)}
                      fullWidth
                      helperText={touched.studentEmail && errors.studentEmail}
                      label="Student Email"
                      name="studentEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.studentEmail}
                      variant="outlined"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Course"
                    name="category"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.category}
                    variant="outlined"
                  >
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Issued date"
                      value={issuedDate}
                      onChange={handleDateChange}
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
                      value={expireDate}
                      onChange={handleDateChangeExpire}
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
              onClick={() => { addStudent() }}
            >
              Save student
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

ProductCreateForm.propTypes = {
  className: PropTypes.string
};

export default ProductCreateForm;
