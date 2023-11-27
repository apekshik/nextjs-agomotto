import { User } from "../models/user";
import connectDB from "@/app/lib/mongodb";

export const fetchUsers = async (query, page)=>{
  const regex = new RegExp(query, "i");

  const item_per_page = 15;
  try {
      connectDB();
      const count = await User.find({username:{$regex:regex}}).count();
      const users = await User.find({username:{$regex:regex}}).
      limit(item_per_page).skip(item_per_page * (page-1));
      return {count, users};
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
}

export const fetchUser = async (id)=>{
  console.log(id);
  try {
      connectDB();
      const user = await User.findById(id);
      return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
}


// export const cards = [
//   {
//     id: 1,
//     title: "Cloud Storage",
//     contectionStatus: "connected",
//     // link: ,
//   },
//   {
//     id: 2,
//     title: "Firestore",
//     contectionStatus: "connected",
//     // link: ,
//   },

// ];
