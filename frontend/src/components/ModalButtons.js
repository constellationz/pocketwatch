import Button from 'react-bootstrap/Button';

const ModalButtons = (props) => {
  return (
    <div className="d-flex flex-column">
      <Button className="form-button mb-3" id="pocketwatch" onClick={props.successButtonPressed}>{props.successText}</Button>
      <Button variant="danger" id="pocketwatch" onClick={props.dangerButtonPressed}>{props.dangerText}</Button>
    </div>
  );
};

export default ModalButtons;
