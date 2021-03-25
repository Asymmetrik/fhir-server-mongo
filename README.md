![Node.js CI](https://github.com/imranq2/node-fhir-server-mongo/workflows/Node.js%20CI/badge.svg)

![publish_docker](https://github.com/imranq2/node-fhir-server-mongo/workflows/publish_docker/badge.svg)

# Asymmetrik FHIR API Server + Mongo Example

[![Build Status](https://travis-ci.org/Asymmetrik/node-fhir-server-mongo.svg?branch=master)](https://travis-ci.org/Asymmetrik/node-fhir-server-mongo)
[![Known Vulnerabilities](https://snyk.io/test/github/asymmetrik/node-fhir-server-mongo/badge.svg?targetFile=package.json)](https://snyk.io/test/github/asymmetrik/node-fhir-server-mongo?targetFile=package.json)

## Intro

This project is an example project built on `@asymmetrik/node-fhir-server-core` and has a MongoDB back end storing sample data. It's built with the ability to run in docker or node.js. To get started developing in Docker, see [Getting Started with Docker](#getting-started-with-docker). To get started developing with Node.js and Mongo, see [Getting Started with Node](#getting-started-with-node). You can serve multiple versions of FHIR with just one server. By default, R4 (4_0_0) is enabled but DSTU2 (1.0.2) and STU3 (3.0.1) are also supported. You can choose to support all versions or just one version by editing the config.

## Getting Started with Docker

1. Install the latest [Docker Community Edition](https://www.docker.com/community-edition) for your OS if you do not already have it installed.
2. Run `docker-compose up`.

## Getting Started with Node

1. Install the latest LTS for [Node.js](https://nodejs.org/en/) if you do not already have it installed.
2. Install the latest [Mongo Community Edition](https://docs.mongodb.com/manual/administration/install-community/) if you do not already have it installed.
3. Make sure the default values defined in `env.json` are valid.
4. Run `yarn` or `npm install`.
5. Run `yarn start` or `npm run start`.

## Next Steps

The server should now be up and running on the default port 3000. You should see the following output: 

```shell
... - verbose: Server is up and running!
```

### Lets give this a try on your server

#### Capability Statements

By default, R4 is enabled for the Patient and Organization resource. The capability statements are dynamically generated based on which resources you enable.

- View the R4 Capability Statement [http://localhost:3000/4_0_0/metadata](http://localhost:3000/4_0_0/metadata)

Other versions if enabled.

- View the DSTU2 Conformance Statement [http://localhost:3000/1_0_2/metadata](http://localhost:3000/1_0_2/metadata)
- View the STU3 Capability Statement [http://localhost:3000/3_0_1/metadata](http://localhost:3000/3_0_1/metadata)

Using any request builder (i.e. Postman), let's create a new patient.

#### R4 Patient (Content-Type: application/fhir+json)

```
Create Patient

PUT /4_0_0/Patient/example HTTP/1.1
Host: localhost:3000
Content-Type: application/fhir+json
Cache-Control: no-cache

# Raw Body
{
  "resourceType": "Patient",
  "id": "example",
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t\t<table>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Name</td>\n\t\t\t\t\t\t<td>Peter James \n              <b>Chalmers</b> (&quot;Jim&quot;)\n            </td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Address</td>\n\t\t\t\t\t\t<td>534 Erewhon, Pleasantville, Vic, 3999</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Contacts</td>\n\t\t\t\t\t\t<td>Home: unknown. Work: (03) 5555 6473</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Id</td>\n\t\t\t\t\t\t<td>MRN: 12345 (Acme Healthcare)</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>"
  },
  "identifier": [
    {
      "use": "usual",
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "MR"
          }
        ]
      },
      "system": "urn:oid:1.2.36.146.595.217.0.1",
      "value": "12345",
      "period": {
        "start": "2001-05-06"
      },
      "assigner": {
        "display": "Acme Healthcare"
      }
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Chalmers",
      "given": [
        "Peter",
        "James"
      ]
    },
    {
      "use": "usual",
      "given": [
        "Jim"
      ]
    },
    {
      "use": "maiden",
      "family": "Windsor",
      "given": [
        "Peter",
        "James"
      ],
      "period": {
        "end": "2002"
      }
    }
  ],
  "telecom": [
    {
      "use": "home"
    },
    {
      "system": "phone",
      "value": "(03) 5555 6473",
      "use": "work",
      "rank": 1
    },
    {
      "system": "phone",
      "value": "(03) 3410 5613",
      "use": "mobile",
      "rank": 2
    },
    {
      "system": "phone",
      "value": "(03) 5555 8834",
      "use": "old",
      "period": {
        "end": "2014"
      }
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "_birthDate": {
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
        "valueDateTime": "1974-12-25T14:35:45-05:00"
      }
    ]
  },
  "deceasedBoolean": false,
  "address": [
    {
      "use": "home",
      "type": "both",
      "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
      "line": [
        "534 Erewhon St"
      ],
      "city": "PleasantVille",
      "district": "Rainbow",
      "state": "Vic",
      "postalCode": "3999",
      "period": {
        "start": "1974-12-25"
      }
    }
  ],
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
              "code": "N"
            }
          ]
        }
      ],
      "name": {
        "family": "du Marché",
        "_family": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
              "valueString": "VV"
            }
          ]
        },
        "given": [
          "Bénédicte"
        ]
      },
      "telecom": [
        {
          "system": "phone",
          "value": "+33 (237) 998327"
        }
      ],
      "address": {
        "use": "home",
        "type": "both",
        "line": [
          "534 Erewhon St"
        ],
        "city": "PleasantVille",
        "district": "Rainbow",
        "state": "Vic",
        "postalCode": "3999",
        "period": {
          "start": "1974-12-25"
        }
      },
      "gender": "female",
      "period": {
        "start": "2012"
      }
    }
  ],
  "managingOrganization": {
    "reference": "Organization/1"
  }
}

```

```
Read Patient

GET /4_0_0/Patient/example HTTP/1.1
Host: localhost:3000
Content-Type: application/fhir+json
Cache-Control: no-cache

```

### Determine which resources you want to support

In this example, only the Patient and Organization resource is filled out. You will need to fill in the other services for the resources you would like to support. The routes will only be available for the resource you enabled. You can view the available resources over at [`@asymmetrik/node-fhir-server-core`](https://github.com/Asymmetrik/node-fhir-server-core#profiles).

## License

`@asymmetrik/fhir-server-mongo` is [MIT licensed](./LICENSE).
