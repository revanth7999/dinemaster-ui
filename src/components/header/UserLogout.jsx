import { Col, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IoPersonCircle } from "react-icons/io5";

function UserLogout({ user }) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id="button-tooltip-2">
          Click to Logout
        </Tooltip>
      }
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          variant="light"
          {...triggerHandler}
          className="d-inline-flex align-items-center"
        >
          <Image
            ref={ref}
            roundedCircle
            src="src/assets/logout.png"
            width={15}
            height={15}
          />
          <span className="ms-1">{user}</span>
        </Button>
      )}
    </OverlayTrigger>
  );
}

export default UserLogout;
