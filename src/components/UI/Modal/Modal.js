import * as React from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Header from '../../Header';
import Visible from '../../utils/Visible';
import { APP } from '../../../constants/constants';
import './Modal.scss';

const BasicModal = (props) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const { open, handleClose, title } = props;

  debugger;
  return (
    <div className="UserAppModal">
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Card className="UserAppModal__card">
            {/* <div> */}
            {/* <Fab className="UserAppModal__closeBtn"> */}
            <span className="UserAppModal__closeBtn" onClick={handleClose}>
              <CloseIcon />
            </span>
            {/* </Fab> */}
            {/* </div> */}
            <div className="UserAppModal__heaerContainer">
              <Header classes="UserAppModal__header" headerText={title} />
            </div>
            {/* <Visible when={title}>
            <Header classes="UserAppModal__header" headerText={title} />
          </Visible> */}
            {props.children}
          </Card>
        </div>
      </Modal>
    </div>
  );
};

BasicModal.defaultProps = {
  title: APP,
  open: false,
};

BasicModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default BasicModal;
