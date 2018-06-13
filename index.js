/*
-Create list of available spaces. 
-Populate list with objects. 
-Assign one the attribute of Mimic. 
-Implement controls such the the player may interact with an object
	-Pointing controller at it should highlight the object
	-Trigger or button interaction should either make a guess, or ask if you want to make a guess
-Probably not picking up or anything, just examining.
-Implement dialogue box with choice of 'accuse' or 'close' on interact. 
-Implement descriptions with variables. 
-Implement AI for the mimic object
	-When the camera is not pointed at the mimic, occasionally it should move a little or change something about itself.
-Consider having the lighting come from the player's off hand, in the form of a lantern they can direct.
-Implement logic for guessing
	-If the selected object is a mimic, player wins.
	     -Win state could be forcing the mimic into its natural state and capturing it in a jar. Cute.
	-else if remaining guesses > 0 && time left > 0, guesses -- and close dialog box.
		    -Consider marking the object so that they player does not waste guesses on the same object by accident
	-else if no guesses || no time, lose. Mimic eats or otherwise wins against player.
*/
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
	mimicEl.setAttribute('material', 'color', 'purple');
	mimicEl.setAttribute('position', {x: -2, y: 1, z: -4});
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
  //As per the docs, click doesn't work this way for 3d elements.
  el.addEventListener('click', function (evt) {
  		  if ("is-mimic" == true) {
			    alert("RAR YOU FOUND IT");
			  }
			  else {
			    guesses -= 1;
			    alert("Nope, try again");
			    console.log("You have " + guesses);
			  }
  			});
	console.log('Blank entity ' + i + ' added.');
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
    console.log("Hello, my mimic status is " + stringToLog);
  }
});

AFRAME.registerComponent('on-load', {
  init: function () {
    // This will be called after the entity has properly attached and loaded.
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
	
    console.log('I am ready!');
  }
});

function checkIfmimic() {
  if ("is-mimic" == true) {
    alert("RAR YOU FOUND IT");
  }
  else {
    guesses -= 1;
    alert("Nope, try again");
    console.log("You have " + guesses);
  }
}


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

