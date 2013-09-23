def JSONError(value):
	return '{"error": "%s"}' % value
def JSONMessage(value):
	return '{"message": "%s"}' % value
def JSONResponse(name, value):
	if(not isinstance(value, basestring)):
		value = value.toJSON()
	return '{"%s": %s}' % (name, value)
def JSONList(name, lst):
	if lst and isinstance(lst[0], basestring):
		out = ','.join(x for x in lst)
	else:
		out = ','.join(x.toJSON() for x in lst)
	out = '[%s]' % out
	return JSONResponse(name, out)

