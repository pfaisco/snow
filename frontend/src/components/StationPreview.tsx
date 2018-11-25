import * as React from "react";
import StationsService from "../services/StationsService"

interface StationPreviewProps {
    station : Station
}

export default class StationPreview extends React.Component<StationPreviewProps, {}> {
    constructor(props : StationPreviewProps){
        super(props);
    }

    distance(){
        const {station}= this.props;
        let Latitude = 46.53381;
        let Longitude = 6.59137;
        return StationsService.distance(Latitude, Longitude, station.latitude, station.longitude).toPrecision(5);
    }

    img() {
        const {webcams} = this.props.station.images;
        return webcams.map((cam)=>{
            return cam["1x"];
        });
    }

    render() {

        const {station}= this.props;
        try {
            return  (
                <div className="mdl-cell mdl-cell--4-col sttion-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">        
                            {station.skiResortName} 
                        </h2>
                    </div>
                    <div className="">
                        <div className="mdl-grid">
                            {this.img().map((image, key) => 
                                            <div className="mdl-cell mdl-cell--6-col" key={key}>
                                                <img src={image} />
                                            </div>)}
                        </div>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <div className="mdl-grid">

                            <dl className="mdl-cell mdl-cell--4-col">
                                <dt>Season Start</dt>
                                <dd>{station.seasonStart}</dd>
                                <dt>Distance</dt>
                                <dd>{this.distance()}</dd>
                            </dl>
                            <dl className="mdl-cell mdl-cell--4-col">
                                <b>Facilities </b>
                                <dt>Total </dt>
                                <dd>{station.facilities.total}</dd>
                                <dt>Open</dt>
                                <dd>{station.facilities.open}</dd>
                            </dl>
                            <dl className="mdl-cell mdl-cell--4-col">
                                <b>Ski </b>

                                <dt>Total </dt>
                                <dd>{station.ski.totalKm}</dd>
                                <dt>Open</dt>
                                <dd>{station.ski.openKm}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"  href={`api/station/${station.skiResortId}`}>
                            Show Station
                        </a>
                    </div>
                </div>);
        } catch (e){
            console.log("Station filtered");
            return <div></div>;
        }
    }


}

export interface Station {
    isTopDestination: boolean;
    hasTobogganingFacilities: boolean;
    crossCountry: CrossCountry;
    images: Images;
    skiRegionName: SkiRegionName;
    seasonStart: string;
    seasonEnd: string;
    hasSkiFacilities: boolean;
    latitude: number;
    hiking: Hiking;
    skiResortAlternativeNames: string[];
    ski: Ski;
    tobogganing: Tobogganing;
    infoOutOfDate: boolean;
    hasCrossCountryFacilities: boolean;
    skiResortName: string;
    hasHikingFacilities: boolean;
    weather: Weather;
    skiResortId: string;
    hasFunparkFacilities: boolean;
    facilities: Facilities;
    email: string;
    longitude: number;
    snowboard: Snowboard;
}

export interface CrossCountry {
    totalKm: number;
    openKm: number;
}

export interface Tablet {
    "2x": string;
"1x": string;
}

export interface Webcam {
    "1x": string;
}

export interface Portrait {
    "4x": string;
"3x": string;
"2x": string;
"1x": string;
}

export interface Landscape {
    "4x": string;
"3x": string;
"2x": string;
"1x": string;
}

export interface Images {
    tablet: Tablet[];
    webcams: Webcam[];
    portrait: Portrait[];
    landscape: Landscape[];
}

export interface SkiRegionName {
    de: string;
    en: string;
    it: string;
    fr: string;
}

export interface Hiking {
    totalKm: number;
    openKm: number;
}

export interface Ski {
    totalKm: number;
    openKm: number;
}

export interface Tobogganing {
    totalKm: number;
    openKm: number;
}

export interface Forecast {
    date: string;
    temperatureCelsius: number;
    conditionCode: number;
}

export interface Weather {
    srf_url: string;
    snowDepthArenaHighCm: number;
    conditionCodeSnow: number;
    forecasts: Forecast[];
}

export interface Facilities {
    total: number;
    open: number;
}

export interface Snowboard {
    total: number;
    open: number;
}

