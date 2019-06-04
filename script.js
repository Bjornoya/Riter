<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyALR1FVA6oO_Jy16ofZJeB98BQR6JbHxKk&language=ru&region=RU"&callback=initMap" type="text/javascript"></script>
<script type="text/javascript">
var geocoder;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    document.getElementsByClassName('contacts-city__name')[0].innerHTML = 'Неизвестно';
}

function initialize() {
    geocoder = new google.maps.Geocoder();



}

function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                //find country name
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
                            //this is the object you are looking for
                            city= results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                cityData = city.short_name;
                cityDataClear = (cityData.substring(3));
                document.getElementsByClassName('contacts-city__name')[0].innerHTML = cityDataClear;


            } else {
                alert("Нет результатов");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
        if (cityDataClear == 'Москва') {
            document.getElementsByClassName('contacts-phone__link')[0].innerHTML = "8 800 2000 600";
            document.getElementsByClassName('contacts-phone__link')[0].href = "tel:+78002000600";
        } else {
            document.getElementsByClassName('contacts-phone__link')[0].innerHTML = "7 900 0000 777";
            document.getElementsByClassName('contacts-phone__link')[0].href = "tel:+79000000777";
        }
    });
}
</script>