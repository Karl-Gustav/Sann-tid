from google.appengine.ext import webapp
from google.appengine.ext import db
from lib.models import QuestionModel
from lib.decorators import httpCode_loginRequired
from lib.HTTPExceptions import raise400, HTTP409

class QuestionHandler(webapp.RequestHandler):
	def get(self, placeholder): #get
		self.response.out.write( "[%s]" % ",".join(x.toJSON() for x in QuestionModel.all() ) )

	def post(self, questionId): #update
		questionModel = QuestionModel.get(questionId)
		questionModel.question = self.request.get('question') or raise400('Question can\'t be empty!')
		questionModel.answer = self.request.get('answer') or raise400('Question can\'t be empty!')
		questionModel.put()
		self.response.out.write(questionModel.toJSON())

	def post(self): #create
		questionModel = QuestionModel()
		questionModel.question = self.request.get('question') or raise400('Question can\'t be empty!')
		questionModel.answer = self.request.get('answer') or raise400('Question can\'t be empty!')
		questionModel.put()

		self.response.out.write(questionModel.toJSON())

	def delete(self, questionId):
		db.delete(questionId)
		self.response.set_status(200)
