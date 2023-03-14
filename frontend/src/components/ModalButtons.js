import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const ModalButtons = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <Button variant="danger">{props.dangerText}</Button>
      <Button variant="success">{props.successText}</Button>
    </div>
  );
};

export default ModalButtons;
