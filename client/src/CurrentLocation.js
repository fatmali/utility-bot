import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  main: {
    display: 'flex'
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  button: {
    display: 'flex',
    height: 60,
    width: '100%',
    backgroundColor: '#0084ff',
    textDecoration:'none',
    position: 'absolute', 
    bottom: 15,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 0,
    fontSize: 20,
    fontWeight: 'bold'
  },
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      physicalAddress: ''
    };
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  handleClick = async () => {
    let physicalAddress
    const { lat, lng } = this.state.currentLocation
    try{
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`)
     .then((result) => result.json())
     .then(data => {
       let address = data.results.find(result => result.formatted_address)
       if(address) {
         physicalAddress = address.formatted_address || 'unknown address'
       }
     })   

    } catch (error){
          console.log(error)
        }
    
        try{
    await fetch('/location', {
        method: 'POST', 
        cache: 'no-cache', 
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: physicalAddress, senderID: this.props.senderID }) 
        });
      } catch (error){
        console.log(error)
      }
    // window.location.replace('https://www.messenger.com/closeWindow/?image_url=https://ibb.co/Fn1pgdp&display_text="location shared"')
  }

  render() {
   return (
     <div style={mapStyles.main}>
       <div style={mapStyles.map} ref="map">
         Loading map...
       </div>
       {this.renderChildren()}
       <div>
         <button onClick={this.handleClick} style={mapStyles.button}>Share</button>
       </div>
     </div>
   );
 }



}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};
