import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducers/userSlice';
import storage from 'redux-persist/lib/storage'; // Utilise le stockage local sous le capot
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import profileSlice from '../reducers/profileSlice';

// Configuration de Redux Persist
const rootPersistConfig = {
    key: 'root', // Le niveau le plus haut de persistance
    storage, // Définit le type de stockage, ici localStorage
    whitelist: ['user'] // Nom du slice que tu veux persister
};


// Configuring persist options for the auth reducer
const userPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['/* specify any auth state properties you want to persist */'],
};


// Création du reducer persisté
const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userSlice),
    profile : profileSlice
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Création du store Redux
export const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck :false
        })
});

// Création du persistor pour le store Redux
export const persistor = persistStore(store);

// L'export de 'persistor' est utilisé pour envelopper l'application avec <PersistGate> dans le fichier racine (par exemple index.js)
