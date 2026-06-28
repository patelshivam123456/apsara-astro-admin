import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { downloadDocument, getAppliedAstrologers, updateAstrologerStatus } from "@/services/astrologer";

export const fetchAstrologers = createAsyncThunk("astrologers/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await getAppliedAstrologers();
    return Array.isArray(data) ? data : data?.data || data?.result || [];
  } catch (error) {
    const message = error?.response?.data?.message || "Unable to load astrologer applications.";
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const changeAstrologerStatus = createAsyncThunk(
  "astrologers/changeStatus",
  async ({ publicId, status }, { rejectWithValue }) => {
    try {
      await updateAstrologerStatus(publicId, status);
      toast.success(`Application marked ${status.toLowerCase()}`);
      return { publicId, status };
    } catch (error) {
      const message = error?.response?.data?.message || "Status update failed.";
      toast.error(message);
      return rejectWithValue({ message, publicId, status });
    }
  }
);

export const downloadAstrologerDocument = createAsyncThunk(
  "astrologers/downloadDocument",
  async ({ fileId, fileType, filename }, { rejectWithValue }) => {
    try {
      await downloadDocument(fileId, fileType, filename);
      return { fileId, fileType };
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Download failed.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  astrologers: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "ALL",
    sortBy: "createdAt",
    sortDirection: "desc"
  },
  pagination: {
    page: 1,
    pageSize: 10
  },
  selectedAstrologer: null,
  updating: {},
  downloading: {}
};

const astrologerSlice = createSlice({
  name: "astrologers",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
      state.pagination.page = 1;
    },
    setSort(state, action) {
      const sortBy = action.payload;
      if (state.filters.sortBy === sortBy) {
        state.filters.sortDirection = state.filters.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.filters.sortBy = sortBy;
        state.filters.sortDirection = "asc";
      }
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    setPageSize(state, action) {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
    setSelectedAstrologer(state, action) {
      state.selectedAstrologer = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAstrologers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAstrologers.fulfilled, (state, action) => {
        state.loading = false;
        state.astrologers = action.payload;
      })
      .addCase(fetchAstrologers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeAstrologerStatus.pending, (state, action) => {
        state.updating[action.meta.arg.publicId] = action.meta.arg.status;
      })
      .addCase(changeAstrologerStatus.fulfilled, (state, action) => {
        const { publicId, status } = action.payload;
        state.astrologers = state.astrologers.map((item) => (item.publicId === publicId ? { ...item, status, profileStatus: status } : item));
        if (state.selectedAstrologer?.publicId === publicId) {
          state.selectedAstrologer = { ...state.selectedAstrologer, status, profileStatus: status };
        }
        delete state.updating[publicId];
      })
      .addCase(changeAstrologerStatus.rejected, (state, action) => {
        delete state.updating[action.payload?.publicId || action.meta.arg.publicId];
      })
      .addCase(downloadAstrologerDocument.pending, (state, action) => {
        state.downloading[`${action.meta.arg.fileId}-${action.meta.arg.fileType}`] = true;
      })
      .addCase(downloadAstrologerDocument.fulfilled, (state, action) => {
        delete state.downloading[`${action.payload.fileId}-${action.payload.fileType}`];
      })
      .addCase(downloadAstrologerDocument.rejected, (state, action) => {
        delete state.downloading[`${action.meta.arg.fileId}-${action.meta.arg.fileType}`];
      });
  }
});

export const { setSearch, setStatusFilter, setSort, setPage, setPageSize, setSelectedAstrologer } = astrologerSlice.actions;
export default astrologerSlice.reducer;
