from google.appengine.ext import webapp
from google.appengine.ext import db
from lib.models import TaskList, Task
from lib.JSONGenerator import JSONMessage, JSONError, JSONList, JSONResponse
from lib.decorators import httpCode_loginRequired
from lib.HTTPExceptions import raise400, HTTP409

class CreateTask(webapp.RequestHandler):
	@httpCode_loginRequired
	def post(self, taskListKey):
		text = self.request.get('text') or raise400('You can\'t create a empty task!')
		taskList = TaskList().safeGet(taskListKey)
		if not taskList: self.error(500)
		
		# Check if task name excists
		if db.GqlQuery('SELECT __key__ FROM Task WHERE taskList = :1 and text = :2', taskList, text).fetch(1):
			raise HTTP409('You already have a task with this name!')
		else:
			task = Task()
			task.text = self.request.get('text')
			task.parent = taskList
			task.taskList = taskList
			task.put()
			
			taskList.notFinishedTasks += 1
			taskList.put()
			
			self.response.out.write(JSONResponse('task',task))
			
class GetTasks(webapp.RequestHandler):
	@httpCode_loginRequired
	def get(self, taskListKey):
		taskList = TaskList().safeGet(taskListKey)
		tasks = taskList.tasks.order('date').fetch(1000)
		
		notFinishedTasks = len([task for task in tasks if not task.completed])
		if taskList.notFinishedTasks != notFinishedTasks:
			taskList.notFinishedTasks = notFinishedTasks
			taskList.put()
			
		self.response.out.write(JSONList('tasks', tasks))
		
class UpdateTask(webapp.RequestHandler):
	@httpCode_loginRequired
	def post(self, taskKey):
		task = Task().safeGet(taskKey)
	
		if self.request.get('completed') == "true":
			task.completed = True
			upOrDown = -1
		else:
			task.completed = False
			upOrDown = +1		
		
		task.taskList.notFinishedTasks += upOrDown
		task.put()
		task.taskList.put()
		
		self.response.out.write(JSONResponse('task',task))
		
class DeleteTasks(webapp.RequestHandler):
	@httpCode_loginRequired
	def post(self):
		taskKeys = self.request.get_all('taskKeys[]')
		
		db.delete(taskKeys)
			
		self.response.out.write(JSONMessage('Deteted %s tasks from the list!' % len(taskKeys)))
