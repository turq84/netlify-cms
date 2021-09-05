import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const BlueButton = styled.button<{ large?: boolean }>`
  color: ${(p) => p.theme.colors.white};
  background-color: ${(p) => p.theme.colors.primaryBlue};
  padding: ${(props) => (props.large ? '15px 20px' : '10px 15px')};
  border-radius: 5px;
  margin: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  transition: all 0.25s linear 0s;

  &:hover {
    background-color: #45789b;
    transition: all 0.25s linear 0s;
  }
`;

export const BlueButtonLink = styled(Link)`
  color: ${(p) => p.theme.colors.white};
  background-color: ${(p) => p.theme.colors.primaryBlue};
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  transition: all 0.25s linear 0s;

  &:hover {
    background-color: #45789b;
    transition: all 0.25s linear 0s;
  }
`;

export const BlueButtonBasic = styled.a`
  color: ${(p) => p.theme.colors.white};
  background-color: ${(p) => p.theme.colors.primaryBlue};
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  transition: all 0.25s linear 0s;

  &:hover {
    background-color: #45789b;
    transition: all 0.25s linear 0s;
  }
`;

export const WhiteButtonLink = styled.a<{ large?: boolean }>`
  color: ${(p) => p.theme.colors.primaryBlue};
  background-color: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.primaryBlue};
  border-radius: 5px;
  padding: ${(props) => (props.large ? '14px 20px' : '9px 15px')};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  transition: all 0.25s linear 0s;

  &:hover {
    background-color: #ebf5ff;
    transition: all 0.25s linear 0s;
  }
`;

export const WhiteButton = styled.button<{ large?: boolean }>`
  color: ${(p) => p.theme.colors.primaryBlue};
  background-color: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.primaryBlue};
  border-radius: 5px;
  padding: ${(props) => (props.large ? '14px 20px' : '9px 15px')};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  transition: all 0.25s linear 0s;

  &:hover {
    background-color: #ebf5ff;
    transition: all 0.25s linear 0s;
  }
`;
