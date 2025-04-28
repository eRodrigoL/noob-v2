// app/index.tsx
import { Redirect } from 'expo-router';
import { ROUTES } from '@constants/index';

export default function Home() {
  return <Redirect href={ROUTES.TEST} />;
}
