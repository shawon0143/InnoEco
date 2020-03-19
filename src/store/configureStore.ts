import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
// reducers import
import authReducer from './reducers/auth';
export const rootReducer = combineReducers({
    auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState>)),
);
