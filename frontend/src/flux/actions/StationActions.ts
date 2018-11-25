import Dispatcher from "../Dispatcher";
import {StationActionType} from "../stores/StationStore"
import axios from "axios";
import StationsService from "../../services/StationsService"



export default class StationActions {

    static sort()  {
        Dispatcher.dispatch({ type : StationActionType.SORT });
    }  

    static filterClosed()  {
        Dispatcher.dispatch({type:StationActionType.FILTER});
    }

    static fetchStations() {
        axios.get("/api/station")
            .then((response)=>{
            Dispatcher.dispatch(
                {
                    type:StationActionType.RECIEVE_STATIONS,
                    stations: StationsService.sort(StationsService.filterClosed(response.data.skiResorts)) 
                });
        });
    }


}