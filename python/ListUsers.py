import re
from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.api import mail
from lib.models import TaskList
from lib.Email import validEmail
from lib.JSONGenerator import JSONError, JSONResponse, JSONMessage, JSONList
from lib.decorators import httpCode_loginRequired
from lib.HTTPExceptions import HTTP400, HTTP409

class AddUserToList(webapp.RequestHandler):
	@httpCode_loginRequired
	def post(self, taskListKey):
		email = self.request.get('email').lower().strip()
		if not validEmail(email):
			raise HTTP400('\'\'%s\'\' is not a valid e-mail address!' % email)
		elif not re.match('^.+@gmail\.com$', email):
			raise HTTP400('\'\'%s\'\' is not a Gmail address!' % email)
		else:
			taskList = TaskList().safeGet(taskListKey)
			if email in taskList.users:
				raise HTTP409('\'\'%s\'\' is already an editor of this list!' % email)
			else:
				taskList.users.append(email)
				taskList.put()
				self.response.out.write(JSONMessage('Added user \'\'%s\'\' as editor to this list!' % email))
				message = mail.EmailMessage(sender="Notifications our-lists.appspot.com <notifications@our-lists.appspotmail.com>",
								subject="You have been added to a list on our-lists.appspot.com",
								to=email,
								body='You have been added to the "%s" list on our-lists.appspot.com.\nTo see the list go to http://our-lists.appspot.com/#listId=%s&name=%s!' %
								(
									taskList.name,
									taskList.key(),
									taskList.name
								)
						)
				message.send()

class GetListUsers(webapp.RequestHandler):
	@httpCode_loginRequired
	def get(self, taskListKey):
		taskList = TaskList().safeGet(taskListKey)
		self.response.out.write(JSONList('users', ['"%s"' % x for x in taskList.users]))
		
class DeleteListUsers(webapp.RequestHandler):
	@httpCode_loginRequired
	def post(self, taskListKey):
		email = self.request.get('email')
		taskList = TaskList().get(taskListKey)
	
		taskList.users.remove(email)
		if not taskList.users: raise HTTP400('You can\'t remove the last user from the list!')
		taskList.put()
	
		self.response.out.write(JSONMessage('Removed user \'\'%s\'\' from list \'\'%s\'\'' % (email, taskList.name)))
		message = mail.EmailMessage(sender="Notifications our-lists.appspot.com <notifications@our-lists.appspotmail.com>",
						subject="You have been removed from a list on our-lists.appspot.com",
						to=email,
						body='You have been removed from the "%s" list on our-lists.appspot.com!' % taskList.name
				)
		message.send()
			

