# -*- coffee -*-
#
#  src/lib/common.coffee
#

{ WS_RMI_Connection } = require('../lib/ws_rmi_connection')
{ WS_RMI_Object } = require('../lib/ws_rmi_object')
{ WS_RMI_Stub } = require('../lib/ws_rmi_object')
{ random_id } = require('../lib/random_id')

module.exports = {
  #
  WS_RMI_Connection
  WS_RMI_Object
  WS_RMI_Stub
  random_id
}
  
