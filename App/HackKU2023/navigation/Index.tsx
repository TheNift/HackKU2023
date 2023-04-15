import * as React from 'react';
import { useAuthentication } from '../backend/useAuthentication';
import UserStack from './UserStack';
import AuthStack from './AuthStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}
