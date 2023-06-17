import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormDataState {
  prefix: string;
  fname: string;
  lname: string;
  birthday: Date | null;
  nationality: string;
  citizenID: string;
  gender: string;
  prefixphone: string;
  phone: string;
  booking: string;
  salary: string;
}

interface TodoState {
  formData: FormDataState;
  formDataArray: FormDataState[];
}

const initialState: TodoState = {
  formData: {
    prefix: "",
    fname: "",
    lname: "",
    birthday: null,
    nationality: "",
    citizenID: "",
    gender: "",
    prefixphone: "",
    phone: "",
    booking: "",
    salary: "",
  },
  formDataArray: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    createFormData: (state, action: PayloadAction<FormDataState[]>) => {
      const newFormDataArray = action.payload;
      state.formDataArray = newFormDataArray;
    },
  },
});

export const { createFormData } = todoSlice.actions;
export default todoSlice.reducer;
