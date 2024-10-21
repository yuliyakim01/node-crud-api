import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user';

let users: User[] = [];

export const getAllUsers = (): User[] => users;

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const createUser = (username: string, age: number, hobbies: string[]): User => {
  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, updatedUser: Partial<User>): User | undefined => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return users[index];
  }
  return undefined;
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};
