import { Col, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IoPersonCircle } from "react-icons/io5";
import logoutImg from "../../assets/logout.png";
import { handleLogout } from "../utils/logout";
import { useDispatch } from "react-redux";

function UserLogout({ user }) {
  const dispatch = useDispatch();
  const logout = () => {
    handleLogout(dispatch);
  };
  return (
    <Button
      variant="light"
      className="d-inline-flex align-items-center"
      onClick={logout}
    >
      <Image
        roundedCircle
        src={logoutImg}
        width={15}
        height={15}
      />
      <span className="ms-1">{user}</span>
    </Button>
  );
}

export default UserLogout;
