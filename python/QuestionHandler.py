from google.appengine.ext import webapp
from google.appengine.ext import db
import logging
from lib.models import QuestionModel
import json
from lib.decorators import httpCode
from lib.HTTPExceptions import raise400, HTTP409

class QuestionHandler(webapp.RequestHandler):
	def get(self, placeholder): #get
		self.response.out.write( "[%s]" % ",".join(x.toJSON() for x in QuestionModel.all() ) )

	@httpCode
	def put(self, placeholder): #create
		questionModel = QuestionModel()
		body = json.loads(self.request.body)
		logging.info("test"+ str(self.request))
		questionModel.question = body['question'] or raise400('Question can\'t be empty!')
		questionModel.answer = body['answer'] or raise400('Question can\'t be empty!')
		questionModel.put()

		self.response.out.write(questionModel.toJSON())

	@httpCode
	def post(self, questionId): #update
		logging.info("test2"+str(self.request))
		questionModel = QuestionModel.get(questionId.strip())
		if self.request.headers['Content-Type'] == 'application/json':
			body = json.loads(self.request.body)
			questionModel.question = body['question'] or raise400('Question can\'t be empty!')
			questionModel.answer = body['answer'] or raise400('Question can\'t be empty!')
		elif self.request.headers['Content-Type'] == 'application/x-www-form-urlencoded':
			questionModel.question = self.request.get('question') or raise400('Question can\'t be empty!')
			questionModel.answer = self.request.get('answer') or raise400('Question can\'t be empty!')
		questionModel.put()
		self.response.out.write(questionModel.toJSON())

	def delete(self, questionId):
		db.delete(questionId)
		self.response.set_status(200)
