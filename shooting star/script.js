var star =
	{
		IMAGE: "TileSheet.png",
		SIZE: 64,
		COLUMNS: 3,
		currentFrame: 0, //first
		numberOfFrames: 5, //last  
		sourceX: 0,
		sourceY: 0,
		HIDING: 0,
		JUMPING: 1,
		HIT: 2,
		state: this.HIDING,
		forward: true,
		waitTime: undefined,
		timeToReset: 3,
		resetCounter: 0,
		findWaitTime: function() { this.waitTime = Math.ceil(Math.random() * 60); },
		updateAnimation: function() {
			if (play) {
				this.sourceX = Math.floor(this.currentFrame % this.COLUMNS) * this.SIZE;
				this.sourceY = Math.floor(this.currentFrame / this.COLUMNS) * this.SIZE;
				if(this.state !== this.HIT)
					if(this.waitTime > 0 || this.waitTime === undefined)
						this.state = this.HIDING;
				else
					this.state = this.JUMPING;

				switch(this.state)
				{
					case this.HIDING:
					this.currentFrame = 0;
					this.waitTime--;
					break;

					case this.JUMPING:
					if(this.currentFrame === this.numberOfFrames)
						this.forward = false;
					if(this.currentFrame === 0 && this.forward === false)
					{
						this.forward = true;
						this.findWaitTime();
						this.state = this.HIDING;
						break;
					}
					if(this.forward)
						this.currentFrame++;
					else
						this.currentFrame--;
					break;

					case this.HIT:
					this.currentFrame = 6;
					this.resetCounter++;
					if(this.resetCounter === this.timeToReset)
					{
						this.resetCounter = 0;
						this.forward = true;
						this.currentFrame = 0;
						this.state = this.HIDING;
						this.findWaitTime();
					}
					break;
				} // sw
			} // if
		}, // f
		//clean: function() { 
		//	if (this.state != this.HIDING)
		//		this.state = this.HIDING;},
	};

	var play = false;
	var end = false;
	var count = 0;
	var t = 0;
	var k = 0;

	var image = new Image();
	image.src = "images/" + star.IMAGE;




	/*res.addEventListener("click", restart, false);*/
	button.addEventListener("click", start, false);
	image.addEventListener("load", loadHandler, false);

	var ROWS = 3;
	var COLUMNS = 3;
	var SPACE = 8;
	var SIZE = star.SIZE; 

	var starObjects = [];
	var starCanvases = [];
	var starDrawingSurfaces = [];

	var records = 0;
	var starsHit = 0;
	var output = document.querySelector("#output");
	var name = document.querySelector("#name");

	var gameTimer = 
	{
		time: 0,
		interval: undefined,
		start: function() 
		{
			var self = this;
			if (count < 1) 
				this.interval = setInterval(function(){self.tick();}, 1000); 
		},

		tick: function() 
		{
			if (play)
				this.time--; 
		},

		stop: function() 
		{
			if (play)
				clearInterval(this.interval); 
		},

		reset: function() 
		{
			this.time = 0; 
		}
	};

//------------------------------------------------------------------------

	

	function start()
	{
		if (play == false) {
			play = true;
			count++;
			t++
		}
	}

	function restar()
	{
		if (!play && count >= 1) {
			count = 0;
			starsHit = 0;
			gameTimer.time = 30;
			updateAnimation();

			//starObjects[i].clean();
			
			starObjects[i].updateAnimation();
			render();
		}
	}


	function loadHandler()
	{
		buildMap();
		gameTimer.time = 30;
		updateAnimation();
	}

	function buildMap()
	{
		for(var row = 0; row < ROWS; row++)
				for(var column = 0; column < COLUMNS; column++)
				{
					var newstarObject = Object.create(star);
					var canvas = document.createElement("canvas");
					var drawingSurface = canvas.getContext("2d");

					newstarObject.findWaitTime();

					starObjects.push(newstarObject);
					
					canvas.setAttribute("width", SIZE);
					canvas.setAttribute("height", SIZE);
					stage.appendChild(canvas);
					canvas.style.top = row * (SIZE + SPACE) + "px";
					canvas.style.left = column * (SIZE + SPACE) + "px";

					window.addEventListener("keydown", keydownHandler, false);

					starCanvases.push(canvas);
					starDrawingSurfaces.push(drawingSurface);
				}
	}

	function updateAnimation()
	{
		if(gameTimer.time > 0)
			setTimeout(updateAnimation, 100); 

		for(var i = 0; i < starObjects.length; i++)
			starObjects[i].updateAnimation();

		if(gameTimer.time === 0)
		{
			//for(var i = 0; i < starObjects.length; i++) {
			//	starObjects[i].clean();

			//}
			endGame();
		}

		render();
	}

	function endGame()
	{
		gameTimer.stop();
		end = true;
		play = false;

		
		gameTimer.reset();
		precords();
		render();

	}


	function keydownHandler(event)
	{
		//var theCanvasThatWasClicked = event.target;

		for (var i = 0; i < starCanvases.length; i++)
		{
			var star = starObjects[i] 

			if (event.keyCode == 81 && star.state === star.JUMPING && i == 0) 
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 87 && star.state === star.JUMPING && i == 1) 
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 69 && star.state === star.JUMPING && i == 2)
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 65 && star.state === star.JUMPING && i == 3) 
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 83 && star.state === star.JUMPING && i == 4)
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 68 && star.state === star.JUMPING && i == 5) 
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 90 && star.state === star.JUMPING && i == 6)
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 88 && star.state === star.JUMPING && i == 7)
			{
				star.state = star.HIT;         
				starsHit++; 
			}

			if (event.keyCode == 67 && star.state === star.JUMPING && i == 8)
			{
				star.state = star.HIT;         
				starsHit++; 
			}

		}
	}

	function precords()
	{
			document.getElementById("name").innerHTML += (k + 1) + "." + " Звёзд сбито: " + records + ";" + "<br>";
			k++;
	}

	function render()
	{
		for(var i = 0; i < starObjects.length; i++)
		{
			var star = starObjects[i];
			var drawingSurface = starDrawingSurfaces[i];

			drawingSurface.clearRect(0, 0, SIZE, SIZE);
			drawingSurface.drawImage(image, star.sourceX, star.sourceY, SIZE, SIZE, 0, 0, SIZE, SIZE);
			
		}

		output.innerHTML = "Time: " + gameTimer.time;
		records = starsHit;
	


		
		
	}