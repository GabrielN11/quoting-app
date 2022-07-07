import React from 'react'
import { API_URL } from '../enviroment';
export const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [user, setUser] = React.useState(null);
    const [editingPublication, setEditingPublication] = React.useState(null)
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        if(user) loadCategories()
    }, [user])

    const loadCategories = React.useCallback(async function(){
        try{
          const json = await fetch(API_URL + '/category', {
            headers: {
              'Authorization': 'Bearer ' + user.token
            }
          })
          const resp = await json.json()
          if(json.status === 200) setCategories([{id: -1, name: 'All'}, ...resp.data])
        }catch(e){
          console.log(e)
        }finally{
        }
      }, [user])


    return (
        <GlobalContext.Provider value={{user, setUser, editingPublication, setEditingPublication, categories, loadCategories, setCategories}}>
            {children}
        </GlobalContext.Provider>
    )
}