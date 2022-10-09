/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon,
  Trash as TrashIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';

const tabs = [
  // {
  //   value: 'all',
  //   label: 'All Students'
  // },
  // {
  //   value: 'acceptsMarketing',
  //   label: 'Add New Student'
  // },
  // {
  //   value: 'isProspect',
  //   label: 'Prospect'
  // },
  // {
  //   value: 'isReturning',
  //   label: 'Returning'
  // }
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)'
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)'
  }
];

function applyFilters(customers, query, filters) {
  return customers.filter((customer) => {
    let matches = true;

    if (query) {
      const properties = ['category', 'name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && customer[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(customers, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      isProspect: null,
      isReturning: null,
      acceptsMarketing: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setSelectedCustomers([]);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? customers.map((customer) => customer._id)
      : []);
  };

  const handleSelectOneCustomer = (event, _id) => {
    console.log(_id);
    if (!selectedCustomers.includes(_id)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, _id]);

    } else {
      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== _id));

    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const deleteStudent = (student) => {
    fetch(`http://ec2-3-91-144-53.compute-1.amazonaws.com:3000/api/delete/${student}`, { method: 'DELETE' })
      .then(() => console.log('Delete successful'))
      .then(() => {
        window.location.reload(false);
      });

  }



  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, query, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);
  const enableBulkOperations = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;


  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('')
  const [studentObject, setStudentObject] = React.useState({});
  const [status, setStatus] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = ({ id, category, name, qualificationCode, description, l4modules, l5modules, l7modules, qualificationLevel, isDelete }) => {
    setOpen(true);
    setDeleteId(id);
    setStudentObject({
      // student: studentId,
      // name: name,
      // email: email,
      // description: description,
      // course: course,
      // issuedDate: issuedDate,
      // expireDate: expireDate,
      // isDelete: isDelete,


      category: category,
      name: name,
      qualificationCode: qualificationCode,
      description: description,
      l4modules: l4modules,
      l5modules: l5modules,
      l7modules: l7modules,
      qualificationLevel: qualificationLevel,
      isDelete: isDelete
    })
    console.log('studenttt' + JSON.stringify(customers));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendStudentTrash = () => {
    try {
      fetch(`http://localhost:3000/api/qualifications/update/${deleteId}`, {  // Enter your IP address here

        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(studentObject) // body data type must match "Content-Type" header   

      })
      setStatus({ success: true });
      enqueueSnackbar('Qualification moved to the trash', {
        variant: 'error'
      });
      window.location.reload(false);
    }
    catch (err) {
      setErrors({ submit: err.message });
      setStatus({ success: false });
    }

  }

  return (
    <>
      {customers.length === 0 ? <Alert severity="info">There are no qualifications in the list. Please add a new qualification.</Alert>
        :
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
              />
            ))}
          </Tabs>
          <Divider />
          <Box
            p={2}
            minHeight={56}
            display="flex"
            alignItems="center"
          >
            <TextField
              className={classes.queryField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              onChange={handleQueryChange}
              placeholder="Search qualification"
              value={query}
              variant="outlined"
            />
            <Box flexGrow={1} />
            {/* <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField> */}
          </Box>
          {enableBulkOperations && (
            <div className={classes.bulkOperations}>
              <div className={classes.bulkActions}>
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
                <Button
                  variant="outlined"
                  className={classes.bulkAction}

                >
                  Delete
                </Button>
                {/* <Button
                  variant="outlined"
                  className={classes.bulkAction}
                >
                  Edit
                </Button> */}
              </div>
            </div>
          )}
          <PerfectScrollbar>
            <Box minWidth={700}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAllCustomers}
                        indeterminate={selectedSomeCustomers}
                        onChange={handleSelectAllCustomers}
                      />
                    </TableCell>
                    <TableCell>
                      Qualification
                    </TableCell>
                    <TableCell>
                      Level
                    </TableCell>
                    <TableCell>
                      Code/s
                    </TableCell>

                    <TableCell align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCustomers.map((customer) => {
                    const isCustomerSelected = selectedCustomers.includes(customer._id);

                    return (
                      <TableRow
                        hover
                        key={customer.id}
                        selected={isCustomerSelected}
                        style={{ display: customer.isDelete === true ? 'none' : '' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isCustomerSelected}
                            onChange={(event) => handleSelectOneCustomer(event, customer._id)}
                            value={isCustomerSelected}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            display="flex"
                            alignItems="center"
                          >
                            {/* <Avatar
                          className={classes.avatar}
                          src={customer.avatar}
                        >
                          {getInitials(customer.name)}
                        </Avatar> */}
                            <div>
                              {/* <Link
                              color="inherit"
                              component={RouterLink}
                              to="/app/management/students/1"
                              variant="h6"
                            > */}
                              <span style={{ fontWeight: 'bold' }}>{customer.name}</span>

                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >
                                {customer.category}
                              </Typography>
                            </div>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {customer.qualificationLevel}
                        </TableCell>
                        <TableCell>

                          {customer.qualificationCode.map((code, index) => (
                            <>
                              <span>{code.code}</span>
                              <span style={{ display: customer.qualificationCode.length - 1 == index && 'none', fontWeight: 'bold' }}>  |  </span>
                            </>
                          ))}

                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            component={RouterLink}
                            to={{
                              pathname: "/app/management/qualifications/edit",
                              state: {
                                id: customer._id,
                                category: customer.category,
                                name: customer.name,
                                qualificationCode: customer.qualificationCode,
                                description: customer.description,
                                l4modules: customer.l4modules,
                                l5modules: customer.l5modules,
                                l7modules: customer.l7modules,
                                qualificationLevel: customer.qualificationLevel,
                                isDelete: customer.isDelete,

                              }
                            }}
                          // to={"/app/management/students/edit"}
                          >
                            <SvgIcon fontSize="small">
                              <EditIcon />
                            </SvgIcon>
                          </IconButton>
                          <IconButton
                            // component={RouterLink}
                            // to="/app/management/students/1"
                            onClick={(() => {
                              handleClickOpen(
                                {
                                  id: customer._id,
                                  category: customer.category,
                                  name: customer.name,
                                  qualificationCode: customer.qualificationCode,
                                  description: customer.description,
                                  l4modules: customer.l4modules,
                                  l5modules: customer.l5modules,
                                  l7modules: customer.l7modules,
                                  qualificationLevel: customer.qualificationLevel,
                                  isDelete: true
                                })
                            })}
                          >
                            <SvgIcon fontSize="small">
                              <TrashIcon />
                            </SvgIcon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={filteredCustomers.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Student"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to move this item to the trash?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(() => { sendStudentTrash() })} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};

Results.defaultProps = {
  customers: []
};

export default Results;
