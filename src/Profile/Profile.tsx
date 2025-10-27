import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { UpdateProfileData } from '';
import styles from './Profile.module.css';
import { User, Edit2, Trash2, LogOut } from 'lucide-react';
import React from 'react';

export const Profile = () => {
  const { user, logout, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<UpdateProfileData>({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    contact: user?.contact || '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const updateData: UpdateProfileData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        contact: formData.contact
      };

      if (formData.password && formData.password.trim() !== '') {
        updateData.password = formData.password;
      }

      await ApiService.updateProfile(user.id, updateData);
      await refreshUser();
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    setError('');
    setLoading(true);

    try {
      await ApiService.deleteProfile(user.id);
      logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      contact: user?.contact || '',
      password: ''
    });
    setError('');
    setSuccess('');
  };

  if (!user) return null;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            <User size={48} />
          </div>
          <h2 className={styles.profileTitle}>User Profile</h2>
          <button onClick={logout} className={styles.logoutButton} title="Logout">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        {!isEditing ? (
          <div className={styles.profileView}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>First Name</label>
                <p className={styles.infoValue}>{user.firstname}</p>
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Last Name</label>
                <p className={styles.infoValue}>{user.lastname}</p>
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Email</label>
                <p className={styles.infoValue}>{user.email}</p>
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Contact</label>
                <p className={styles.infoValue}>{user.contact}</p>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                <Edit2 size={18} />
                <span>Edit Profile</span>
              </button>
              <button onClick={handleDelete} className={styles.deleteButton} disabled={loading}>
                <Trash2 size={18} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className={styles.profileForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>New Password (optional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" className={styles.saveButton} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
