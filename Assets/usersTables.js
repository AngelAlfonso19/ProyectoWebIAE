$(document).ready(function() {
    $('#dataTable').DataTable();
});

$('#dataTable').DataTable( {
    "lengthChange": false,
    "searching":false,
    "ordering": false,
    "info": false,
    "paging":false
} );