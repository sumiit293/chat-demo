import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
 const {open,handleClose,handleSubmit} = props;
 const [disabled,setDisabled] = useState(false);
 const [currentText,setCurrentText] = useState('');

 const onSubmit = async (e)=>{
   e.preventDefault();
  setDisabled(true);
   await handleSubmit(currentText,localStorage.getItem('token'));
  setDisabled(false);
  setCurrentText('');
  handleClose();
 }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
                <div className="create-dialog-div">  
                   <form onSubmit={onSubmit}>
                      <input 
                        type="text"
                        placeholder="Name of Channel"
                        className="form-control"
                        onChange={(e)=>setCurrentText(e.target.value)}
                        value={currentText}
                      />
                      <button 
                        className="btn-primary teal-theme" 
                        disabled={disabled}
                        >
                        CREATE CHANNEL
                      </button>
                      {disabled && <LinearProgress />}
                   </form>
                </div>  
          </div>
        </Fade>
      </Modal>
    </div>
  );
}