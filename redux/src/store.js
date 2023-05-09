import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
	reducer: {
		notes: noteReducer,
		filter: filterReducer,
	},
});

store.subscribe(() => console.log("index.js, state: ", store.getState()));

export default store;
