#!/bin/bash

open http://cagov5.dev/
cd `dirname $0`
/usr/local/bin/grunt watch
$SHELL