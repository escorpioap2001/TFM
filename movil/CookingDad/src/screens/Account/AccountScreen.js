import React, {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { UserGuestScreen } from "./UserGuest";
import { UserLoggedScreen } from "./UserLoggedScreen";
import {LoadingModel} from "../../components"

export function AccountScreen() {
  const [logged, setLogged] = useState(null);

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      setLogged(user ? true : false);
    });
  });

  if(logged == null)
  {
    return <LoadingModel show text={"Cargando..."}/>
  }

  return logged ? <UserLoggedScreen /> : <UserGuestScreen />
}
