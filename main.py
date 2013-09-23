import webapp2
from python.Delete import Delete
from python.ListUsers import GetListUsers, AddUserToList, DeleteListUsers
from python.Task import GetTasks, UpdateTask, CreateTask, DeleteTasks
from python.TaskList import GetTaskLists, CreateTaskList, DeleteTaskList, ChangeTaskListName
from python.Logout import Logout


app = webapp2.WSGIApplication([
		('/getLogoutUrl', Logout),
		('/getTaskLists', GetTaskLists),
		('/createTaskList', CreateTaskList),
		('/deleteTaskList', DeleteTaskList),
		(r'/changeTaskListName/([\w\-]+)', ChangeTaskListName),
		(r'/getTasks/([\w\-]+)', GetTasks),
		(r'/updateTask/([\w\-]+)', UpdateTask),
		(r'/createTask/([\w\-]+)', CreateTask),
		('/deleteTasks', DeleteTasks),
		(r'/getListUsers/([\w\-]+)', GetListUsers),
		(r'/addUserToList/([\w\-]+)', AddUserToList),
		(r'/deleteListUsers/([\w\-]+)', DeleteListUsers)
	], debug=True)
