<script>
	$(function(){

var random = Math.floor(Math.random() * $('.item').length);
$('.item').hide().eq(random).show();
// Source: stackoverflow
	});