import React from 'react';
import { TextInput } from 'react-native';
import stylesSearchBar from './styles';

type SearchBarProps = {
  placeholder: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
};

export default function SearchBar({ placeholder, value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      style={stylesSearchBar.searchBar}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
