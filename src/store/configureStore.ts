import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// reducers import
import authReducer from './reducers/auth';
import knowledgeReducer from './reducers/knowledge';
import eventReducer from './reducers/event';

export const rootReducer = combineReducers({
    auth: authReducer,
    knowledge: knowledgeReducer,
    event: eventReducer
});
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppState = ReturnType<typeof rootReducer>;

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState>)),
);

export default () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState>)));
    let persistor = persistStore(store);
    return { store, persistor }
}
