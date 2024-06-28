import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      Haven't registered yet? <Link to={"/register"}>Join Us!</Link>
    </div>
  );
}
