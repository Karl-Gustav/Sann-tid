from google.appengine.ext import db
from google.appengine.api import users
import json
import re
from HTTPExceptions import raiseEx, HTTP403, HTTP404

def cUser():
	return users.get_current_user().email().lower()
	
class Parrent(db.Model):			
	def toJSON(self):
		tempdict = dict([(p, unicode(getattr(self, p))) for p in self.properties()])
		tempdict['id'] = unicode(self.key())
		jsonString = json.dumps(tempdict)
		jsonString = re.sub('\"True\"', 'true', jsonString)
		jsonString = re.sub('\"False\"', 'false', jsonString)
		return jsonString
	
class QuestionModel(Parrent):
	question = db.StringProperty()
	answer = db.StringProperty()
	waitUntil = db.DateTimeProperty()
