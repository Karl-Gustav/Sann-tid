from google.appengine.ext import webapp
from google.appengine.api.users import create_logout_url
			
class Logout(webapp.RequestHandler):
	def get(self):
		self.response.out.write(create_logout_url('/'))

class Login(webapp.RequestHandler):
    def post(self):
        self.response.out.write(create_logout_url('/'))
