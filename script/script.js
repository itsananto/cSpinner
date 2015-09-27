var cs, param;

function resetSpinner(cs, param) {
	cs.destroy();
	cs = cSpinner.Spinner("spin", param);
	cs.spin();
}

function setSpinnerArea() {
	$("#spin").css("width", $("#output").width());
	$("#spin").css("height", $("#parameters").height());
}

function bindEvents() {
	param = { Speed: 100, IsClockwise: true, Radius: 50, Density: 15 };
	cs = cSpinner.Spinner("spin", param);
	cs.spin();

	$(window).resize(function () {
		setSpinnerArea();
		resetSpinner(cs, param);
	});

	$('.activeColor').colorpicker().on('changeColor.colorpicker', function (event) {
		param.ActiveColor = event.color.toHex();
		resetSpinner(cs, param);
	});

	$('.inactiveColor').colorpicker().on('changeColor.colorpicker', function (event) {
		param.InactiveColor = event.color.toHex();
		resetSpinner(cs, param);
	});

	$('.background').colorpicker().on('changeColor.colorpicker', function (event) {
		$("#spin").css("background-color", event.color.toHex());
	});

	$('.direction').change(function (data) {
		param.IsClockwise = this.value === 'true';
		resetSpinner(cs, param);
	});

	$('.xPos').slider({
		min: 0,
		max: 300,
		step: 1,
		value: 150,
		orientation: "horizontal",
		selection: "before",
		tooltip: "show"
	}).on('slide', function (data) {
		param.PosX = data.value;
		resetSpinner(cs, param);
	});

	$('.yPos').slider({
		min: 0,
		max: 300,
		step: 1,
		value: 150,
		orientation: "horizontal",
		selection: "before",
		tooltip: "show"
	}).on('slide', function (data) {
		param.PosY = data.value;
		resetSpinner(cs, param);
	});

	$('.radius').slider({
		min: 20,
		max: 100,
		step: 1,
		value: 50,
		orientation: "horizontal",
		selection: "before",
		tooltip: "show"
	}).on('slide', function (data) {
		param.Radius = data.value;
		resetSpinner(cs, param);
	});

	$('.speed').slider({
		min: 10,
		max: 500,
		step: 1,
		value: 200,
		orientation: "horizontal",
		selection: "before",
		tooltip: "show"
	}).on('slide', function (data) {
		param.Speed = data.value;
		resetSpinner(cs, param);
	});

	$('.density').slider({
		min: 10,
		max: 50,
		step: 2,
		value: 10,
		orientation: "horizontal",
		selection: "before",
		tooltip: "show"
	}).on('slide', function (data) {
		param.Density = data.value;
		resetSpinner(cs, param);
	});
}

$(document).ready(function () {
	setSpinnerArea();
	bindEvents();
});