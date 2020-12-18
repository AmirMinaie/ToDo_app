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
import { borders } from '@material-ui/system';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import { ShowNotify, Loding_data, Delete_ToDo, notify_Type, To_do_Parent } from '../../../../Redux/actions'
import { AlertDialog, CuProgres } from '../../../Utils'
import axios from 'axios'


function Row(props) {
  const { row, classes } = props;
  const [open, setOpen] = React.useState(false);

  const onClickDelete = (id) => {
    console.log("onclickDelete", id)
    props.DeleteRow(id)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.tableRowSecend}>
        <TableCell align="left">{row.data.title}</TableCell>
        <TableCell align="left">{row.data.dateCreate}</TableCell>
        <TableCell component="th" scope="row">
          {/*todo {sum()} */}
        </TableCell>
        <TableCell align="center">
          <CuProgres value={row.persnge} size={35} color='inherit' />
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
                  {(row.childeData !== undefined && row.childeData.length > 0) ? row.childeData.map((historyRow) => (
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

class CuTable extends Component {

  state = {
    openDialogConferm: false,
  }

  componentDidMount() {
    axios.get('todo.json')
      .then((res) => {
        console.log(res.data)
        var data = Object.entries(res.data)
          .map(([key, value]) => { return { id: key, data: value } });
        this.props.dispatch(Loding_data(data))
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        this.props.dispatch(ShowNotify(notify_Type.Error, "خطا در برقراری ارتباط با سرور"));
      });
  }

  DeleteRowId = -1;

  DeleteRow = (id) => {
    this.setState({ ...this.state, openDialogConferm: true })
    this.DeleteRowId = id;
  }

  rezalteDialog = (rezalte) => {
    switch (rezalte) {
      case "Agree":
        console.log("props Table", this.props)
        this.props.dispatch(Delete_ToDo(this.DeleteRowId))
        this.DeleteRowId = -1;
        this.setState(() => {
          return {
            openDialogConferm: false
          }
        })

        break
      case "Disagree":
        this.DeleteRowId = -1;
        this.setState(() => {
          return {
            openDialogConferm: false
          }
        })
        break

    }
  }

  render() {
    const { classes } = this.props;
    let rowsTable;
    rowsTable = this.props.Todos.map((row) => (<Row classes={classes} key={row.id} DeleteRow={this.DeleteRow.bind(this)} row={row} />));

    return (
      <>
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
                <TableCell align="left" >عنوان</TableCell>
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
        <AlertDialog open={this.state.openDialogConferm} dialogRezalte={this.rezalteDialog.bind(this)} />
      </>
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

export default connect(statmaptoprps)(withStyles(style)(CuTable));