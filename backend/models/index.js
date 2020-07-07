import mongoose from "mongoose";

const db = {};
db.mongoose = mongoose;
db.url =
  "mongodb+srv://igti:123456@igti@cluster0-lpcf5.mongodb.net/grades?retryWrites=true&w=majority";

export { db };
