let platform = new H.service.Platform({
    'apikey': 'mBarA4tz5cuDEoGxk-LFvZaNTvAyvZW13u6AaHx0EvM'
  });



function landmarkGeocode() {
    let title = document.querySelector("h1").textContent;
    var geocoder = platform.getGeocodingService(),
      landmarkGeocodingParameters = {
        searchtext: title,
        jsonattributes : 1
      };
  
    geocoder.search(
      landmarkGeocodingParameters,
      showMap,
      () => console.log(e)
    );
  }

function showMap(result) {
    let location = result.response.view[0].result[0].place.locations[0].displayPosition;
    let latitude = location.latitude;
    let longitude = location.longitude;
    // Obtain the default map types from the platform object:
    let defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: latitude, lng: longitude }
    });
    // Enable the event system on the map instance:
    let mapEvents = new H.mapevents.MapEvents(map);
    let behavior = new H.mapevents.Behavior(mapEvents);
    let ui = H.ui.UI.createDefault(map, defaultLayers);
    let marker = new H.map.Marker({lat:latitude, lng:longitude});
    map.addObject(marker);

  }
  landmarkGeocode();