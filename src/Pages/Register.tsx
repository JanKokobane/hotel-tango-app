import { useState } from 'react';
import { Button } from '../Components/Button/Button';
import { Input } from '../Components/Input/Input';
import { Text } from '../Components/Text/Text';
import { Sparkles, User, Mail, Phone, Lock } from 'lucide-react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';


interface RegisterProps {
  onNavigateToLogin: () => void;
}

export const Register = ({ onNavigateToLogin }: RegisterProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const newErrors: { [key: string]: string } = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'contact', 'password', 'conf_password'];

    requiredFields.forEach((field) => {
      const value = data.get(field)?.toString().trim();
      if (!value) newErrors[field] = 'This field is required';
    });

    const password = data.get('password')?.toString();
    const confirm = data.get('conf_password')?.toString();
    if (password && confirm && password !== confirm) {
      newErrors['conf_password'] = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      const payload = Object.fromEntries(data);

      fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(data => {
          console.log('User registered:', data);
          onNavigateToLogin(); // navigate to login after success
        })
        .catch(err => {
          console.error('Registration error:', err);
        });
    }

  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.brandSection}>
          {/* <div className={styles.logoWrapper}>
            <Hotel className={styles.logoIcon} size={48} />
          </div> */}
          <Text variant="h1" className={styles.brandTitle}>Tango Hotel</Text>
          <div className={styles.tagline}>
            <Sparkles size={16} className={styles.sparkleIcon} />
            <span>Luxury Redefined</span>
            <Sparkles size={16} className={styles.sparkleIcon} />
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <Text variant="h2">Create Account</Text>
            <p className={styles.formSubtitle}>Begin your luxury experience</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input type="text" label="First Name" name="firstName" placeholder="Please Enter First Name" icon={User} error={errors.firstName} />
            <Input type="text" label="Last Name" name="lastName" placeholder="Please Enter Last Name" icon={User} error={errors.lastName} />
            <Input type="email" label="Email" name="email" placeholder="user@email.com" icon={Mail} error={errors.email} />
            <Input type="tel" label="Phone" name="contact" placeholder="+27...." icon={Phone} error={errors.contact} />
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name="password"
              placeholder="Enter Password"
              icon={Lock}
              error={errors.password}
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />
            <Input
              type={showConfirm ? 'text' : 'password'}
              label="Confirm Password"
              name="conf_password"
              placeholder="Confirm Password"
              icon={Lock}
              error={errors.conf_password}
              rightIcon={showConfirm ? 'eye-off' : 'eye'}
              onRightIconClick={() => setShowConfirm(!showConfirm)}
            />

            <Button type="submit" className={styles.SubmitButton}>Create Account</Button>

            <div className={styles.divider}>
              <span>Already a member?</span>
            </div>

            <Link to="/login" className={styles.switchButton}>
              Sign In
            </Link>

          </form>
        </div>

        <div className={styles.footer}>
          <p>© 2025 Tango Hotel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
