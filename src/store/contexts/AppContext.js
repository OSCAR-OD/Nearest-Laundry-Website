import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/router";
import {createContext, useEffect, useReducer} from 'react';
import { appReducer } from '../reducers/appReducer';

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [appData, dispatch] = useReducer(appReducer, 
    {
      services: [],
      refer_code: null
    });

  // const [appData, dispatch] = useReducer(appReducer, [], () => {

  //   if (typeof window !== 'undefined') {
  //     const localData = localStorage.getItem('ref');
  //     return {
  //       services: [],
  //       refer_code: localData
  //     };
  //   }else{
  //     return {
  //       services: [],
  //       refer_code: null
  //     };
  //   }
  // });


  // set refer code to context
  useEffect(() => {
    // check if has refer in Query String
    if(searchParams.get('ref')){
        localStorage.setItem("ref", searchParams.get('ref'));
        dispatch({ type: "SET_REFER_CODE", refer_code: searchParams.get('ref') });
    }
  }, [searchParams]);


  return (
    <AppContext.Provider value={{ appData, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
 
export default AppContextProvider;