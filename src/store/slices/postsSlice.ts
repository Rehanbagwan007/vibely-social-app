import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  liked: boolean;
  saved: boolean;
  timestamp: string;
  location?: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface PostsState {
  posts: Post[];
  stories: Story[];
}

export interface Story {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  viewed: boolean;
}

const initialState: PostsState = {
  posts: [
    {
      id: '1',
      username: 'nature_lover',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763c5f?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      caption: 'Beautiful sunset at the mountains 🏔️ #nature #sunset #mountains',
      likes: 1234,
      liked: false,
      saved: false,
      timestamp: '2h',
      location: 'Swiss Alps',
      comments: [
        {
          id: '1',
          username: 'photo_enthusiast',
          text: 'Stunning capture! 📸',
          timestamp: '1h',
          likes: 12
        }
      ]
    },
    {
      id: '2',
      username: 'foodie_adventures',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop',
      caption: 'Homemade pizza night! 🍕 Recipe in my bio',
      likes: 856,
      liked: true,
      saved: false,
      timestamp: '4h',
      comments: [
        {
          id: '1',
          username: 'chef_mike',
          text: 'Looks delicious! 🤤',
          timestamp: '3h',
          likes: 5
        },
        {
          id: '2',
          username: 'cooking_mama',
          text: 'Share the recipe please!',
          timestamp: '2h',
          likes: 8
        }
      ]
    }
  ],
  stories: [
    {
      id: '1',
      username: 'your_story',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      image: '',
      viewed: false
    },
    {
      id: '2',
      username: 'travel_diary',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop',
      viewed: false
    },
    {
      id: '3',
      username: 'art_studio',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop',
      viewed: true
    }
  ]
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
      }
    },
    toggleSave: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.saved = !post.saved;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Omit<Comment, 'id'> }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        const newComment: Comment = {
          ...action.payload.comment,
          id: Date.now().toString()
        };
        post.comments.push(newComment);
      }
    },
    markStoryViewed: (state, action: PayloadAction<string>) => {
      const story = state.stories.find(s => s.id === action.payload);
      if (story) {
        story.viewed = true;
      }
    },
    addPost: (state, action: PayloadAction<Omit<Post, 'id' | 'timestamp'>>) => {
      const newPost: Post = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: 'now'
      };
      state.posts.unshift(newPost);
    }
  }
});

export const { toggleLike, toggleSave, addComment, markStoryViewed, addPost } = postsSlice.actions;
export default postsSlice.reducer;