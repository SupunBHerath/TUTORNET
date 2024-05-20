import React, { useState } from 'react';
import './CheckRole.css'; // Assuming CSS module import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Role {
  value: string;
  label: string;
}

type OnRoleSelect = (selectedRole: string) => void;

const CheckRole: React.FC<{ onRoleSelect: OnRoleSelect }> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleRoleSelection = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    } else {
      console.error('Please select a role (teacher or student)');
    }
  };

  const handleClose = () => {
    window.location.href = '/signin';
  };

  const roles: Role[] = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
  ];

  return (
    <div className="check-role-container">
      <FontAwesomeIcon icon={faTimes} className="icon" onClick={handleClose} />
      <h2>Are You?</h2>
      <div className="role-selection">
        {roles.map((role) => (
          <div key={role.value}>
            <input
              type="checkbox"
              id={role.value}
              name="role"
              value={role.value}
              checked={selectedRole === role.value}
              onChange={handleRoleChange}
            />
            <label htmlFor={role.value}>{role.label}</label>
          </div>
        ))}
        <button type="button" onClick={handleRoleSelection}>
          Ok
        </button>
      </div>
      <p>Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
};

export default CheckRole;
