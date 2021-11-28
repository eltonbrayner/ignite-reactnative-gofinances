import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';

import { Container, Header, Title } from './styles';

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <HistoryCard color="#464646" amount="R$ 500" title="Apartamento" />
      <HistoryCard color="#464646" amount="R$ 500" title="Apartamento" />
      <HistoryCard color="#464646" amount="R$ 500" title="Apartamento" />
    </Container>
  );
}
