var sceneEl = document.querySelector('a-scene');
//Eventually this in theory will be replaced by some kind of materials colorset.
var colors = ["green", "yellow", "orange", "red", "blue", "purple"];
var guesses = 3;

//Create and place a numnber of entities. Consider changing this to assign the mimic attribute later
//rather than creating it separately.
function createEntities() {
	var sceneEl = document.getElementById('scene');
	var mimicEl = document.createElement('a-entity');
	sceneEl.appendChild(mimicEl);
	mimicEl.setAttribute('geometry', {
  		primitive: 'cylinder',
  		height: 0.2,
  		radius: 0.1
		});
	mimicEl.setAttribute('is-mimic', true);
	mimicEl.setAttribute('material', 'color', 'orange');
	mimicEl.setAttribute('position', {x: -1, y: 1, z: -1});
	 mimicEl.addEventListener('click', function (evt) {
  		  if (mimicEl.getAttribute('is-mimic') == true) {
			    alert("YOU FOUND IT");
			  }
			  else {
			    guesses -= 1;
			    alert("Nope, try again");
			    console.log("You have " + guesses);
			  }
  			});
	//Add other entities
	for (var i = 0; i < 12; i++) {
	var el = document.createElement('a-entity');
	//Definitely separate this out and clean it up
  var shade = colors[Math.floor(Math.random() * colors.length)]
  var xpos = Math.floor(Math.random() * Math.floor(5));
  var ypos = Math.floor(Math.random() * Math.floor(5));
  var ypos = Math.floor(Math.random() * Math.floor(5));
	sceneEl.appendChild(el);	
	el.setAttribute('on-load', '');
  el.setAttribute('is-mimic', false);
  el.setAttribute('geometry', {
  primitive: 'cylinder',
  height: 0.5,
  radius: 0.25
  });
  el.setAttribute('material', 'color', shade);
  el.setAttribute('position', {x: xpos, y:ypos, z: -3});
  el.addEventListener('click', function (evt) {
  		  if (el.getAttribute('is-mimic') == true) {
			    alert("YOU FOUND IT");
			  }
			  else {
			    guesses -= 1;
			    alert("Nope, try again");
			    console.log("You have " + guesses);
			  }
  			});
	console.log(el.click);
}
}


function repeat(func, times) {
    func();
    --times && repeat(func, times);
}

AFRAME.registerComponent('control', {
  schema: {type: 'string'},
  init: function () {
  	createEntities();
    var stringToLog = this.data;
    //console.log("Controller created");
  }
});

AFRAME.registerComponent('log', {
  schema: {type: 'string'},
  init: function () {
    var stringToLog = this.data;
    console.log(stringToLog);
  }
});

//This is based on a bad understanding of what registering a component is, I think.

AFRAME.registerComponent('is-mimic', {
  schema: {type: 'string'},
  init: function () {
    var stringToLog = this.data;
    console.log("Hello, I am " + this + " and my mimic status is " + stringToLog);
  }
});

AFRAME.registerComponent('on-load', {
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    //For some reason setting the attributes isn't working from this function. Explore more.
      /*
      el.setAttribute('geometry', {
  		primitive: 'cylinder',
  		height: 0.5,
  		radius: 0.25
		});
	el.setAttribute('material', 'color', 'cyan');
	el.setAttribute('position', {x: 1 + (i/2), y: 2 + (i/2), z: -3});
	//el.object3D.position.set(1, 2, 3);
  */
	
  }
});

/*
function checkIfmimic() {
  if ("is-mimic" == true) {
    alert("YOU FOUND IT");
  }
  else {
    guesses -= 1;
    alert("Nope, try again");
    console.log("You have " + guesses);
  }
}
*/


/*
function appendObject(id, file, scale, position, rotation, scale) {
        $('<a-obj-model />', {
          id: id,
          class: 'city object children',
          position: position,  // doesn't seem to do anything, known issue
          scale: scale,
          rotation: rotation,
          file: file,
          src: '#' + file + '-obj',
          mtl: '#' + file + '-mtl',
          appendTo : $('#city')
        });
       document.getElementById(id).setAttribute("position", position); // this does set position as a workaround
      }
      */