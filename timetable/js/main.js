
$(document).ready(function(){
	var times;
	$.ajax({
		beforSend: function(xhr){
			if(xhr.overrideMimeType){
				xhr.overrideMimeType("application/json");
			}
		}
	});
	function loadTime(){
		$.getJSON('data/main.json').done(function(data){
			times =data;
		}).fail(function(){
			$('event').html('Sorry! we could not load the time table at this moment.');
		});
	}
	loadTime();
//.......................................................................................
	$('#content').on('click','#event a', function(e){
		e.preventDefault();
		var loc =this.id.toUpperCase();
		
		var newContent ='';
		for(var i=0; i<time[loc].length;i++){
			newContent +='<li><span class="time">' + times[loc][i].time + '<span>';
			newContent +='<a href="description.html#';
			newContent +=times[loc][i].title.replace(/ /g,'_')+'">';
			newContent +=times[loc][i].title + '<a></li>';
		}
		$('#sessions').html('<ul>'+newContent+'</ul>');
		$('#event a.current').removeClass('current');
		$('this').addClass('current');
		$('#details').text('');
	});
//.......................................................................................
	$('#content').on('click','#sessions li a', function(e){
		e.preventDefault();
		var fragment = this.href;
		
		fragment = fragment.replace('#',' #');
		$('#details').load(fragment);
		
		$('#sessions a.current').removeClass('current');
		$(this).addClass('current');
		
		$('#container').remove();
		$('#content').load(url + '#container').hide().fadeIn('slow');
	});
})