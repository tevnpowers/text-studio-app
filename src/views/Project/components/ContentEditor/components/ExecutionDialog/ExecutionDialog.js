/* eslint-disable react/no-multi-comp */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      cancel={'[class*="MuiDialogContent-root"]'}
      handle="#draggable-dialog-title"
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ExecutionDialog = props => {
  const { datasets, id, onClose, onRun, open, type } = props;

  const classes = useStyles();
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleOutputChange = (event) => {
    setOutput(event.target.value);
  };

  const runModule = (event) => {
    onRun(id, {
      input: input,
      output: output
    })
  }

  return (
    <Dialog
      aria-labelledby="draggable-dialog-title"
      onClose={onClose}
      open={open}
      PaperComponent={PaperComponent}
    >
      <DialogTitle
        id="draggable-dialog-title"
        style={{ cursor: 'move' }}
      >{type} Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Fill out the settings below to run the {type.toLowerCase()} {name}.
        </DialogContentText>
        <form
          className={classes.form}
          noValidate
        >
          <FormControl className={classes.formControl}>
            <InputLabel
              id="input-data-label"
              shrink
            >
              Input
            </InputLabel>
            <Select
              className={classes.selectEmpty}
              displayEmpty
              labelId="input-data-label"
              onChange={handleInputChange}
              value={input}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {datasets.map(data =>
                <MenuItem
                  key={data.id}
                  value={data.id}
                >{data.name}</MenuItem>
              )}
            </Select>
            <FormHelperText>Select input data to process</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel
              id="output-data-label"
              shrink
            >
              Output
            </InputLabel>
            <Select
              className={classes.selectEmpty}
              displayEmpty
              labelId="output-data-label"
              onChange={handleOutputChange}
              value={output}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {datasets.map(data =>
                <MenuItem
                  key={data.id}
                  value={data.id}
                >{data.name}</MenuItem>
              )}
            </Select>
            <FormHelperText>Select location to save output.</FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
        >
            Cancel
        </Button>
        <Button
          color="primary"
          onClick={runModule}
        >
            Run
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ExecutionDialog.propTypes = {
  datasets: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onRun: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};
  
export default ExecutionDialog;