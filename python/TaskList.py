from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.ext import db
from lib.models import TaskList, cUser
from lib.JSONGenerator import JSONList, JSONError, JSONResponse, JSONMessage
from lib.decorators import httpCode_loginRequired
from lib.HTTPExceptions import raise400, HTTP401, HTTP409

class GetTaskLists(webapp.RequestHandler):
	@httpCode_loginRequired
	def get(self):
		taskLists = TaskList().gql('WHERE users = :1 ORDER BY date', cUser()).fetch(500)
		self.response.out.write(JSONList('taskLists', taskLists))
		
class CreateTaskList(webapp.RequestHandler):
	@httpCode_loginRequired	
	def post(self):
		listName = self.request.get('listName') or raise400('List name can\'t be empty!')
		# Check if listName already excists for this user
		if db.GqlQuery('SELECT __key__ FROM TaskList WHERE name = :1 and users = :2', listName, cUser()).fetch(1):
			raise HTTP409('You already have a list with this name!')
		
		taskList = TaskList( name = listName )
		taskList.users.append(cUser())
		taskList.put()
		self.response.out.write(JSONResponse('taskList', taskList))
		
class DeleteTaskList(webapp.RequestHandler):
	@httpCode_loginRequired		
	def post(self):
		key = self.request.get('listId') or raise400('Could not find the list identificator(key)!')
		if not db.GqlQuery('SELECT __key__ FROM TaskList WHERE users = :1', cUser()).fetch(1):
			raise HTTP401('You don\'t have access to delete this list!')
		
		keys = db.GqlQuery('SELECT __key__ FROM Task WHERE taskList = KEY(:1)', key).fetch(1000)
		db.delete([key] + keys)
		self.response.out.write(JSONMessage('Deleted the list and %s tasks!' % len(keys)))
		
class ChangeTaskListName(webapp.RequestHandler):
	@httpCode_loginRequired
	def post(self, listKey):
		taskList = TaskList().safeGet(listKey)
		newName = self.request.get('newName') or raise400('The new name can\'t be empty!')
		originalName = taskList.name
		taskList.name = newName
		taskList.put()
		self.response.out.write(JSONMessage('Changed the name of the task list from %s to %s'%(originalName, newName)))
		
"""
implementer delete slik:
q = Task.all()
q.ancestor(taskList.key)"""
