declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps {
  interface MapOptions {
    center: LatLngLiteral;
    zoom: number;
    styles?: MapTypeStyle[];
    mapTypeId?: string;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    zoomControl?: boolean;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers?: { [key: string]: any }[];
  }

  interface MarkerOptions {
    position: LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Icon;
    animation?: Animation;
  }

  interface Icon {
    url: string;
    scaledSize?: Size;
    fillColor?: string;
    fillOpacity?: number;
    strokeWeight?: number;
    strokeColor?: string;
    scale?: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface InfoWindowOptions {
    content: string;
    maxWidth?: number;
  }

  interface CircleOptions {
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    fillColor: string;
    fillOpacity: number;
    map: Map;
    center: LatLngLiteral;
    radius: number;
  }

  class Map {
    constructor(element: HTMLElement, options: MapOptions);
    setCenter(latLng: LatLngLiteral): void;
    setZoom(zoom: number): void;
  }

  class Marker {
    constructor(options: MarkerOptions);
    addListener(eventName: string, handler: () => void): void;
    setMap(map: Map | null): void;
    getPosition(): LatLng;
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, marker: Marker): void;
    close(): void;
    getMap(): Map | null;
  }

  class Circle {
    constructor(options: CircleOptions);
    setMap(map: Map | null): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  enum Animation {
    DROP = 2
  }
} 