var baseLayer =new L.StamenTileLayer("toner-lite");
    
var markerLayer = null;

function setColor(year) {
	return year > 2009 ? "#0868ac" :
	       year > 1999 ? "#2b8cbe" : 
	       year > 1989 ? "#7bccc4" : 
	                     "#bae4bc";
}

function style(feature) {
    return {
        fillColor: setColor(feature.properties.Year),
        color: "white",
        fillOpacity: 0.9,
        width: 0.2
    };
}
	
$.getJSON("data/HabitatAddresses.geojson", function(data) {
    markerLayer = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker (latlng, style(feature));

    },
    onEachFeature: function(feature, layer) {            
        var props = layer.feature.properties;
        
        layer.bindPopup("<b>"+props.ADDRESS+"</b>"+"<br>"+"Year: "+props.Year);
            
    }
});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += 'Decade Constructed'+ "<br>";
    
    years = [1988, 1990, 2000, 2010];
    labels = ['1980s','1990s','2000s','2010s'];
    
    for (var i = 0; i < years.length; i++) {
        div.innerHTML +=
            '<i class="circle" style="background:' + setColor(years[i]) + '"></i> ' +
             (years[i] ? labels[i] + '<br>' : '+');
    }
    
    return div;
};

	var map = L.map('map', {maxZoom: 17}).fitBounds(markerLayer.getBounds());
	baseLayer.addTo(map);
	markerLayer.addTo(map);
	legend.addTo(map);
	
});