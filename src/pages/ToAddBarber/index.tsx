import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
}

const ToAddBarber: React.FC = () => {
  const { signOut, user } = useAuth();

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <div>
          <h1>Selecione aqui os barbeiros da sua equipe</h1>
        </div>
      </Content>
    </Container>
  );
};

export default ToAddBarber;
