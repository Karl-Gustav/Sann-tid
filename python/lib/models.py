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
		tempdict['key'] = unicode(self.key())
		jsonString = json.dumps(tempdict)
		jsonString = re.sub('\"True\"', 'true', jsonString)
		jsonString = re.sub('\"False\"', 'false', jsonString)
		return jsonString
	
class TaskList(Parrent):
	author = db.UserProperty(auto_current_user_add=True)
	name = db.StringProperty()
	date = db.DateTimeProperty(auto_now_add=True)
	lastEditor = db.UserProperty(auto_current_user=True)
	users = db.StringListProperty()
	notFinishedTasks = db.IntegerProperty(default=0)
	
	def safeGet(self, key):
		return self.gql('WHERE __key__ = KEY(:1) and users = :2', key, cUser()).get() or raiseEx(
			HTTP403,
			'Either the %s don\'t exist or you dont have access to it! User: %s, Key: %s' % (self.__class__.__name__, cUser(), key)
		)
	
class Task(Parrent):
	date = db.DateTimeProperty(auto_now_add=True)
	author = db.UserProperty(auto_current_user_add=True)
	text = db.StringProperty()
	taskList = db.ReferenceProperty(TaskList, collection_name='tasks')
	completed = db.BooleanProperty(default=False)
	
	def safeGet(self, key):
		return self.get(key) or raiseEx(HTTP404, 'The %s don\'t exist! Key: %s' % (self.__class__.__name__, key))
