import React, {useState} from 'react';
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
    IItemController
} from "./models/ShoppingItems";
import ListsPage from './pages/ListsPage';
import ListController from "./controller/ListController";
import ItemAPIController from "./controller/ItemAPIController";
import ListAPIController from "./controller/ListAPIController";

export default function App() {
    const [items, setItems] = useState<IItem[]>([])
    const [lists, setLists] = useState<IList[]>([])
    const itemAPIController: IItemController = ItemAPIController();
    const listAPIController: IListController = ListAPIController();
    const itemController: IItemController = ItemController(itemAPIController, setItems)
    const listController: IListController = ListController(listAPIController, setLists)

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path={"/"} element={<ListsPage controller={listController} lists={lists}/>}/>
                    <Route path={"/lists/:name"} element={<ItemsPage controller={itemController} items={items}/>}/>
                    <Route path={"/changeItem/:listName/:id"} element={<ChangeItem controller={itemController}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
