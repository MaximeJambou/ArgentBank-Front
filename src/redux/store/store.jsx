import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducers/userSlice';
import storage from 'redux-persist/lib/storage'; // Utilise le stockage local sous le capot
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Configuration de Redux Persist
const persistConfig = {
    key: 'root', // Le niveau le plus haut de persistance
    storage, // Définit le type de stockage, ici localStorage
    whitelist: ['user'] // Nom du slice que tu veux persister
};

// Création du reducer persisté
const rootReducer = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux
export const store = configureStore({
    reducer: userSlice,
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck :false
        })
});

// Création du persistor pour le store Redux
export const persistor = persistStore(store);

// L'export de 'persistor' est utilisé pour envelopper l'application avec <PersistGate> dans le fichier racine (par exemple index.js)
