import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useState } from "react";
import Card from "../../components/ui/Card";
import PageTitle from "../../components/common/PageTitle";
import Loader from "../../components/common/Loader";
import Badge from "../../components/ui/Badge";

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
        <PageTitle title="Input Playground" />

        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Card>


      <Card>
        <PageTitle title="Button Playground" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
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
        </div>
      </Card>

      <Card>
        <PageTitle title="Loader Playground" />

        <Loader />
      </Card>

      <Card>
        <PageTitle title="Badge Playground" />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Badge text="Approved" type="success" />
          <Badge text="Pending" type="warning" />
          <Badge text="Rejected" type="danger" />
          <Badge text="Reviewed" type="info" />
        </div>
      </Card>


    </div>
  );
}

export default ComponentPlayground; 