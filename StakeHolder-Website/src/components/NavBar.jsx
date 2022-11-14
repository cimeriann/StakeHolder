import React from "react";
import { Button, Navbar } from "react-bootstrap";

export function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">StakeHolder</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content=end">
        <Navbar.Text>
          <Button
            style={{ display: props.showButton }}
            variant="success"
            onClick={async () => {
              props.login();
            }}
          >
            Connect to Metamask
          </Button>
          <div
            style={{ display: props.showButton === "none" ? "block" : "none" }}
          ></div>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
