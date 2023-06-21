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

interface formState {
  formData: FormDataState;
  formDataArray: FormDataState[];
}

const initialState: formState = {
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

const formSlide = createSlice({
  name: "formSlide",
  initialState,
  reducers: {
    createFormData: (state, action: PayloadAction<FormDataState[]>) => {
      const newFormDataArray = action.payload;
      state.formDataArray = newFormDataArray;
    },
    deleteFormData: (state, action: PayloadAction<number[]>) => {
      const indexesToDelete = action.payload;
      state.formDataArray = state.formDataArray.filter(
        (_, index) => !indexesToDelete.includes(index)
      );
    },
  },
});

export const { createFormData, deleteFormData } = formSlide.actions;
export default formSlide.reducer;
