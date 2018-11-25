import * as React from "react";
import StationPreview, {Station} from "./StationPreview";
import StationsService from "../services/StationsService";
import FilterButtons from "./FilterButtons";

import StationStore from "../flux/stores/StationStore";
import StationActions from "../flux/actions/StationActions";


interface SnowStationsAppState {
    stations: Station[];
}

export class SnowStationsApp extends React.Component<{}, SnowStationsAppState> {

    constructor(props:any){
        super(props);
        this.getStations = this.getStations.bind(this);
        this.state = {
            stations: StationStore.getStations()
        };
    }
    getStations() {
        this.setState({stations : StationStore.getStations()});
    }

    componentWillMount(){
        StationStore.on("change", this.getStations);
    }

    componentWillUnmount() {
        StationStore.removeListener("change", this.getStations);
    }

    componentDidMount(){
        StationActions.fetchStations();
    }

    render() {
        const { stations } = this.state;
        const stationList = stations.map((station : Station) => {
            return <StationPreview  key={station.skiResortId} station = {station} />;
        });

        return (<div>
                <FilterButtons />
                <main className="mdl-layout__content">
                    <div className="mdl-grid">
                        {stationList}
                    </div>
                </main>
            </div>
        );
    }
}
