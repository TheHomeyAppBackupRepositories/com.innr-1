"ids": {
  "modelId": "SP 240",
  "manufacturerName": "innr"
},
"endpoints": {
  "endpointDescriptors": [
    {
      "endpointId": 1,
      "applicationProfileId": 260,
      "applicationDeviceId": 266,
      "applicationDeviceVersion": 0,
      "_reserved1": 1,
      "inputClusters": [
        0,
        3,
        4,
        5,
        6,
        8,
        4096,
        1794,
        2820,
        57345
      ],
      "outputClusters": [
        10,
        25
      ]
    },
    {
      "endpointId": 242,
      "applicationProfileId": 41440,
      "applicationDeviceId": 97,
      "applicationDeviceVersion": 0,
      "_reserved1": 0,
      "inputClusters": [],
      "outputClusters": [
        33
      ]
    }
  ],
  "endpoints": {
    "1": {
      "clusters": {
        "basic": {
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "identify": {
          "attributes": [
            {
              "acl": [
                "readable",
                "writable",
                "reportable"
              ],
              "id": 0,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "groups": {
          "attributes": [
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 0,
              "name": "nameSupport",
              "value": {
                "type": "Buffer",
                "data": [
                  0
                ]
              },
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 2,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "scenes": {
          "attributes": [
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 0,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 2,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 3,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 4,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 2,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "onOff": {
          "attributes": [
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 0,
              "name": "onOff",
              "value": true,
              "reportingConfiguration": {
                "direction": "reported",
                "attributeDataType": 16,
                "minInterval": 0,
                "maxInterval": 300,
                "status": "SUCCESS"
              }
            },
            {
              "acl": [
                "readable",
                "writable",
                "reportable"
              ],
              "id": 16385,
              "name": "onTime",
              "value": 0,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "writable",
                "reportable"
              ],
              "id": 16386,
              "name": "offWaitTime",
              "value": 0,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "writable",
                "reportable"
              ],
              "id": 16387,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 2,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "levelControl": {
          "attributes": [
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 0,
              "name": "currentLevel",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "touchlink": {
          "attributes": [],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "metering": {
          "attributes": [
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 0,
              "name": "currentSummationDelivered",
              "value": 0,
              "reportingConfiguration": {
                "direction": "reported",
                "attributeDataType": 37,
                "minInterval": 0,
                "maxInterval": 300,
                "minChange": 1,
                "status": "SUCCESS"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 512,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 768,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 771,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 774,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "electricalMeasurement": {
          "attributes": [
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 0,
              "name": "measurementType",
              "value": {
                "type": "Buffer",
                "data": [
                  135,
                  49,
                  8,
                  192
                ]
              },
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1285,
              "name": "rmsVoltage",
              "value": 234,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1288,
              "name": "rmsCurrent",
              "value": 22,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1291,
              "name": "activePower",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1536,
              "name": "acVoltageMultiplier",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1537,
              "name": "acVoltageDivisor",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1538,
              "name": "acCurrentMultiplier",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1539,
              "name": "acCurrentDivisor",
              "value": 1000,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1540,
              "name": "acPowerMultiplier",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 1541,
              "name": "acPowerDivisor",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            },
            {
              "acl": [
                "readable",
                "reportable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 1,
              "reportingConfiguration": {
                "status": "NOT_FOUND",
                "direction": "reported"
              }
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        }
      },
      "bindings": {
        "time": {
          "attributes": [
            {
              "acl": [
                "readable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 1
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        },
        "ota": {
          "attributes": [
            {
              "acl": [
                "readable"
              ],
              "id": 0
            },
            {
              "acl": [
                "readable"
              ],
              "id": 1
            },
            {
              "acl": [
                "readable"
              ],
              "id": 2
            },
            {
              "acl": [
                "readable"
              ],
              "id": 3
            },
            {
              "acl": [
                "readable"
              ],
              "id": 4
            },
            {
              "acl": [
                "readable"
              ],
              "id": 5
            },
            {
              "acl": [
                "readable"
              ],
              "id": 6
            },
            {
              "acl": [
                "readable"
              ],
              "id": 7
            },
            {
              "acl": [
                "readable"
              ],
              "id": 8
            },
            {
              "acl": [
                "readable"
              ],
              "id": 9
            },
            {
              "acl": [
                "readable"
              ],
              "id": 65533,
              "name": "clusterRevision",
              "value": 3
            }
          ],
          "commandsGenerated": "UNSUP_GENERAL_COMMAND",
          "commandsReceived": "UNSUP_GENERAL_COMMAND"
        }
      }
    },
    "242": {
      "clusters": {},
      "bindings": {}
    }
  }
}
