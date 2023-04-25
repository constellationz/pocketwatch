import Button from 'react-bootstrap/Button';

const ModalButtons = (props) => {
  return (
    <div className="d-flex flex-column">
      <Button className="form-button" id="pocketwatch">{props.successText}</Button>
      <Button variant="danger" id="pocketwatch">{props.dangerText}</Button>
    </div>
  );
};

export default ModalButtons;
