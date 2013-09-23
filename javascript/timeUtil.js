function localTimeFromUTC(date){
	// get time offset from browser
	var currentDate = new Date();
	var offset = -(currentDate.getTimezoneOffset() / 60);

	// get provided date
	if (date instanceof Date){
		var givenDate = date;
	} else {
		//iPhone parsing:
		var arr = date.split(/[- :]/);
		var givenDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
	}

	// apply offset
	var hours = givenDate.getHours();
	hours += offset;
	givenDate.setHours(hours);

	return givenDate;
}
