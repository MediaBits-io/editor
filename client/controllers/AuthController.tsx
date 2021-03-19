import useAuth from '../hooks/useAuth';

function AuthController() {
  useAuth({ bindAuthListener: true });
  return null;
}

export default AuthController;
