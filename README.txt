Win32 README for twsws-1.1
==========================

twsws: The World's Smallest Web Server
Version 1.1 12th February 2002

http://www.nonhtmlmail.org/twsws/
mailto:colin@nonhtmlmail.org


Introduction
------------

The purpose of this tiny project is:

- to produce the smallest and simplest webserver possible satisfying the
  requirements (see below);

- to provide an insight into the HTTP protocol;

- and to produce a very simple project built using the GNU configure and build
  tools.


The requirements of this simple webserver are:

- really easy to deploy: just a single executable to which the content is
  passed as a parameter (one directory), along with the optional port number;

- to use very little in the way of machine resources;

- to be secure from hack attacks which attempt to gain access to the server
  machine;

- to be able to log as much as possible about client requests.


Usage
-----

	twsws [-p port] [-l log_path] directory

Serves the directory specified.  Listens on optional port parameter, which
defaults to 80.  Log output is written to log_path, if specified.

The file extensions which are currently recognised are limited to those listed
in EntityType.cpp.  Any other extension is not served up for extra security.

Examples:

	twsws .
	twsws -p 8080 -l /tmp/twsws.log /home/fred/wwwroot


Installation
------------

Copy twsws.exe and cygwin1.dll to your windows exe dir.


TODO
----

Make twsws multi-threaded to cope with many requests at once without breaking
the limit machine resource usage requirement.

