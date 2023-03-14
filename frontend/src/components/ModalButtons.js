import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const ModalButtons = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <Button variant="success">{props.successText}</Button>
      <Button variant="danger">{props.dangerText}</Button>
    </div>
  );
};

export default ModalButtons;
