import {Station} from "../components/StationPreview"

 export enum StationActionKey {
     FETCH : "FETCH"
 }


interface FetchStation{
    type : StationActionKey.FETCH,
    payload: Stations[]
        
}


type StationActions = |FetchStation;

export default const StationReducer (state:State, action:StationActions) => {
    
};