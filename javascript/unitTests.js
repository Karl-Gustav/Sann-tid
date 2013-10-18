describe('dateService momentToMinutesAndSeconds', function(){
	beforeEach(module('testApp'));
	it('should return 60 min when given 3600 sec', inject(function(dateService){
		expect(dateService.momentToMinutesAndSeconds(3600).toBe([60,0]))
	}))
})
