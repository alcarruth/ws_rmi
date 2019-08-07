#!/usr/bin/env coffee
#
#  example/stack.coffee
#

# TODO:
#
#  - Try this with promises
#

class Stack_CB

  constructor: ->
    @stack = []

  push: (x, cb) =>
    @stack.push(x)
    console.log @stack
    cb(true)

  pop: (cb) =>
    cb( @stack.pop())
    console.log @stack


if exports?
  exports.Stack_CB = Stack_CB