import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function AddLapakButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/addlapak");
  }

  return (
    <Button size="sm" variant="dark" onClick={handleClick}>
    Add Lapak
    </Button>
  );
}


export default AddLapakButton;