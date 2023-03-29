import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ModalButtons = (props) => {
  return (
    <ButtonGroup vertical>
      <Button variant="light">{props.successText}</Button>
      <Button variant="dark">{props.dangerText}</Button>
    </ButtonGroup>
  );
};

export default ModalButtons;
