import { useNavigate } from 'react-router-dom';
import CheckRole from './CheckRole';

interface CheckComponentProps {} // No props for this component

const CheckComponent: React.FC<CheckComponentProps> = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: string) => {
    if (selectedRole === 'teacher') {
      navigate('/signup/teacher');
    } else if (selectedRole === 'student') {
      navigate('/signup/student');
    }
  };

  return (
    <div>
      <CheckRole onRoleSelect={handleRoleSelect} />
    </div>
  );
};

export default CheckComponent;
