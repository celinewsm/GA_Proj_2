

///////////////////PREVENT DEFAULT FOR EDIT ROUTE
$(function() {
  $('.edit-form').submit(function(e) {
    e.preventDefault();
    console.log(this)
    var currentId = $("#PUTid").val();
    var url = '/stalls/' + currentId
    var data = $(this).serialize();

    $.ajax({
      url: url,
      method: 'PUT',
      data: data
    }).done(function() {
      window.location.href = '/';
    });
  });
///////////////////PREVENT DEFAULT FOR EDIT ROUTE

///////////////////PREVENT DEFAULT FOR DEL ROUTE
  $('.delete-entry').submit(function(e) {
    e.preventDefault();
    var currentId = $("#PUTid").val();
    var url = '/stalls/' + currentId

    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function() {
      window.location.href = '/';
    });
  });
});
///////////////////PREVENT DEFAULT FOR DEL ROUTE


///////////////////SETTING UP MAPBOX
var mymap = L.map('mapid').setView([1.3521, 103.8198], 11)

 L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
   attribution: '<a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
   zoomControl: false,
   accessToken: 'pk.eyJ1IjoiZGF2aWZpZWQiLCJhIjoiY2lxYWoxMnF3MDF0Z2Z2bTZ6MHl3cWdiMyJ9.JhNjMNWSTxbGzp7ck3ahMA'
 }).addTo(mymap)
///////////////////SETTING UP MAPBOX


///////////////////LOADS DATA FROM STALLS TABLE
$.get("/stalls", function(data) {
  for (var i = 0; i < data.length; i++) {
      var lat = data[i].lat;
      var lng = data[i].lng;
      var id = data[i].id;
      if (lat !== null && lng !== null) {
        addMarker(lat, lng, id)
      }
  }
})
///////////////////LOADS DATA FROM STALLS TABLE


///////////////////ADDING MAPBOX MARKERS
function addMarker(lat, lng, cid) {
  var circle = L.circle([lat, lng], 80, {
    fillColor: "red",
    stroke: false
  })
  circle.id  = cid;
  circle.addTo(mymap).on('click', onClick);
}
///////////////////ADDING MAPBOX MARKERS


///////////////////GET / WITH MARKERS CLICKS
function onClick(e) {
  var currentId = e.target.id;
  var url = '/stallinfo/' + currentId;
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(data) {
    function populate() {
      $.get('/').done(function() {
        console.log(data);
        $('#GETid').val(data.id);
        $('#GETname').val(data.name);
        $('#GETaddress').val(data.address);
        $('#GETaccountMgr').val(data.accountMgr);
        $('#GETlastOrders').val(data.lastOrders);
        $('#GETcontactNo').val(data.contactNo);
        $('#PUTid').val(data.id);
        $('#PUTname').val(data.name);
        $('#PUTaddress').val(data.address);
        $('#PUTaccountMgr').val(data.accountMgr);
        $('#PUTlastOrders').val(data.lastOrders);
        $('#PUTcontactNo').val(data.contactNo);
        $('#DELid').val(data.id);
        $('#DELname').val(data.name);
        $('#DELaddress').val(data.address);
        $('#DELaccountMgr').val(data.accountMgr);
        $('#DELlastOrders').val(data.lastOrders);
        $('#DELcontactNo').val(data.contactNo);
      })
    }
    populate();
  });
}
///////////////////GET / WITH MARKERS CLICKS



///////////////////GET / SHOW FORMS
$(document).ready(function(){
    $("#getGETform").click(function(){
        $("#PUTform").hide();
        $("#POSTform").hide();
        $("#DELform").hide();
        $("#GETform").show();
    });
    $("#getPUTform").click(function(){
        $("#PUTform").show();
        $("#POSTform").hide();
        $("#DELform").hide();
        $("#GETform").hide();
    });
    $("#getPOSTform").click(function(){
        $("#PUTform").hide();
        $("#POSTform").show();
        $("#DELform").hide();
        $("#GETform").hide();
    });
    $("#getDELform").click(function(){
        $("#PUTform").hide();
        $("#POSTform").hide();
        $("#DELform").show();
        $("#GETform").hide();
    });
});
///////////////////GET / WITH MARKERS CLICKS
