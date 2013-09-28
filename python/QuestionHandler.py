from google.appengine.ext import webapp
from google.appengine.ext import db
import logging
from lib.models import QuestionModel
import json
from lib.decorators import httpCode
from lib.HTTPExceptions import raise400, HTTP404

class QuestionHandler(webapp.RequestHandler):
	def get(self, id): #get
		if id:
			self.response.out.write( QuestionModel.get(id).toJSON() )
		else:
			self.response.out.write( "[%s]" % ",".join(x.toJSON() for x in QuestionModel.all() ) )

	@httpCode
	def post(self, placeholder): #create
		if placeholder:
			raise HTTP404()
		questionModel = QuestionModel()

		parseRequestAndSaveToQuestionModel(self.request, questionModel)

		self.response.out.write(questionModel.toJSON())

	@httpCode
	def put(self, questionId): #update
		questionModel = QuestionModel.get(questionId.strip())

		parseRequestAndSaveToQuestionModel(self.request, questionModel)

		self.response.out.write(questionModel.toJSON())

	def delete(self, questionId):
		db.delete(questionId)
		self.response.set_status(200)

def parseRequestAndSaveToQuestionModel(request, questionModel):
	if 'application/json' in request.headers['Content-Type'].lower():
		body = json.loads(request.body)
	elif 'application/x-www-form-urlencoded' in request.headers['Content-Type'].lower():
		body = request
	else:
		raise400('Only Content-Types alowed is application/json or application/x-www-form-urlencoded!')

	questionModel.text = body.get('text') or raise400('"text" can\'t be empty!')
	questionModel.answer = body.get('answer') or raise400('"answer" can\'t be empty!')
	questionModel.waitUntil = body.get('waitUntil') or raise400('"waitUntil" can\'t be empty!')
	questionModel.put()
