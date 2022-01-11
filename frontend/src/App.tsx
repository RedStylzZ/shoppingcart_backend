import React from 'react';
import './App.scss';
import ItemsPage from './pages/ItemsPage'
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ChangeItem from "./pages/ChangeItem";
import ItemController from "./controller/ItemController";
import {IListController, IItemController} from "./models/ShoppingItems";
import ListsPage from './pages/ListsPage';
import ListController from "./controller/ListController";

export default function App() {
    const listController: IListController = ListController()
    const itemController: IItemController = ItemController(listController)

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path={"/"} element={<ListsPage controller={listController}/>}/>
                    <Route path={"/lists/:name"} element={<ItemsPage controller={itemController}/>}/>
                    <Route path={"/changeItem/:listName/:name"} element={<ChangeItem controller={itemController}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
