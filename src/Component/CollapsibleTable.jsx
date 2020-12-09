import React, { useEffect, Component } from 'react';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CircularProgressWithLabel from './Progres';
import { borders } from '@material-ui/system';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import {Delete_ToDo} from './../Redux/actions'



function Row(props) {
  const { row, classes } = props;
  const [open, setOpen] = React.useState(false);
  console.log("[Row]", props);
  const onClickDelete = (id) => {
    console.log("onclockDelete", id)
    props.dispatch(Delete_ToDo(id))
  }
  return (
    <React.Fragment>
      <TableRow className={classes.tableRowSecend}>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="left">{row.dateCreate}</TableCell>
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <TableCell align="center">
          <CircularProgressWithLabel value={row.persnge} size={35} color='inherit' />
        </TableCell>
        <TableCell size="small" align='right'><IconButton onClick={() => { onClickDelete(row.id) }}><DeleteIcon /></IconButton></TableCell>

        <TableCell size="small" align="right">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">

              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead className={classes.HeaderSecend}>
                  <TableRow className={classes.whiteColor}>
                    <TableCell>عنوان</TableCell>
                    <TableCell>تاریخ ایجاد</TableCell>
                    <TableCell align="left">مدت زمان</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.childeData != undefined && row.childeData.length > 0) ? row.childeData.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.title}
                      </TableCell>
                      <TableCell>{historyRow.dateCreate}</TableCell>
                      <TableCell align="left">{historyRow.timEstimate}</TableCell>
                      <TableCell><IconButton><DoneAllRoundedIcon align="center" style={historyRow.done ? { fill: 'blue' } : {}} /></IconButton></TableCell>
                    </TableRow>
                  )) : ""}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment >
  );
}

class CollapsibleTable extends Component {
  constructor(props) {
    super(props);
    console.log("[Table] constractore", props);
  }

  render() {
    const { classes } = this.props;

    let rowsTable;
    // try {
    console.log("render Table", this.props.Todos);
    rowsTable = this.props.Todos.map((row) => (<Row classes={classes} key={row.id} dispatch={this.props.dispatch} row={row} />));

    // }
    // catch (e) {
    // rowsTable = <Row classes={classes} key={0} row={createData("", "", "",)} />;
    // }
    console.log('rowTable', rowsTable);
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <colgroup>
            <col style={{ width: '50%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '2%' }} />
            <col style={{ width: '2%' }} />
            <col style={{ width: '2%' }} />
            <col style={{ width: '2%' }} />
          </colgroup>
          <TableHead className={classes.headFrist}>
            <TableRow className={classes.tableRowFrist}>
              <TableCell align="left" hideSortIcon='true' >عنوان</TableCell>
              <TableCell align="left">تاریخ ایجاد</TableCell>
              <TableCell align="left">مدت زمان</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell size="small" />
              <TableCell size="small" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsTable}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
const style = theme => ({
  headFrist: {
    backgroundColor: "#66BB6A",

  },
  HeaderSecend: {
    backgroundColor: "#7986CB"
  }
  ,
  tableRowFrist:
  {
    '& > *': {
      color: 'white',
      fontSize: "18pt"
    }
  },
  tableRowSecend: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  whiteColor: {
    '& > *': { color: 'white' }
  }
})

const statmaptoprps = state => {
  return {
    Todos: state.Todos
  }
}

export default connect(statmaptoprps)(withStyles(style)(CollapsibleTable));