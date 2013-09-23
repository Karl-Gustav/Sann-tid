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
		if 'application/json' in self.request.headers['Content-Type'].lower():
			body = json.loads(self.request.body)
		elif 'application/x-www-form-urlencoded' in self.request.headers['Content-Type'].lower():
			body = self.request
		else:
			raise400('Only Content-Types alowed is application/json or application/x-www-form-urlencoded!')

		questionModel.question = body.get('question') or raise400('Question can\'t be empty!')
		questionModel.answer = body.get('answer') or raise400('Question can\'t be empty!')
		questionModel.put()

		self.response.out.write(questionModel.toJSON())

	@httpCode
	def post(self, questionId): #update
		questionModel = QuestionModel.get(questionId.strip())
		if 'application/json' in self.request.headers['Content-Type'].lower():
			body = json.loads(self.request.body)
		elif 'application/x-www-form-urlencoded' in self.request.headers['Content-Type'].lower():
			body = self.request
		else:
			raise400('Only Content-Types alowed is application/json or application/x-www-form-urlencoded!')

		questionModel.question = body.get('question') or raise400('Question can\'t be empty!')
		questionModel.answer = body.get('answer') or raise400('Question can\'t be empty!')
		questionModel.put()
		self.response.out.write(questionModel.toJSON())

	def delete(self, questionId):
		db.delete(questionId)
		self.response.set_status(200)
