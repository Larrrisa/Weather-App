import { FiNavigation } from "react-icons/fi";
import { IconContext } from "react-icons";

function Button({ handleClick }) {
  return (
    <IconContext.Provider value={{ size: "20px" }}>
      <div>
        <FiNavigation onClick={handleClick} />
      </div>
    </IconContext.Provider>
  );
}
export default Button;
