import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Props } from './index';

type IconsProps = Pick<Props, 'type'>;
type ContainerProps = Pick<Props, 'isActive' | 'type'>;

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border: ${({ isActive }) => (isActive ? 0 : 0.8)}px solid
    ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === 'up' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === 'down' ? theme.colors.attention : theme.colors.success};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
