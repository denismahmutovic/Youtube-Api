
import { configureStore,createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { InitialState } from "../Types";
import { getHomePageVideos } from "./reducers/getHomePagaVideos";
import { getVideoDetails } from "../store/reducers/getVideoDetalis";
import { getSearchPageVideos } from "./reducers/getSearchPageVideos";
import { getRecommendedVideos } from "./reducers/getRecommendedVideos";



const initialState:InitialState ={
    videos:[],
    currentPlaying:null,
    searchTerm: "",
    searchResults:[], 
    nextPageToken:null,
    recommendedVideos:[]  
} 

const YoutubeSlice = createSlice({
    name: "youtubeApp",
    initialState,
    reducers: {
      clearVideos: (state) => {
        state.videos = [];
        state.nextPageToken = null;
      },
      changeSearchTerm: (state, action: PayloadAction<string>) => {
        state.searchTerm = action.payload;
      },
      clearSearchTerm: (state) => {
        state.searchTerm = "";
      },
    },
        
    
    extraReducers:(builder)=>{
        builder.addCase(getHomePageVideos.fulfilled,(state,action)=>{
            state.videos = action.payload.parsedData;
            state.nextPageToken =action.payload.nextPageToken
        })
        builder.addCase(getSearchPageVideos.fulfilled,(state,action)=>{
            state.videos = action.payload.parsedData;
            state.nextPageToken =action.payload.nextPageToken
        })
        builder.addCase(getVideoDetails.fulfilled,(state,action)=>{
            state.currentPlaying = action.payload;
            
        })
        builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
            state.recommendedVideos = action.payload.parsedData;
          });
    },
    
       
})

export const store = configureStore({ 
    reducer:{
        youtubeApp:YoutubeSlice.reducer,
    },
})
export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  YoutubeSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;