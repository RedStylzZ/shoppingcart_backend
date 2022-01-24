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
    IItemController, ILoginController
} from "./models/ShoppingItems";
import ListsPage from './pages/ListsPage';
import ListController from "./controller/ListController";
import ItemAPIController from "./controller/ItemAPIController";
import ListAPIController from "./controller/ListAPIController";
import LoginAPIController from "./controller/LoginAPIController";
import LoginController from "./controller/LoginController";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";

export default function App() {
    const [items, setItems] = useState<IItem[]>([])
    const [lists, setLists] = useState<IList[]>([])

    const itemAPIController: IItemController = ItemAPIController();
    const listAPIController: IListController = ListAPIController();
    const loginAPIController: ILoginController = LoginAPIController();
    const loginController: ILoginController = LoginController(loginAPIController)
    const itemController: IItemController = ItemController(itemAPIController, setItems)
    const listController: IListController = ListController(listAPIController, setLists)

    return (
        <div className="App">
            <AuthProvider>
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
