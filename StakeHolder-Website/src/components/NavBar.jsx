import React from "react";
import { Button, Navbar } from "react-bootstrap";

export function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">StakeHolder</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content=end">
        <Navbar.Text>
          <Button>Connect to Metamask</Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
