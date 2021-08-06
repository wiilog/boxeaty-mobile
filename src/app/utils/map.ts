import Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = `/assets/leaflet/`

export class Map {

    public static readonly DEFAULT_OPTIONS = {
        zoomControl: false,
        attributionControl: false
    };

    private id: string;
    private map: any;
    private locations: Array<any> = [];

    public static create(id, options = this.DEFAULT_OPTIONS) {
        const map = new Map();
        map.id = id;
        map.map = Leaflet.map(id, options);
        map.map.setView([46.467247, 2.960474], 5);
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.map);

        return map;
    }

    public addMarker(location) {
        const existing = this.locations.find(l => l.latitude === location.latitude && l.longitude === location.longitude);
        if (existing) {
            return;
        }

        const marker = Leaflet.marker([location.latitude, location.longitude]);

        this.map.addLayer(marker);
        location.marker = marker;
        this.locations.push(location);
    }

    public setMarkers(locations, fit = true) {
        for (const location of this.locations) {
            this.removeMarker(location);
        }

        for (const location of locations) {
            this.addMarker(location);
        }

        if (fit) {
            this.fitBounds();
        }
    }

    public removeMarker(location) {
        this.map.removeLayer(location.marker);
        this.locations.splice(this.locations.indexOf(location), 1);
    }

    public fitBounds() {
        const bounds = [];
        for (const location of this.locations) {
            bounds.push(Leaflet.latLng(location.latitude, location.longitude));
        }

        this.map.flyToBounds(Leaflet.latLngBounds(bounds), {
            paddingTopLeft: [0, 30],
            maxZoom: 12,
        });
    }

    public reinitialize() {
        document.getElementById(this.id).innerHTML = `<div id="map"></div>`
    }
}
