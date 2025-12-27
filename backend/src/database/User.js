import { ObjectId } from 'mongodb';
import db from './db.js';

export async function getUserById(userId) {
  const collection = db.collection('users');
  return await collection.findOne({ _id: new ObjectId(userId) });
}

export async function getUserByEmail(email) {
  const collection = db.collection('users');
  return await collection.findOne({ email });
}

export async function createUser(userData) {
  const collection = db.collection('users');
  const result = await collection.insertOne(userData);
  return result;
}