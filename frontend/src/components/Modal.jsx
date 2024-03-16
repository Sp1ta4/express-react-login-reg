import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiFunctions from '../services/api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ isOpen, handleClose }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { id } = useParams();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </div>
            <button type="submit" className="w-100 btn btn-success" onClick={() => ApiFunctions.changePassword({ password, confirmPassword, id })}>Change</button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}