import React from 'react';
import './App.scss';
import ItemsPage from './pages/ItemsPage'
import NavBar from './components/NavBar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChangeItem from "./pages/ChangeItem";
import ListsPage from './pages/ListsPage';
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";

export default function App() {
    return (
        <div className="App">
            <AuthProvider >
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path={"*"}
                               element={
                                   <RequireAuth>
                                       <ListsPage />
                                   </RequireAuth>
                               }/>
                        <Route path={"/lists/:name"}
                               element={
                                   <RequireAuth>
                                       <ItemsPage />
                                   </RequireAuth>
                               }/>
                        <Route path={"/changeItem/:listName/:id"}
                               element={
                                   <RequireAuth>
                                       <ChangeItem />
                                   </RequireAuth>
                               }/>
                        <Route path={"/login"} element={<LoginPage />}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
