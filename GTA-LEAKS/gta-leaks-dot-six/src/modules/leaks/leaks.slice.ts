import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import exampleImg from "../../images/rockstar.jpg";
import axios from "axios";

export const addLeak = createAsyncThunk(
  "leaks/addLeak",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      // Выполняем POST-запрос на сервер
      const response = await axios.post("/api/leaks/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Возвращаем данные из ответа
    } catch (error) {
      // Обработка ошибки
      return thunkAPI.rejectWithValue(`Failed to add leak ${error}`);
    }
  }
);

export const fetchLeaks = createAsyncThunk(
  "leaks/fetchLeaks",
  async (_, thunkAPI) => {
    try {
      // Выполняем GET-запрос на сервер
      const response = await axios.get("/api/leaks");
      return response.data; // Возвращаем данные из ответа
    } catch (error) {
      // Обработка ошибки
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch leaks");
    }
  }
);

export type LeakId = string;

type Leak = {
  _id: LeakId;
  title: string;
  description: string;
  img: string | undefined;
  createdAt: number;
};

export const initialLeaksList: Leak[] = Array.from(
  { length: 1 },
  (_, index) => ({
    _id: "experimental",
    title: `Leak experimental ${index + 1} title`,
    description: `Leak experimental ${index + 1} description `,
    img: exampleImg,
    createdAt: new Date().getTime(),
  })
);

type LeaksState = {
  entities: Record<LeakId, Leak>;
  ids: LeakId[];
  selectedLeakId: LeakId | undefined;
  page: number;
  loading: boolean;
  error: string | null;
  leaks: Leak[];
};

const initialLeaksState: LeaksState = {
  entities: {},
  ids: [],
  selectedLeakId: undefined,
  page: 1,
  loading: false,
  error: null,
  leaks: [],
};

export const leaksSlice = createSlice({
  name: "leaks",
  initialState: initialLeaksState,
  selectors: {
    selectSortedLeaks: createSelector(
      (state: LeaksState) => state.ids,
      (state: LeaksState) => state.entities,
      (_: LeaksState, sort: "latest" | "oldest" | "a-z" | "z-a") => sort,
      (ids, entities, sort) =>
        ids
          .map((_id) => entities[_id])
          .sort((a, b) => {
            switch (sort) {
              case "latest":
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              case "oldest":
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              case "a-z":
                return a.title.localeCompare(b.title);
              case "z-a":
                return b.title.localeCompare(a.title);
            }
          })
    ),
    selectSelectedLeakId: (state) => state.selectedLeakId,
  },
  reducers: {
    stored: (state, action: PayloadAction<{ leaks: Leak[] }>) => {
      const { leaks } = action.payload;
      state.ids = leaks.map((leak) => leak._id);
      state.entities = leaks.reduce((acc, leak) => {
        acc[leak._id] = leak;
        return acc;
      }, {} as Record<LeakId, Leak>);
    },
    selected: (state, action: PayloadAction<{ leakId: LeakId }>) => {
      state.selectedLeakId = action.payload.leakId;
    },
    removeSelected: (state) => {
      state.selectedLeakId = undefined;
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaks.fulfilled, (state, action: PayloadAction<Leak[]>) => {
        const leaks = action.payload;
        state.ids = leaks.map((leak) => leak._id);
        state.entities = leaks.reduce((acc, leak) => {
          acc[leak._id] = leak;
          return acc;
        }, {} as Record<LeakId, Leak>);
        state.loading = false;
      })
      .addCase(fetchLeaks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("failed to fetch leaks");
      })

      .addCase(addLeak.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLeak.fulfilled, (state, action: PayloadAction<Leak>) => {
        const leak = action.payload;
        state.ids.push(leak._id);
        state.entities[leak._id] = leak;
        state.leaks.push(leak);
        state.loading = false;
      })
      .addCase(addLeak.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("failed to add leak");
      });
  },
});
