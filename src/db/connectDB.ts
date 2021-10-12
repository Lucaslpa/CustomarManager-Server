import mongoose from 'mongoose';

export function ConnectToDB(dbURL: string) {
  const { connect } = mongoose;

  connect(dbURL);

  return mongoose;
}
