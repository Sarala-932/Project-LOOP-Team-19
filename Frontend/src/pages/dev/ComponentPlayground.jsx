import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useState } from "react";
import Card from "../../components/ui/Card";
import PageTitle from "../../components/common/PageTitle";
import Loader from "../../components/common/Loader";

function ComponentPlayground() {

  const [email, setEmail] = useState("");

  function handleClick() {
    alert("Button Clicked!");
  }

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "400px",
      }}
    >
      <Card>
      <PageTitle title="Button Playground" />
      <Input
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />


      <Button
        variant="primary"
        fullWidth
        onClick={handleClick}
      >
        Login
      </Button>

      <Button
        variant="secondary"
        disabled
      >
        Register
      </Button>

      <Button
        variant="outline"
      >
        Cancel
      </Button>

      <Button
        loading
      >
        Loading
      </Button>
      <Loader />
      
      </Card>
    </div>
  );
}

export default ComponentPlayground; 