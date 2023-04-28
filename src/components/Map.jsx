import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer, OverlayView, StreetViewPanorama } from '@react-google-maps/api';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CountrySelect from './SelectComp';
import TopOfAplication from './TopOfAplication';
import Navigation from './Navigation';
import { NativeSelect } from '@mui/material';
import FormControlLabelPosition from './FormControlLabelPosition';


const containerStyle = {
    width: '320px',
    height: '380px',
    borderRadius: '10px',
};

const Flagimage ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
]

const options = {
    imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/600px-Smiley.svg.png'
}// מקבץ סמיילי 

const options2 = {
    imagePath: 'https://placehold.co/600x40'
}// מקבץ דיפולטיבי אפור

function createKey(location) {
    return location.lat + location.lng;
}

function createLocation(location) {
  const locationsA=[];
  for (let index = 0; index < location.length; index++) {
    locationsA[index]={lat: location[index].AttractionsLatitude, lng:location[index].AttractionsLongitude }
  }
  console.log(locationsA)
  return locationsA;
  }
function createLocationSleep(location) {
    const locationsS=[];
    for (let index = 0; index < location.length; index++) {
      locationsS[index]={lat: location[index].SleepingCompLat, lng:location[index].SleepingCompLon }
    }
    console.log(locationsS)
    return locationsS;
  }
function createLocationTrip(location) {
    const locationsT=[];
    for (let index = 0; index < location.length; index++) {
      locationsT[index]={lat: location[index].TripsLatitude, lng:location[index].TripsLongitude }
    }
    console.log(locationsT)
    return locationsT;
  }
function createLocationAid(location) {
    const locationsAid=[];
    for (let index = 0; index < location.length; index++) {
      locationsAid[index]={lat: location[index].AidCompLat, lng:location[index].AidCompLon }
    }
    console.log(locationsAid)
    return locationsAid;
  }

function Map(props){

  const [attractionList, setAttractionList] = React.useState([]);// אטרקציות של המדינה שנבחרה
  const [sleepingList, setSleepingList] = React.useState([]);// מקומות לינה של המדינה שנבחרה
  const [aidCompListList, setAidCompListList] = React.useState([]);// מתחמי סיוע של המדינה שנבחרה
  const [tripList, setTripList] = React.useState([]);// הצעות לטיולים במדינה שנבחרה


  const handleChange = (event) => {
    setRowsPerPage(event.target.value);
    if (event.target.value=='בסביבה') {
        navigator.geolocation.getCurrentPosition(
            position => {
                setUserLocation({
                    userLat: position.coords.latitude,
                    userLng: position.coords.longitude
                })
                console.log(userLocation);
                setCenter({
                    lat: userLocation.userLat,
                    lng: userLocation.userLng
                })
            }
        )
    }
    else{
    const apiURL = 'http://localhost:65095/api/map/'
        fetch(apiURL + event.target.value, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
            // body: JSON.stringify({
            //     country: value
            // })
        })
            .then(response => {
                console.log('response= ', response);
                console.log('response statuse=', response.status);
                console.log('response.ok=', response.ok)

                return response.json()
            })

            .then(
                (result) => {
                    console.log("fetch get user by id=", result);
                    console.log(result[0]);
                    setcountryFromDB(result[0])
                  setCenter({
                    lat: result[0].CountryLat,
                    lng: result[0].CountryLon
                           })
                setAttractionList(createLocation(result[0].AttractionList))//// בעזרת השם אם זה עובד, תיווצר בפועל רשימה מסוג לוקיישן על פי הפורמט המקובל על גוגל
                setSleepingList(createLocationSleep(result[0].SleepingCompList))// מקומות לינה 
                setAidCompListList(createLocationAid(result[0].AidCompList))// מתחמי סיוע
                setTripList(createLocationTrip(result[0].tripList))// הצעות לטיולים
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
  };
  const [rowsPerPage, setRowsPerPage] = React.useState("בחר מדינה");

    const [map, setMap] = React.useState(null);

    const [countryFromDB, setcountryFromDB] = useState(
        {
          CountryLat: 0,
          CountryLon: 0

        }
    )//// מחזיק את כל הפרטים שיש לנו בדאטה בייס על המידה - נבנה כמערך שבמקום ה0 יש אובייקט שכולל גם הוא מערכים

    const [center, setCenter] = useState({
        lat: -37.765015,
        lng: 145.133858
    })

    const [userLocation, setUserLocation] = useState({
        userLat: 0,
        userLng: 0
    })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBilylcKkzkj1q9WF1klt1564bXNR2NIQE"
    })

    const onLoad = React.useCallback(function callback(map_) {
        setMap(map_);
        navigator.geolocation.getCurrentPosition(
          position => {
              setUserLocation({
                  userLat: position.coords.latitude,
                  userLng: position.coords.longitude
              })
              console.log(userLocation);
              setCenter({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              })
          }
      )

    }, []);/// בכניסה ראשונית למסך מפה- יקבע המרכז על פי המיקום של המשתמש

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    const locationClick=(cordinaint)=>{
      alert(cordinaint)
    }// זמני- בלחיצה על נקודה מסומנת איזה פעולה נרצה שתקה
    return isLoaded ? (
        <>
    <TopOfAplication label='מה יש לעולם להציע'/>

    <NativeSelect
        defaultValue={rowsPerPage}
        inputProps={{
        name: 'PageNum',
        id: 'uncontrolled-native',}}
        onChange={handleChange}
        sx={{ minWidth: 50, maxHeight:30, borderRadius: '20%', fontSize:'15px'}}>
            <option value={'בסביבה'}>בסביבה שלי</option>
            <option value={'הודו'}>הודו</option>
            <option value={'ברזיל'}>ברזיל</option>
            <option value={'אווקודור'}>אקוודור</option>
            <option value={'ארגנטינה'}>ארגנטינה</option>
            <option value={'בוליביה'}>בוליביה</option>
            <option value={'בורמה'}>בורמה</option>
            <option value={'נאפל'}>נאפל</option>
            <option value={'גוואטמלה'}>גוואטמלה</option>
            <option value={'ויאטנם'}>ויאטנם</option>
            <option value={'לאוס'}>לאוס</option>
            <option value={'סרילנקה'}>סרילנקה</option>
            <option value={'פיליפינים'}>פיליפינים</option>
            {/* <option value={'פנמה'}>פנמה</option>
            <option value={'פרו'}>פרו</option>
            <option value={'צילה'}>צילה</option>
            <option value={'קוסטה ריקה'}>קוסטה ריקה</option>
            <option value={'קמבודיה'}>קמבודיה</option>
            <option value={'תאילנד'}>תאילנד</option> */}
    </NativeSelect>
            <br />
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                onLoad={onLoad}
                onUnmount={onUnmount}>
            <MarkerClusterer options={options2}>
                    {(clusterer) =>
                        locations.map((location) => (
                            <Marker key={createKey(location)} position={location} clusterer={clusterer}             
                                icon={{
                                path:"M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                                fillColor: "yellow",
                                fillOpacity: 0.9,
                                scale: 2,
                                strokeColor: "gold",
                                strokeWeight: 2,
                              }}  />
                        ))
                    }
            </MarkerClusterer>

            <MarkerClusterer options={options}>
                    {(clusterer) =>
                        attractionList.map((location) => (
                            <Marker icon={Flagimage} key={createKey(location)} position={location} clusterer={clusterer} onClick={()=>{locationClick(createKey(location))}}/>
                        ))
                    }
            </MarkerClusterer>

            <MarkerClusterer options={options2}>
                    {(clusterer) =>
                        sleepingList.map((location) => (
                            <Marker key={createKey(location)} position={location} clusterer={clusterer} onClick={()=>{locationClick(createKey(location))}}/>
                        ))
                    }
            </MarkerClusterer>

            <MarkerClusterer options={options2}>
                    {(clusterer) =>
                        aidCompListList.map((location) => (
                            <Marker key={createKey(location)} position={location} clusterer={clusterer} onClick={()=>{locationClick(createKey(location))}}/>
                        ))
                    }
            </MarkerClusterer>
            
            <MarkerClusterer options={options2}>
                    {(clusterer) =>
                        tripList.map((location) => (
                            <Marker key={createKey(location)} position={location} clusterer={clusterer} onClick={()=>{locationClick(createKey(location))}}/>
                        ))
                    }
            </MarkerClusterer>

            </GoogleMap>
    <Navigation pagNav={'map'}/>
        </>
    ) : <></>
}

export default React.memo(Map)