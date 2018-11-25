import * as React from "react";
import StationPreview, {Station} from "./StationPreview";
import StationsService from "../services/StationsService";
import StationActions from "../flux/actions/StationActions";


export default class FilterButtons extends React.Component<{},{}> {
     
    handleSortStations(e:any){
        e.preventDefault();
        StationActions.sort();
    }

    handleFilterClosed(e:any){
        e.preventDefault();
        StationActions.filterClosed();
    }

    render() {

        return (
            <header className="mdl-layout__header mdl-layout__header--scroll">
                <img className="mdl-layout-icon"/>
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout__title">Snow App</span>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <a className="mdl-navigation__link" onClick={(e) =>{this.handleSortStations(e)}} href="">Sort By distance</a>
                        <a className="mdl-navigation__link" onClick={(e) =>{this.handleFilterClosed(e)}} href="">Filter closed</a>

                    </nav>
                </div>
            </header>
        );

    }
}
