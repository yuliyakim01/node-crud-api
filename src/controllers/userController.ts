import { Request, Response, RequestHandler } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../db/database';
import { validate, version } from 'uuid';

// Helper function to validate UUIDv4
const isUuidV4 = (id: string): boolean => validate(id) && version(id) === 4;

// Get all users
export const getUsers: RequestHandler = (req: Request, res: Response): void => {
  res.status(200).json(getAllUsers());
};

// Get a specific user by ID
export const getUser: RequestHandler = (req: Request, res: Response): void => {
  const { userId } = req.params;

  // Check if the userId is a valid UUIDv4
  if (!isUuidV4(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  const user = getUserById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
};

// Create a new user
export const createUserController: RequestHandler = (req: Request, res: Response): void => {
  const { username, age, hobbies } = req.body;

  // Validate request body
  if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }

  const newUser = createUser(username, age, hobbies);
  res.status(201).json(newUser);
};

// Update an existing user
export const updateUserController: RequestHandler = (req: Request, res: Response): void => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  // Validate UUIDv4 for userId
  if (!isUuidV4(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  // Validate request body
  if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }

  const updatedUser = updateUser(userId, { username, age, hobbies });

  if (!updatedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(updatedUser);
};

// Delete a user
export const deleteUserController: RequestHandler = (req: Request, res: Response): void => {
  const { userId } = req.params;

  // Validate UUIDv4 for userId
  if (!isUuidV4(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  const success = deleteUser(userId);

  if (!success) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(204).send();
};
