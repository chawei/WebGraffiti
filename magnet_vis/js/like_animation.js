function add_likes(likeString,amount) {
	
	console.log(likeString,amount);
	
	// Get box2d elements
//	elements = getElementsByClass("box2d");
	
	// previous amount
	var preAmount = elements.length;	
		
	for (var i = 0; i < amount; i++) {
		var element = $('<div>'+likeString+'</div>');
		var top = 100-Math.random()*100;
		var left = Math.random()*600+100;
		element.css('top',top+'px');
		element.css('left',left+'px');
		console.log(top,left);
		$('body').append(element);
		
		element = element[0];
		
		elements.push(element);
		var index = preAmount+i;
		properties[index] = findPos(element);
		properties[index][2] = element.offsetWidth;
		properties[index][3] = element.offsetHeight;
	
	}
		
		for (var i = 0; i < amount; i++) {
			var element = elements[preAmount+i];
			
			element.style.position = 'absolute';
			element.style.left = properties[preAmount+i][0] + 'px';
			element.style.top = properties[preAmount+i][1] + 'px';
			// element.style.backgroundColor = '#ffff00';
			
			bodies[preAmount+i] = createBox(world, properties[preAmount+i][0] + (properties[preAmount+i][2] >> 1), properties[preAmount+i][1] + (properties[preAmount+i][3] >> 1), properties[preAmount+i][2] / 2, properties[preAmount+i][3] / 2, false);		
		}
}