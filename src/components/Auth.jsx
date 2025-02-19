import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ children }) {
  const navigate = useNavigate();
  let isAuthorized = false;

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  });

  if (isAuthorized) {
    return children;
  }
}
