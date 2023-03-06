# csv-export

|                |                                                                             |
| -------------- | --------------------------------------------------------------------------- |
| Name           | CSV Export                                                                  |
| Version        | v1.0.1                                                                      |
| DockerHub | [weevenetwork/csv-export](https://hub.docker.com/r/weevenetwork/csv-export) |
| Authors        | Mesud Pasic                                                                 |

- [csv-export](#csv-export)
  - [Description](#description)
  - [Environment Variables](#environment-variables)
    - [Module Specific](#module-specific)
    - [Set by the weeve Agent on the edge-node](#set-by-the-weeve-agent-on-the-edge-node)
  - [Dependencies](#dependencies)

## Description

Module collects incoming data and stores it to CSV named by filename variable and timestmap like 'export_1657129367138.csv', temporary file that is used as a buffer is called by variable FILENAME like 'export.csv'. Module will generate files based on SPLIT_SIZE and SPLIT_TYPE specifications.

## Environment Variables

### Module Specific

| Environment Variables | type    | Description                                                            |
| --------------------- | ------- | ---------------------------------------------------------------------- |
| FILENAME              | string  | Name of the file, without the extension (.csv)                         |
| DELIMITER             | string  | Column delimiter                                                       |
| SPLIT_TYPE            | string  | Split file by size or number of rows                                   |
| SPLIT_SIZE            | integer | Number of rows or bytes to split by                                    |
| INCLUDE_TIMESTAMP     | bool    | True or false to include timestamp column if not available in the data |

### Set by the weeve Agent on the edge-node

| Environment Variables | type   | Description               |
| --------------------- | ------ | ------------------------- |
| MODULE_NAME           | string | Name of the module        |
| MODULE_TYPE           | string | Type of the module (Input, Processing, Output)    |
| INGRESS_HOST          | string | Host where app is running |
| INGRESS_PORT          | string | Port where app is running |

# Example payload

```js
//payload structure is always the same, since it's coming from same source
{
	"data":[
	{
    "temp": 42,
    "timestamp": 3187371
  },
  {
    "temp":53,
    "timestamp": 23232
  }
  ]
}

or

[
	{
    "temp": 42,
    "timestamp": 3187371
  },
  {
    "temp":53,
    "timestamp": 23232
  }
]


```

## Dependencies

```js
"dependencies": {
    "express": "^4.17.3",
    "express-winston": "^4.2.0",
    "node-fetch": "^2.6.1"
}
```
