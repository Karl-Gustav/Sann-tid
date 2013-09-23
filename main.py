import webapp2
from python.QuestionHandler import QuestionHandler


app = webapp2.WSGIApplication([
		(r'/rest/questions/?([\w\-]+)?', QuestionHandler)
	], debug=True)
