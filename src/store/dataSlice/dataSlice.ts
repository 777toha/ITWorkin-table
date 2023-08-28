import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Character, Location } from '../../types/data';

interface TableState {
    data: Character[] | Location[];
    headers: string[];
    currentPage: number;
    totalPages: number;
    selectedApi: string;
    selectedPageSize: number;
}

const initialState: TableState = {
    data: [],
    headers: [],
    currentPage: 1,
    totalPages: 1,
    selectedApi: 'location',
    selectedPageSize: 15,
};

export const fetchData = createAsyncThunk(
    'table/fetchData',
    async ({ selectedApi, currentPage, selectedPageSize }: any) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/${selectedApi}`, {
                params: {
                    page: currentPage,
                    per_page: selectedPageSize,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    });

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSelectedApi: (state, action) => {
            state.selectedApi = action.payload;
            state.currentPage = 1;
        },
        setSelectedPageSize: (state, action) => {
            state.selectedPageSize = action.payload;
            state.currentPage = 1;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload.results;
            state.headers = Object.keys(action.payload.results[0]);
            state.totalPages = action.payload.info.pages;
        });
    },
});

export const { setCurrentPage, setSelectedApi, setSelectedPageSize } = tableSlice.actions;

export default tableSlice.reducer;