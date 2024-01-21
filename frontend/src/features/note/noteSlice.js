import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { noteService } from "./noteService";

const initialState = {
  notes: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createNote = createAsyncThunk(
  "createNote",
  async (data, thunkAPI) => {
    try {
      return await noteService.create(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNotes = createAsyncThunk(
  "getNotes",
  async (userId, thunkAPI) => {
    try {
      return await noteService.get(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "deleteNote",
  async (noteId, thunkAPI) => {
    try {
      return await noteService.delete(noteId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateNote = createAsyncThunk(
  "updateNote",
  async ({ noteId, data }, thunkAPI) => {
    try {
      return await noteService.update(noteId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const archiveNote = createAsyncThunk(
  "archiveNote",
  async (noteId, thunkAPI) => {
    try {
      return await noteService.archive(noteId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unarchiveNote = createAsyncThunk(
  "unarchiveNote",
  async (noteId, thunkAPI) => {
    try {
      return await noteService.unarchive(noteId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearNoteMessage = createAction("clearNoteMessage");

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE NOTE
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating note";
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // GET NOTES
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching notes";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.notes = action.payload.notes;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // DELETE NOTE
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
        state.message = "Deleting note";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.notes = state.notes.filter(
          (note) => note.id !== action.payload.noteId
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // UPDATE NOTE
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating note";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.notes = state.notes.map((note) =>
          note.id === action.payload.note.id ? action.payload.note : note
        );
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // ARCHIVE NOTE
      .addCase(archiveNote.pending, (state) => {
        state.isLoading = true;
        state.message = "Archiving note";
      })
      .addCase(archiveNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        // Actualiza la nota en el estado como archivada
        state.notes = state.notes.map((note) =>
          note.id === action.payload.noteId ? { ...note, archived: true } : note
        );
      })
      .addCase(archiveNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // UNARCHIVE NOTE
      .addCase(unarchiveNote.pending, (state) => {
        state.isLoading = true;
        state.message = "Unarchiving note";
      })
      .addCase(unarchiveNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        // Actualiza la nota en el estado como desarchivada
        state.notes = state.notes.map((note) =>
          note.id === action.payload.noteId
            ? { ...note, archived: false }
            : note
        );
      })
      .addCase(unarchiveNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // CLEAR NOTE MESSAGE
      .addCase(clearNoteMessage, (state) => {
        state.message = "";
      });
  },
});
