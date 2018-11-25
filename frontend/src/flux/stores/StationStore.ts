import { EventEmitter } from "events";
import { Station } from "../../components/StationPreview"
import StationsService from "../../services/StationsService"
import Dispatcher from "../Dispatcher";


export interface StationAction{
    type : StationActionType;
    stations :  Station[];
}

export enum StationActionType{
    SORT, FILTER, FETCH, RECIEVE_STATIONS
}

class StationStore extends EventEmitter {
    private stations : Station[];
    constructor() {
        super();
        this.stations = [];
    }

    public getStations () : Station[]{
        return this.stations;
    }

    sort() : void {
        this.stations = StationsService.sort(this.stations);
        this.emit("change");
    }

    filterClosed(){
        this.stations =  StationsService.filterClosed(this.stations);
        this.emit("change");
    }

    recieve(stations : Station[]){
        this.stations =  stations;
        this.emit("change");
    }

    public handleActions(action:StationAction){
        switch(action.type) {
            case StationActionType.SORT:
                this.sort();
                break;
            case StationActionType.FILTER:
                this.filterClosed();
                break;
            case StationActionType.RECIEVE_STATIONS:
                this.recieve(action.stations);
                break;
        }
    }

}
const stationStore = new StationStore;
Dispatcher.register(stationStore.handleActions.bind(stationStore));
export default stationStore;