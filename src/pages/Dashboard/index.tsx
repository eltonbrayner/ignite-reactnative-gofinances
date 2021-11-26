import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from './styles';
import { convertDate, currencyToBRL } from '../../utils/transform';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  );

  const theme = useTheme();

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) =>
    convertDate(
      Math.max.apply(
        Math,
        collection
          .filter((transaction: DataListProps) => transaction.type === type)
          .map((transaction: DataListProps) =>
            new Date(transaction.date).getTime(),
          ),
      ),
    );

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entries = 0;
    let expensive = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        item.type === 'positive'
          ? (entries += Number(item.amount))
          : (expensive += Number(item.amount));

        const amount = currencyToBRL(item.amount);

        const date = convertDate(item.date);

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      },
    );

    const total = entries - expensive;

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive',
    );

    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      'negative',
    );

    const totalInterval = `01 a ${lastTransactionExpensives}`;

    setHighlightData({
      entries: {
        amount: currencyToBRL(entries),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: currencyToBRL(expensive),
        lastTransaction: `Última entrada saída ${lastTransactionExpensives}`,
      },
      total: {
        amount: currencyToBRL(total),
        lastTransaction: totalInterval,
      },
    });

    setTransactions(transactionsFormatted);

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
    // AsyncStorage.clear();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/18264721?v=4',
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Elton</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => console.warn('LogoutPress')}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries?.amount}
              lastTransaction={highlightData.entries?.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensive?.amount}
              lastTransaction={highlightData.entries?.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total?.amount}
              lastTransaction={highlightData.total?.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
