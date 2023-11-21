import { User } from "../models/user";
import connectDB from "@/app/lib/mongodb";

// DUMMY DATA
export const fetchUsers = async ()=>{
  try {
      connectDB();
      const users = await User.find();
      return users;
  } catch (error) {
    console.log(error);
    // throw new Error("Failed to fetch users!");
  }
}


export const cards = [
  {
    id: 1,
    title: "Cloud Storage",
    contectionStatus: "connected",
    // link: ,
  },
  {
    id: 2,
    title: "Firestore",
    contectionStatus: "connected",
    // link: ,
  },

];
