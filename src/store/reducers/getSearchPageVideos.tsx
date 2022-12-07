import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Root } from "react-dom/client";
import { RootState } from "..";
import { HomePageVideos } from "../../Types";
import { YOUTUBE_API_URL } from "../../utils/constants";
import { parseData } from "../../utils";
import Search from "../../pages/Search";

const API_KEY = process.env.REACT_APP_YOTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtubeApp/serachPageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
