from google.appengine.ext import webapp
from google.appengine.ext import db
from lib.decorators import httpCode_loginRequired
from lib.models import Task as child

class Delete(webapp.RequestHandler):
	@httpCode_loginRequired
	def get(self, key):
		toDelete = [key]
		query = db.GqlQuery('SELECT __key__ FROM %s WHERE ANCESTOR IS KEY(:1)' % child.__name__, key)
		for key in query:
			toDelete.append(key)
		db.delete(toDelete)
		
		self.redirect(self.request.get('continue'))
