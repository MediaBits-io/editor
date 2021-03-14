import useAuth from '../hooks/useAuth';

function Auth() {
  useAuth({ bindAuthListener: true });
  return null;
}

export default Auth;
