import PropTypes from 'prop-types';

const Visible = (props) => {
  return props.when ? props.children : null;
};

Visible.defaultProps = {
  when: false,
};

Visible.propTypes = {
  when: PropTypes.bool.isRequired,
};

export default Visible;
