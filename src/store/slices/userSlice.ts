import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  website?: string;
}

export interface SuggestedUser {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  followedBy: string[];
  following: boolean;
}

interface UserState {
  currentUser: UserProfile | null;
  suggestedUsers: SuggestedUser[];
  followingUsers: string[];
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    username: 'your_username',
    fullName: 'Your Name',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    bio: 'Living life to the fullest ✨\n📍 San Francisco\n📧 contact@example.com',
    followers: 1234,
    following: 567,
    posts: 89,
    verified: false,
    website: 'https://example.com'
  },
  suggestedUsers: [
    {
      id: '2',
      username: 'alex_photos',
      fullName: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      followedBy: ['john_doe', 'jane_smith'],
      following: false
    },
    {
      id: '3',
      username: 'sarah_travels',
      fullName: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763c5f?w=150&h=150&fit=crop&crop=face',
      followedBy: ['mike_photos'],
      following: false
    },
    {
      id: '4',
      username: 'david_art',
      fullName: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      followedBy: ['art_lover', 'creative_minds'],
      following: false
    }
  ],
  followingUsers: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserProfile>) => {
      state.currentUser = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    followUser: (state, action: PayloadAction<string>) => {
      const user = state.suggestedUsers.find(u => u.id === action.payload);
      if (user) {
        user.following = true;
        state.followingUsers.push(action.payload);
        if (state.currentUser) {
          state.currentUser.following += 1;
        }
      }
    },
    unfollowUser: (state, action: PayloadAction<string>) => {
      const user = state.suggestedUsers.find(u => u.id === action.payload);
      if (user) {
        user.following = false;
        state.followingUsers = state.followingUsers.filter(id => id !== action.payload);
        if (state.currentUser) {
          state.currentUser.following -= 1;
        }
      }
    }
  }
});

export const { setCurrentUser, updateProfile, followUser, unfollowUser } = userSlice.actions;
export default userSlice.reducer;