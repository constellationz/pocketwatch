// Settings.jsx
// Settings page

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Settings() {
  return (
      <Form>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Username"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="Email" placeholder="Email"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-2" controlId="current-password">
          <Form.Label>Old Password</Form.Label>
          <Form.Control type="password" placeholder="Current Password"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-2" controlId="new-password">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="New Password"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-5" controlId="new-password-confirm">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm New Password"></Form.Control>
        </Form.Group>

        <Button className="mb-5" type="submit" variant="dark">Save Changes</Button>
      </Form>
  );
}

export default Settings;
