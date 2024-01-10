import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export interface newUserType {
  newId: number;
  newUserName: string;
  newEmail: string;
}

interface initialStateType {
  user: newUserType[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: initialStateType = {
  user: [],
  isLoading: false,
  errorMessage: "",
};

export const fetchUsers = createAsyncThunk<newUserType[]>(
  "users/fetchUsers",
  async () => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser?.email || "");
      const userSnapShop = await getDoc(userDocRef);
      const existingDoc = userSnapShop.data()?.data || [];
      console.log(existingDoc);

      return existingDoc;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const postUserOnServer = createAsyncThunk<newUserType, newUserType>(
  "users/postUserOnServer",
  async (newUser) => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser?.email || "");

      setDoc(
        userDocRef,
        {
          data: arrayUnion(newUser),
        },
        { merge: true }
      );

      return newUser;
    } catch (error) {
      console.error("Failed to add user document:", error);
      throw error;
    }
  }
);

export const updateUsersOnServer = createAsyncThunk<newUserType, newUserType>(
  "users/updateUsersOnServer",
  async (updatedUser) => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser?.email || "");
      const userDocSnapshot = await getDoc(userDocRef);
      const existingDataArray = userDocSnapshot.data()?.data || [];

      const updatedDataArray = existingDataArray.map((user: newUserType) => {
        if (user.newId === updatedUser.newId) {
          return { ...user, ...updatedUser };
        } else {
          return user;
        }
      });

      await updateDoc(userDocRef, { data: updatedDataArray });

      return updatedUser;
    } catch (error) {
      console.error("failed updating a user !");
      throw error;
    }
  }
);

export const deleteUserOnServer = createAsyncThunk<void, number>(
  "users/deleteUserOnServer",
  async (userId) => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser?.email || "");
      const userDocSnapshot = await getDoc(userDocRef);
      const existingDataArray = userDocSnapshot.data()?.data || [];

      const deletedDataArray = existingDataArray.filter(
        (user: newUserType) => user.newId !== userId
      );

      await updateDoc(userDocRef, {
        data: deletedDataArray,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<newUserType>) => {
      state.user = [...state.user, action.payload];
    },
    updateUser: (state, action: PayloadAction<newUserType>) => {
      const { newUserName, newId, newEmail } = action.payload;
      const foundUser = state.user.find((user) => user.newId === newId);
      if (foundUser) {
        foundUser.newUserName = newUserName;
        foundUser.newEmail = newEmail;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const newId = action.payload;
      state.user = state.user.filter((user) => user.newId !== newId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<newUserType[]>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Error fetching Users!";
      })
      .addCase(
        postUserOnServer.fulfilled,
        (state, action: PayloadAction<newUserType>) => {
          state.user.push(action.payload);
        }
      )
      .addCase(
        updateUsersOnServer.fulfilled,
        (state, action: PayloadAction<newUserType>) => {
          const { newId, newUserName, newEmail } = action.payload;
          const foundUser = state.user.find((user) => user.newId === newId);

          if (foundUser) {
            foundUser.newUserName = newUserName;
            foundUser.newEmail = newEmail;
          }
        }
      );
  },
});

export const { addUser, updateUser, deleteUser } = UsersSlice.actions;

export default UsersSlice.reducer;
