import axios from "axios";
import {Station} from "../components/StationPreview"

export default class StationsService {

 

    static distance(lat1: number, lon1: number, lat2: number, lon2: number) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344 
            return dist;
        }
    }
    static sort(stations: Station[]){
        let Latitude = 46.53381;
        let Longitude = 6.59137;
        return stations.sort(function(s1,s2) { 
            return StationsService.distance(Latitude, Longitude, s1.latitude, s1.longitude) - StationsService.distance(Latitude, Longitude, s2.latitude, s2.longitude)
        });
    }
    
    static filterFar(stations: Station[]){
        let Latitude = 46.53381;
        let Longitude = 6.59137;
        return stations.filter((s)=>{
            return StationsService.distance(Latitude, Longitude, s.latitude, s.longitude) < 100;
        });
    }  
    
    static filterClosed(stations: Station[]){
        return stations.filter((s)=>{
            try {
                return new Date(s.seasonStart).getTime() - new Date().getTime() < 0 && new Date(s.seasonStart).getFullYear() - new Date().getFullYear() === 0 && s.ski.openKm > 0 && s.facilities.open > 0;
            } catch (e) {
                return false;
            }
        });
    }



}

