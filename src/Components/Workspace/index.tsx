import React, {useState, useEffect} from 'react';
import {deleteWorkspaceApi, getListWorkSpace, workSpaceDetail, createWorkspaceApi} from '../../api/workSpace';
import {getListClient} from '../../api/client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {makeStyles} from '@material-ui/core/styles';
import * as actions from "../../redux/actions/workspace";
import * as clientActions from "../../redux/actions/client";
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import {connect} from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: '50'
  },
  titleConfirmDelete: {
    color: 'red',
  },
});

function Workspace({saveListWorkspace, selectedWorkspace, saveListClient, workspace, client}: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [workspaceSelected, setWorkspaceSelected] = React.useState(0);
  const [newWorkspace, setNewWorkspace] = React.useState({
    workspaceName: '',
    client: 0
  });
  useEffect((): any => {
    // Update the document title using the browser API
    getListWorkSpace()
      .then(
        (res) => {
          saveListWorkspace(res.data);
        }
      )
      .catch();
    getListClient()
      .then(
        (res) => {
          saveListClient(res.data);
        }
      )
      .catch();
  }, []);

  const getWorkspaceDetail = (id: number) => {
    workSpaceDetail(id)
      .then(
        (res) => {
          selectedWorkspace(res.data);
        }
      ).catch();
  }

  const deleteWorkspace = (id: number) => {
    setOpen(true);
    setWorkspaceSelected(id);
  }

  const handleDeleteWorkspace = () => {
    deleteWorkspaceApi(workspaceSelected)
      .then(
        (res) => {
          selectedWorkspace(res.data);
          getListWorkSpace()
            .then(
              (res) => {
                saveListWorkspace(res.data);
              }
            )
            .catch();
        }
      ).catch();
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const toggleDrawer = (isOpen: any) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    setOpenDrawer(isOpen);
    return;
  }

  const handleChangeSelect = (event: any) => {
    const {name, value} = event.target;
    setNewWorkspace({
      ...newWorkspace,
      [name]: value,
    });
  }

  const CreateWorkspace = () => {
    createWorkspaceApi({
      name: newWorkspace.workspaceName,
      clientId: newWorkspace.client,
    })
      .then(
        (res) => {
          selectedWorkspace(res.data);
          getListWorkSpace()
            .then(
              (res) => {
                saveListWorkspace(res.data);
              }
            )
            .catch();
        }
      ).catch();
    setOpenDrawer(false);
  }
  return (
    <Container maxWidth="lg">
      <Button variant="contained" className="button-create" onClick={() => setOpenDrawer(true)}>
        Create
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3 className={classes.titleConfirmDelete}>Are you sure delete workspace?</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteWorkspace} color="primary">
            yes
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <Container>
          <form className="form-create" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="workspaceName"
                  value={newWorkspace.workspaceName}
                  onChange={handleChangeSelect}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-controlled-open-select-label">Client</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    fullWidth
                    open={openSelect}
                    name="client"
                    onClose={() => setOpenSelect(false)}
                    onOpen={() => setOpenSelect(true)}
                    value={newWorkspace.client}
                    onChange={handleChangeSelect}
                  >
                    {client.allClient.map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className="button-create-workspace"
              onClick={CreateWorkspace}
            >
              Create
            </Button>
          </form>
        </Container>
      </Drawer>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workspace.listWorkspace.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => getWorkspaceDetail(row.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteWorkspace(row.id)}
                  >Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


const mapStateToProps = (state: any): any => {
  return {
    workspace: state.workspace,
    client: state.client,
  }
}

const mapActionToProps = (dispatch: any) => {
  return {
    saveListWorkspace: (data: []) => {
      dispatch(actions.saveListWorkspace(data));
    },
    selectedWorkspace: (data: {}) => {
      dispatch(actions.selectWorkspace(data));
    },
    saveListClient: (data: []) => {
      dispatch(clientActions.saveListClients(data));
    }
  }
}


export default connect(mapStateToProps, mapActionToProps)(Workspace);