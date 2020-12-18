import React, { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal/Modal';
import ModalAction from '../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../components/ui/Modal/ModalContent';
import ModalFullActions from '../../../components/ui/Modal/ModalFullActions';
import { UserContainer } from '../../../containers/UserContainer';

interface Props {
  visible: boolean;
  close: () => void;
}

// TODO: rework into flyout, this is temporary
function LoginModal({ visible, close }: Props) {
  const { signIn, userInfo } = UserContainer.useContainer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (userInfo) {
      close();
    }
  }, [close, userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Modal visible={visible}>
      <form onSubmit={handleSubmit}>
        <ModalContent title="Login">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                onChange={handleChangeEmail}
                type="email"
                name="email"
                id="email"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                onChange={handleChangePassword}
                type="password"
                name="password"
                id="password"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="password"
              />
            </div>
          </div>
        </ModalContent>
        <ModalFullActions
          dismiss={
            <ModalAction onClick={close} type="secondary">
              Cancel
            </ModalAction>
          }
          submit={
            <ModalAction buttonType="submit" type="primary" loading={loading}>
              Login
            </ModalAction>
          }
        />
      </form>
    </Modal>
  );
}

export default LoginModal;
