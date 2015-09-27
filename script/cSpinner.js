var cSpinner = (function () {
	var gObj = {};

	function UserException(message) {
		this.message = message;
		this.name = "UserException";
	}

	gObj.Spinner = function (id, param) {
		try {
			if (!document.getElementById(id)) {
				throw new UserException("ID: " + id + " not found");
			}
			var obj = SpinnerInternal(id, param || {});
			return obj;
		} catch (ex) {
			console.log(ex.name + ": " + ex.message);
		}
	}

	function hasOwnProperty(obj, prop) {
		var proto = obj.__proto__ || obj.constructor.prototype;
		return (prop in obj) &&
			(!(prop in proto) || proto[prop] !== obj[prop]);
	}

	function SpinnerInternal(id, param) {
		var obj = this;
		var posX, posY;

		obj.id = id;
		obj.param = param;
		
		function getNearestFactor360(num){
			if(360%num === 0){
				return num;
			}
			var factors = [1,2,3,4,5,6,8,9,10,12,15,18,20,24,30,36,40,45,60,72,90,120,180];
			
			for(var i=0;i<factors.length;i++){
				if(num<factors[i]){
					return factors[i-1];
				}
			}
		}

		obj.setParameter = function (param, Parameters) {
			if (hasOwnProperty(param, "Radius"))
				Parameters.Radius = param.Radius;

			if (hasOwnProperty(param, "IsClockwise"))
				Parameters.IsClockwise = param.IsClockwise;

			if (hasOwnProperty(param, "Speed"))
				Parameters.Speed = param.Speed;

			if (hasOwnProperty(param, "Density"))
				Parameters.Density = getNearestFactor360(param.Density);

			if (hasOwnProperty(param, "PosX"))
				Parameters.PosX = param.PosX;
			else
				Parameters.PosX = posX;

			if (hasOwnProperty(param, "PosY"))
				Parameters.PosY = param.PosY;
			else
				Parameters.PosY = posY;
				
			if (hasOwnProperty(param, "ActiveColor"))
				Parameters.ActiveColor = param.ActiveColor;
				
			if (hasOwnProperty(param, "InactiveColor"))
				Parameters.InactiveColor = param.InactiveColor;
		}
		
		obj.clear = function(){
			var canvas = document.getElementById(id + '_spinner');
			var context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
		};
		
		obj.destroy = function(){
			var element = document.getElementById(obj.id + "_spinner");
			element.parentNode.removeChild(element);
		};

		obj.spin = function () {
			var containerElement = document.getElementById(obj.id);
			containerElement.appendChild(obj.getCanvasElement(obj.id));

			var containerHeight = containerElement.offsetHeight;
			var containerWidth = containerElement.offsetWidth;

			posX = containerWidth / 2;
			posY = containerHeight / 2;

			var Parameters = {
				Radius: 50,
				IsClockwise: false,
				Speed: 100,
				Density: 20,
				PosX: 0,
				PosY: 0,
				ActiveColor: '#5f5f5f',
				InactiveColor: '#a5a5a5'
			}

			obj.setParameter(obj.param, Parameters);

			var canvas, context, count;

			count = 0;

			canvas = document.getElementById(id + '_spinner');
			context = canvas.getContext('2d');

			setInterval(function () {
				count = obj.drawSpinner(canvas, context, count, Parameters);
			}, Parameters.Speed);
		}

		obj.drawSpinner = function (canvas, context, count, Parameters) {

			context.clearRect(0, 0, canvas.width, canvas.height);

			var cx = Parameters.PosX;
			var cy = Parameters.PosY;

			for (var angle = 0; angle < 360; angle += (360 / Parameters.Density)) {
				var x = cx + Parameters.Radius * Math.sin(angle * Math.PI / 180);
				var y = cy + Parameters.Radius * Math.cos(angle * Math.PI / 180);

				if (count * (360 / Parameters.Density) == angle) obj.circle(x, y, 5, true, context, Parameters);
				else obj.circle(x, y, 5, false, context, Parameters);
			}
			count = Parameters.IsClockwise ? (Parameters.Density + count - 1) % Parameters.Density : (count + 1) % Parameters.Density;
			return count;
		}

		obj.circle = function (x, y, r, isActive, context, Parameters) {
			context.beginPath();
			context.arc(x, y, r, 0, 2 * Math.PI, false);
			isActive ? context.fillStyle = Parameters.ActiveColor : context.fillStyle = Parameters.InactiveColor;
			context.fill();
		}

		obj.getCanvasElement = function (id) {
			var canvasElement = document.createElement('canvas');
			var containerElement = document.getElementById(id);
			var containerHeight = containerElement.offsetHeight;
			var containerWidth = containerElement.offsetWidth;
			var containerTop = containerElement.offsetTop;
			var containerLeft = containerElement.offsetLeft;


			canvasElement.setAttribute("height", containerHeight.toString());
			canvasElement.setAttribute("width", containerWidth.toString());
			canvasElement.setAttribute("id", id + "_spinner");
			canvasElement.style.top = containerTop.toString();
			canvasElement.style.left = containerLeft.toString();
			canvasElement.style.position = "absolute";

			return canvasElement;
		}

		return obj;

	}

	return gObj;
} ());