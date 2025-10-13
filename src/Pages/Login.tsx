import { Input } from "../Components/Input/Input";
import { Text } from "../Components/Text/Text";
import { Button } from "../Components/Button/Button";

export const Login = () => {
  return (
    <div>
      <div>
        <Text variant="h2">Login</Text>

        <Input type="email" label="Email:" name="email" placeholder="Enter email"/>
        <Input type="password" label="Password:" name="password" placeholder="Enter password" />

        <Input type="checkbox" label="Show Password" />

        <Button>Login</Button>

        <a href="#">Forgot password</a>
      </div>
    </div>
  );
};
