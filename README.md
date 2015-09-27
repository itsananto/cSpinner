<!--add library reference-->
<script src="cSpinner.js"></script>


//define parameter values
var Parameters = {
	Radius: 50,
	IsClockwise: false,
	Speed: 100,
	Density: 20,
	PosX: 0,
	PosY: 0,
	ActiveColor: '#5f5f5f',
	InactiveColor: '#a5a5a5'
};

//call spinner
cs = cSpinner.Spinner("spin", Parameters);
