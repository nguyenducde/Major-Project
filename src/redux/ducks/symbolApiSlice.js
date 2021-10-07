import { createSlice } from "@reduxjs/toolkit"

const symbolSlice = createSlice({
  name: "symbolApi",
  initialState: {},
  reducers: {
    setSymbolApi() {},
    getSymbolApi(state, action) {
      const symbolApiData = action.payload
      return { ...state, ...symbolApiData }
    }
  }
})

export const { getSymbolApi, setSymbolApi } = symbolSlice.actions
export default symbolSlice.reducer;