import React, {useState, useEffect} from 'react';
import {getListWorkSpace} from '../../api/workSpace';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import * as actions from "../../redux/actions/workspace";
import { connect } from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Workspace({saveListWorkspace, workspace}:any) {
  const classes = useStyles();
  const [listWorkSpaces, setListWorkSpaces] = useState([]);
  useEffect((): any => {
    // Update the document title using the browser API
    getListWorkSpace()
      .then(
        (res) => {
          saveListWorkspace(res.data);
        }
      )
      .catch();
  }, []);
  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workspace.listWorkspace.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


const mapStateToProps = (state: any) : any => {
  return {
    workspace : state.workspace,
  }
}

const mapActionToProps = (dispatch : any) => {
  return {
    saveListWorkspace : (data : []) => {
      dispatch(actions.saveListWorkspace(data));
    },
  }
}


export default connect(mapStateToProps,mapActionToProps)(Workspace);