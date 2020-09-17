import React, {useState, useEffect} from 'react';
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
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './index.scss';
import {store} from '../../redux/store/store';


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

function Workspace({workspace, client}: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [WorkspaceDeletedId, setWorkspaceDeletedId] = useState(0);
  const [newWorkspace, setNewWorkspace] = useState({
    workspaceName: '',
    client: 0
  });
  useEffect((): any => {
    store.dispatch({type: 'GET_LIST_WORKSPACE'})
    store.dispatch({type: 'GET_LIST_CLIENT'})
  }, []);

  const getWorkspaceDetail = (id: number) => {
    store.dispatch({type: 'GET_LIST_CLIENT',payload: id})
  }

  const deleteWorkspace = (id: number) => {
    setOpen(true);
    setWorkspaceDeletedId(id);
  }

  const handleDeleteWorkspace = () => {
    store.dispatch({type: 'DELETE_WORKSPACE',payload: WorkspaceDeletedId})
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
    store.dispatch({type: 'CREATE_WORKSPACE',payload: newWorkspace})
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
            <span className={classes.titleConfirmDelete}>Are you sure delete workspace?</span>
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
  }
}


export default connect(mapStateToProps, mapActionToProps)(Workspace);