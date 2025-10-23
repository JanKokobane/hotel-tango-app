import { X } from 'lucide-react';
import { useState } from 'react';
import modalStyles from './Modal.module.css';
import dashboardStyles from './Dashboard.module.css';
import { Room } from '../../AdminDashboard';
import React from 'react';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onSave: (roomData: any) => void;
}

function RoomModal({ room, onClose, onSave }: RoomModalProps) {
  const [formData, setFormData] = useState({
    name: room?.name || '',
    type: room?.type || '',
    price: room?.price || 0,
    status: room?.status || 'available',
    capacity: room?.capacity || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' ? Number(value) : value
    }));
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalContent}>
        <div className={modalStyles.modalHeader}>
          <h2>{room ? 'Edit Room' : 'Add New Room'}</h2>
          <button className={modalStyles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={modalStyles.modalBody}>
            <div className={modalStyles.formGroup}>
              <label>Room Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter room name"
                required
              />
            </div>
            <div className={modalStyles.formRow}>
              <div className={modalStyles.formGroup}>
                <label>Room Type</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>
              <div className={modalStyles.formGroup}>
                <label>Price per Night</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <div className={modalStyles.formRow}>
              <div className={modalStyles.formGroup}>
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className={modalStyles.formGroup}>
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>
          <div className={modalStyles.modalFooter}>
            <button
              type="button"
              className={dashboardStyles.secondaryButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={dashboardStyles.primaryButton}>
              {room ? 'Save Changes' : 'Add Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomModal;
