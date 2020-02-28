import React, {useState, useEffect, useRef} from "react";
import {isAuthenticated, getBloodBanks, getReceivers} from "./index";
import Particles from "../../Home/ParticleContainer";
import classes from "./DonorSignup.module.css";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";
import GreenMarker from '../../Assets/GreenMarker.svg'
import {forEach} from "react-bootstrap/cjs/ElementChildren";


const Donor = () => {
    const mapRef = useRef();
    const [currentLatitude, setCurrentLatitude] = useState(12);
    const [currentLongitude, setCurrentLongitude] = useState(12);
    const [nearbyLatitude, setNearbyLatitude] = useState(null);
    const [nearbyLongitude, setNearbyLongitude] = useState(null);
    const [Data_BloodBank, setData_BloodBank] = useState(null);
    const [Data_Receiver, setData_Receiver] = useState(null);
    const [error, setError] = useState(null);

    const getLoc = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setCurrentLatitude(position.coords.latitude);
                    setCurrentLongitude(position.coords.longitude);
                },
                error => this.setState(console.log(error))
            );
        }
    };


    useEffect(() => {
        getBloodBanks().then(data => {
            if (data.error)
                setError(data.error);
            //this.setState({ error: data.error, loading: false });
            else {
                setData_BloodBank(data);
                setNearbyLatitude(data.latitude);
                setNearbyLongitude(data.longitude);
                console.log(data)
            }
        });

        getReceivers().then(data=>{
            if(data.error) setError(data.error);
            else{
                setData_Receiver(data);
                console.log("R: ");
                console.log(data)
            }
        })

        getLoc();
    }, []);

    React.useLayoutEffect(() => {
        if (!mapRef.current) return;
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "GNlK1kK3P7tTxS5vrdpv4QcgVHRjxQ-DJarCupZQms0"
        });
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: {lat: currentLatitude, lng: currentLongitude},
            zoom: 12,
            pixelRatio: window.devicePixelRatio || 1
        });

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

        const ui = H.ui.UI.createDefault(hMap, defaultLayers);

        const customIcon = new H.map.Icon(BlueMarker);
        const donorLocation = new H.map.Marker(
            {lat: currentLatitude, lng: currentLongitude},
            {icon: customIcon}
        );


        const bloodbankMarkerIcon = new H.map.Icon(RedMarker);
        const bloodbankMarker = new H.map.Marker(
            {lat: nearbyLatitude, lng: nearbyLongitude},
            {icon: bloodbankMarkerIcon}
        );
        hMap.addObject(bloodbankMarker);


        const recieverMarkerIcon = new H.map.Icon(GreenMarker);
        const recieverMarker = new H.map.Marker(
            {lat: 22.4989, lng: 88.3714},
            {icon: recieverMarkerIcon}
        );

        hMap.addObject(donorLocation);

        hMap.addObject(recieverMarker);

        return () => {
            hMap.dispose();
        };
    }, [mapRef, currentLatitude, currentLongitude]);

    document.body.className = classes.bcg;

    const MapContainer = () => {
        return (
            <div className={classes.mapContainer}>
                <div
                    className="map"
                    ref={mapRef}
                    style={{height: "74vh"}}
                />

                <div>
                    <div className={classes.mapInfoContainer}>
                        <img src={BlueMarker} alt="" height="50ox" width="50px"/>
                        <div style={{padding: "10px"}}>You are here</div>
                    </div>
                    <div className={classes.mapInfoContainer}>
                        <img src={RedMarker} alt="" height="50ox" width="50px"/>
                        <div style={{padding: "10px"}}>Nearby Blood Banks</div>
                    </div>
                    <div className={classes.mapInfoContainer}>
                        <img src={GreenMarker} alt="" height="50ox" width="50px"/>
                        <div style={{padding: "10px"}}>Needs Blood</div>
                    </div>
                </div>
            </div>
        );
    };

    const renderNearbyBloodBanks = () => {
        if (Data_Receiver) {
            return (
                <div>
                    <h2>Reciever {Data_Receiver.name}</h2>
                </div>
            )
        }
    }

    const renderNearbyRecievers = () => {
        if (Data_BloodBank) {
            return (
                <div>
                    <h2>Blood Bank {Data_BloodBank.name}</h2>
                </div>
            )
        }
    }

    return (
        <>
            {isAuthenticated() ? (<div className={classes.donorPageContainer}>
                <Particles/>
                {MapContainer()}
                <div className={classes.mainContainer}>
                    <h2 style={{
                        padding: "1vh",
                        backgroundColor: "white",
                        margin: "1vw"
                    }}>Welcome, {isAuthenticated().donor.name}!</h2>
                    <div className={classes.InfoContainer}>
                        <div className={classes.arrayContainer}>
                            {renderNearbyBloodBanks()}
                        </div>
                        <div className={classes.arrayContainer}>
                            {renderNearbyRecievers()}
                        </div>
                    </div>
                </div>

            </div>) : <h1>please Login</h1>}
        </>
    );
};

export default Donor;
