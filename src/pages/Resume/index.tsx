import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';

import { Container, Header, Title, Content } from './styles';

import { categories } from '../../utils/categories';
import { currencyToBRL } from '../../utils/transform';
import { useFocusEffect } from '@react-navigation/core';

interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionCardProps) => expensive.type === 'negative',
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      categorySum > 0 &&
        totalByCategory.push({
          name: category.name,
          total: currencyToBRL(categorySum),
          color: category.color,
          key: category.key,
        });
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            color={item.color}
            amount={item.total}
            title={item.name}
          />
        ))}
      </Content>
    </Container>
  );
}
