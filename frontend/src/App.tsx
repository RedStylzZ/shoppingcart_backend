import React, {useEffect, useState} from 'react';
import './App.scss';
import ItemsPage from './pages/ItemsPage'
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ChangeItem from "./pages/ChangeItem";
import ItemController from "./controller/ItemController";
import {
    IItem,
    IList,
    IListController,
    IItemController, ILoginController, ITokenConfig
} from "./models/ShoppingItems";
import ListsPage from './pages/ListsPage';
import ListController from "./controller/ListController";
import ItemAPIController from "./controller/ItemAPIController";
import ListAPIController from "./controller/ListAPIController";
import LoginAPIController from "./controller/LoginAPIController";
import LoginController from "./controller/LoginController";
import LoginPage from "./pages/LoginPage";

export default function App() {
    const STORAGE_KEY = "shopping_token"
    const [items, setItems] = useState<IItem[]>([])
    const [lists, setLists] = useState<IList[]>([])
    const [token, setToken] = useState(localStorage.getItem(STORAGE_KEY) || "")

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, token)
    }, [token])

    const config: ITokenConfig = {
        headers: {'Authorization': `Bearer ${token}`}
    }

    const itemAPIController: IItemController = ItemAPIController(config);
    const listAPIController: IListController = ListAPIController(config);
    const loginAPIController: ILoginController = LoginAPIController();
    const loginController: ILoginController = LoginController(loginAPIController)
    const itemController: IItemController = ItemController(itemAPIController, setItems)
    const listController: IListController = ListController(listAPIController, setLists)

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path={"*"} element={<LoginPage controller={loginController} setter={setToken}/>}/>
                    <Route path={"/lists"} element={<ListsPage controller={listController} lists={lists}/>}/>
                    <Route path={"/lists/:name"} element={<ItemsPage controller={itemController} items={items}/>}/>
                    <Route path={"/changeItem/:listName/:id"} element={<ChangeItem controller={itemController}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
