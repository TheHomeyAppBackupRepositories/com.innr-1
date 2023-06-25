
  "ids": {
    "modelId": "SP 120",
    "manufacturerName": "innr"
  },
  "endpoints": {
    "endpointDescriptors": [
      {
        "endpointId": 1,
        "applicationProfileId": 49246,
        "applicationDeviceId": 16,
        "applicationDeviceVersion": 0,
        "_reserved1": 2,
        "inputClusters": [
          0,
          4,
          3,
          6,
          8,
          5,
          2820,
          1794,
          10
        ],
        "outputClusters": [
          3,
          25,
          10
        ]
      },
      {
        "endpointId": 2,
        "applicationProfileId": 49246,
        "applicationDeviceId": 4096,
        "applicationDeviceVersion": 0,
        "_reserved1": 2,
        "inputClusters": [
          4096
        ],
        "outputClusters": []
      }
    ],
    "endpoints": {
      "1": {
        "clusters": {
          "basic": {
            "attributes": [
              {
                "id": 0,
                "name": "zclVersion",
                "value": 2,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 1,
                "name": "appVersion",
                "value": 1,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 2,
                "name": "stackVersion",
                "value": 2,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 3,
                "name": "hwVersion",
                "value": 1,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 4,
                "name": "manufacturerName",
                "value": "innr",
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 5,
                "name": "modelId",
                "value": "SP 120",
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 6,
                "name": "dateCode",
                "value": "20171027-100",
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 7,
                "name": "powerSource",
                "value": "mains",
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 10,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 16384,
                "name": "swBuildId",
                "value": "2.0",
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
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
                "id": 0,
                "name": "nameSupport",
                "value": {
                  "type": "Buffer",
                  "data": [
                    0
                  ]
                },
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              }
            ],
            "commandsGenerated": "UNSUP_GENERAL_COMMAND",
            "commandsReceived": "UNSUP_GENERAL_COMMAND"
          },
          "identify": {
            "attributes": [
              {
                "id": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
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
                "id": 0,
                "name": "onOff",
                "value": false,
                "reportingConfiguration": {
                  "direction": "reported",
                  "attributeDataType": 16,
                  "minInterval": 1,
                  "maxInterval": 3600,
                  "status": "SUCCESS"
                }
              },
              {
                "id": 16384,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 16385,
                "name": "onTime",
                "value": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 16386,
                "name": "offWaitTime",
                "value": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
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
                "id": 0,
                "name": "currentLevel",
                "value": 254,
                "reportingConfiguration": {
                  "direction": "reported",
                  "attributeDataType": 32,
                  "minInterval": 1,
                  "maxInterval": 65534,
                  "minChange": 0,
                  "status": "SUCCESS"
                }
              },
              {
                "id": 1,
                "name": "remainingTime",
                "value": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 16,
                "name": "onOffTransitionTime",
                "value": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
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
                "id": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 1,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 2,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 3,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 4,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 5,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
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
                "id": 0,
                "name": "measurementType",
                "value": {
                  "type": "Buffer",
                  "data": [
                    0,
                    0,
                    0,
                    0
                  ]
                },
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 1285,
                "name": "rmsVoltage",
                "value": 239,
                "reportingConfiguration": {
                  "direction": "reported",
                  "attributeDataType": 33,
                  "minInterval": 1,
                  "maxInterval": 3600,
                  "minChange": 3,
                  "status": "SUCCESS"
                }
              },
              {
                "id": 1288,
                "name": "rmsCurrent",
                "value": 0,
                "reportingConfiguration": {
                  "direction": "reported",
                  "attributeDataType": 33,
                  "minInterval": 1,
                  "maxInterval": 3600,
                  "minChange": 15,
                  "status": "SUCCESS"
                }
              },
              {
                "id": 1291,
                "name": "activePower",
                "value": 0,
                "reportingConfiguration": {
                  "direction": "reported",
                  "attributeDataType": 41,
                  "minInterval": 1,
                  "maxInterval": 3600,
                  "minChange": 3,
                  "status": "SUCCESS"
                }
              }
            ],
            "commandsGenerated": "UNSUP_GENERAL_COMMAND",
            "commandsReceived": "UNSUP_GENERAL_COMMAND"
          },
          "metering": {
            "attributes": [
              {
                "id": 0,
                "name": "currentSummationDelivered",
                "value": 0,
                "reportingConfiguration": {
                  "direction": "reported",
                  "attributeDataType": 37,
                  "minInterval": 60,
                  "maxInterval": 1800,
                  "minChange": 255,
                  "status": "SUCCESS"
                }
              },
              {
                "id": 512,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 768,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 771,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 774,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              }
            ],
            "commandsGenerated": "UNSUP_GENERAL_COMMAND",
            "commandsReceived": "UNSUP_GENERAL_COMMAND"
          },
          "time": {
            "attributes": [
              {
                "id": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 1,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              }
            ],
            "commandsGenerated": "UNSUP_GENERAL_COMMAND",
            "commandsReceived": "UNSUP_GENERAL_COMMAND"
          }
        },
        "bindings": {
          "identify": {
            "attributes": [
              {
                "id": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              }
            ],
            "commandsGenerated": "UNSUP_GENERAL_COMMAND",
            "commandsReceived": "UNSUP_GENERAL_COMMAND"
          },
          "time": {
            "attributes": [
              {
                "id": 0,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              },
              {
                "id": 1,
                "reportingConfiguration": {
                  "status": "UNREPORTABLE_ATTRIBUTE",
                  "direction": "reported"
                }
              }
            ],
            "commandsGenerated": "UNSUP_GENERAL_COMMAND",
            "commandsReceived": "UNSUP_GENERAL_COMMAND"
          },
          "ota": {
            "attributes": [],
            "commandsGenerated": "UNSUP_GENERAL_COMMAND",
            "commandsReceived": "UNSUP_GENERAL_COMMAND"
          }
        }
      },
      "2": {
        "clusters": {
          "touchlink": {
            "attributes": "TIMEOUT",
            "commandsGenerated": "TIMEOUT",
            "commandsReceived": "TIMEOUT"
          }
        },
        "bindings": {}
      }
    }
  }
