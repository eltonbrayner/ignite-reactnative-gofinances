import React, { useState } from 'react';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('up')}
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('down')}
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
