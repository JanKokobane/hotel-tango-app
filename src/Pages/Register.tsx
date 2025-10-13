import { Button } from '../Components/Button/Button';
import { Input } from '../Components/Input/Input';
import { Text } from '../Components/Text/Text';

export const Register = () => {

  return (
  <div>
   <div>

     <Text variant="h2">Register</Text>

     <Text variant='p'>Already have an existing profile? <a href="#">Login</a></Text>

    <Input type="text" label='Name:' name='firstName' placeholder='Name' />
    <Input type="text"  label='Surname:' name='lastName' placeholder='Surname' />
    <Input type="email" label='Email:' name='email' placeholder='Email' />
    <Input type="tel" label='Contact:' name='contact' placeholder='Cell Number' />
    <Input type="password" label='Password:' name='password' placeholder='Password' />
     <Input type="password" label='Confirm Password:' name='conf_password' placeholder='Confirm Password' />
    
    <Button>Register</Button>
    </div>
  </div>
  )
}