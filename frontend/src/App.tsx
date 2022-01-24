import React, {useState} from 'react';
import './App.scss';
import ItemsPage from './pages/ItemsPage'
import NavBar from './components/NavBar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChangeItem from "./pages/ChangeItem";
import ItemController from "./controller/ItemController";
import {IItem, IItemController, IList, IListController, ILoginController, TOKEN_KEY} from "./models/ShoppingItems";
import ListsPage from './pages/ListsPage';
import ListController from "./controller/ListController";
import LoginController from "./controller/LoginController";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";

export default function App() {
    const [items, setItems] = useState<IItem[]>([])
    const [lists, setLists] = useState<IList[]>([])
    const [config, setConfig] = useState({headers: {Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`}})

    const loginController: ILoginController = LoginController()
    const itemController: IItemController = ItemController(setItems, config)
    const listController: IListController = ListController(setLists, config)

    return (
        <div className="App">
            <AuthProvider setConfig={setConfig}>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path={"*"}
                               element={
                                   <RequireAuth>
                                       <ListsPage controller={listController} lists={lists}/>
                                   </RequireAuth>
                               }/>
                        <Route path={"/lists/:name"}
                               element={
                                   <RequireAuth>
                                       <ItemsPage controller={itemController} items={items}/>
                                   </RequireAuth>
                               }/>
                        <Route path={"/changeItem/:listName/:id"}
                               element={
                                   <RequireAuth>
                                       <ChangeItem controller={itemController}/>
                                   </RequireAuth>
                               }/>
                        <Route path={"/login"} element={<LoginPage controller={loginController}/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
