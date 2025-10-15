import { useState } from 'react';
import { Button } from '../Components/Button/Button';
import { Input } from '../Components/Input/Input';
import { Text } from '../Components/Text/Text';
import { Sparkles, Mail, Lock } from 'lucide-react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

interface LoginProps {
  onNavigateToRegister: () => void;
}

export const Login = ({ onNavigateToRegister }: LoginProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const newErrors: { [key: string]: string } = {};
    const email = data.get('email')?.toString().trim();
    const password = data.get('password')?.toString().trim();

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login submitted:', Object.fromEntries(data));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.brandSection}>
          <Text variant="h1" className={styles.brandTitle}>Tango Hotel</Text>
          <div className={styles.tagline}>
            <Sparkles size={16} className={styles.sparkleIcon} />
            <span>Luxury Redefined</span>
            <Sparkles size={16} className={styles.sparkleIcon} />
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <Text variant="h2">Welcome Back</Text>
            <p className={styles.formSubtitle}>Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="user@email.com"
              icon={Mail}
              error={errors.email}
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password}
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            <div className={styles.rememberSection}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>

            <Button type="submit" className={styles.SubmitButton}>Sign In</Button>

            <div className={styles.divider}>
              <span>New to Tango?</span>
            </div>
            
            <Link to="/" className={styles.switchButton}>
              Create Account
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
