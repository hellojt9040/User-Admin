import * as React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Header from '../../Header';
import { APP } from '../../../constants/constants';
import './Modal.scss';

const BasicModal = (props) => {
  const { open, handleClose, title } = props;

  return (
    <div className="UserAppModal">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Card className="UserAppModal__card">
            <span className="UserAppModal__closeBtn" onClick={handleClose}>
              <CloseIcon />
            </span>
            <div className="UserAppModal__heaerContainer">
              <Header classes="UserAppModal__header" headerText={title} />
            </div>
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
