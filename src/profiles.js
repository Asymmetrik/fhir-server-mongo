const { VERSIONS } = require('@asymmetrik/node-fhir-server-core').constants;
// noinspection SpellCheckingInspection
const profiles = {

    Account: {
      service: './src/services/account/account.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ActivityDefinition: {
      service: './src/services/activitydefinition/activitydefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    AdverseEvent: {
      service: './src/services/adverseevent/adverseevent.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    AllergyIntolerance: {
      service: './src/services/allergyintolerance/allergyintolerance.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Appointment: {
      service: './src/services/appointment/appointment.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    AppointmentResponse: {
      service: './src/services/appointmentresponse/appointmentresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    AuditEvent: {
      service: './src/services/auditevent/auditevent.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Basic: {
      service: './src/services/basic/basic.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Binary: {
      service: './src/services/binary/binary.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    BodyStructure: {
      service: './src/services/bodystructure/bodystructure.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Bundle: {
      service: './src/services/bundle/bundle.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CapabilityStatement: {
      service: './src/services/capabilitystatement/capabilitystatement.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CarePlan: {
      service: './src/services/careplan/careplan.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CareTeam: {
      service: './src/services/careteam/careteam.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ChargeItem: {
      service: './src/services/chargeitem/chargeitem.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ChargeItemDefinition: {
      service: './src/services/chargeitemdefinition/chargeitemdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Claim: {
      service: './src/services/claim/claim.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ClaimResponse: {
      service: './src/services/claimresponse/claimresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ClinicalImpression: {
      service: './src/services/clinicalimpression/clinicalimpression.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CodeSystem: {
      service: './src/services/codesystem/codesystem.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Communication: {
      service: './src/services/communication/communication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CommunicationRequest: {
      service: './src/services/communicationrequest/communicationrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CompartmentDefinition: {
      service: './src/services/compartmentdefinition/compartmentdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Composition: {
      service: './src/services/composition/composition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ConceptMap: {
      service: './src/services/conceptmap/conceptmap.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Condition: {
      service: './src/services/condition/condition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Consent: {
      service: './src/services/consent/consent.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Contract: {
      service: './src/services/contract/contract.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Coverage: {
      service: './src/services/coverage/coverage.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CoverageEligibilityRequest: {
      service: './src/services/coverageeligibilityrequest/coverageeligibilityrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    CoverageEligibilityResponse: {
      service: './src/services/coverageeligibilityresponse/coverageeligibilityresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DetectedIssue: {
      service: './src/services/detectedissue/detectedissue.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Device: {
      service: './src/services/device/device.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DeviceDefinition: {
      service: './src/services/devicedefinition/devicedefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DeviceMetric: {
      service: './src/services/devicemetric/devicemetric.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DeviceRequest: {
      service: './src/services/devicerequest/devicerequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DeviceUseStatement: {
      service: './src/services/deviceusestatement/deviceusestatement.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DiagnosticReport: {
      service: './src/services/diagnosticreport/diagnosticreport.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DocumentManifest: {
      service: './src/services/documentmanifest/documentmanifest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    DocumentReference: {
      service: './src/services/documentreference/documentreference.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    EffectEvidenceSynthesis: {
      service: './src/services/effectevidencesynthesis/effectevidencesynthesis.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Encounter: {
      service: './src/services/encounter/encounter.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Endpoint: {
      service: './src/services/endpoint/endpoint.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    EnrollmentRequest: {
      service: './src/services/enrollmentrequest/enrollmentrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    EnrollmentResponse: {
      service: './src/services/enrollmentresponse/enrollmentresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    EpisodeOfCare: {
      service: './src/services/episodeofcare/episodeofcare.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    EventDefinition: {
      service: './src/services/eventdefinition/eventdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ExampleScenario: {
      service: './src/services/examplescenario/examplescenario.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ExplanationOfBenefit: {
      service: './src/services/explanationofbenefit/explanationofbenefit.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    FamilyMemberHistory: {
      service: './src/services/familymemberhistory/familymemberhistory.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Flag: {
      service: './src/services/flag/flag.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Goal: {
      service: './src/services/goal/goal.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    GraphDefinition: {
      service: './src/services/graphdefinition/graphdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Group: {
      service: './src/services/group/group.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    GuidanceResponse: {
      service: './src/services/guidanceresponse/guidanceresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    HealthcareService: {
      service: './src/services/healthcareservice/healthcareservice.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ImagingStudy: {
      service: './src/services/imagingstudy/imagingstudy.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Immunization: {
      service: './src/services/immunization/immunization.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ImmunizationEvaluation: {
      service: './src/services/immunizationevaluation/immunizationevaluation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ImmunizationRecommendation: {
      service: './src/services/immunizationrecommendation/immunizationrecommendation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ImplementationGuide: {
      service: './src/services/implementationguide/implementationguide.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    InsurancePlan: {
      service: './src/services/insuranceplan/insuranceplan.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Invoice: {
      service: './src/services/invoice/invoice.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Library: {
      service: './src/services/library/library.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Linkage: {
      service: './src/services/linkage/linkage.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    List: {
      service: './src/services/list/list.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Location: {
      service: './src/services/location/location.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Measure: {
      service: './src/services/measure/measure.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MeasureReport: {
      service: './src/services/measurereport/measurereport.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Media: {
      service: './src/services/media/media.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Medication: {
      service: './src/services/medication/medication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicationAdministration: {
      service: './src/services/medicationadministration/medicationadministration.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicationDispense: {
      service: './src/services/medicationdispense/medicationdispense.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicationKnowledge: {
      service: './src/services/medicationknowledge/medicationknowledge.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicationRequest: {
      service: './src/services/medicationrequest/medicationrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicationStatement: {
      service: './src/services/medicationstatement/medicationstatement.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicinalProduct: {
      service: './src/services/medicinalproduct/medicinalproduct.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicinalProductAuthorization: {
      service: './src/services/medicinalproductauthorization/medicinalproductauthorization.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicinalProductContraindication: {
      service: './src/services/medicinalproductcontraindication/medicinalproductcontraindication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicinalProductIndication: {
      service: './src/services/medicinalproductindication/medicinalproductindication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicinalProductPackaged: {
      service: './src/services/medicinalproductpackaged/medicinalproductpackaged.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MedicinalProductPharmaceutical: {
      service: './src/services/medicinalproductpharmaceutical/medicinalproductpharmaceutical.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MessageDefinition: {
      service: './src/services/messagedefinition/messagedefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MessageHeader: {
      service: './src/services/messageheader/messageheader.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    MolecularSequence: {
      service: './src/services/molecularsequence/molecularsequence.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    NamingSystem: {
      service: './src/services/namingsystem/namingsystem.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    NutritionOrder: {
      service: './src/services/nutritionorder/nutritionorder.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Observation: {
      service: './src/services/observation/observation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    OperationDefinition: {
      service: './src/services/operationdefinition/operationdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Organization: {
      service: './src/services/organization/organization.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    OrganizationAffiliation: {
      service: './src/services/organizationaffiliation/organizationaffiliation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Patient: {
      service: './src/services/patient/patient.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    PaymentNotice: {
      service: './src/services/paymentnotice/paymentnotice.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    PaymentReconciliation: {
      service: './src/services/paymentreconciliation/paymentreconciliation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Person: {
      service: './src/services/person/person.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    PlanDefinition: {
      service: './src/services/plandefinition/plandefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Practitioner: {
      service: './src/services/practitioner/practitioner.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    PractitionerRole: {
      service: './src/services/practitionerrole/practitionerrole.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Procedure: {
      service: './src/services/procedure/procedure.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Provenance: {
      service: './src/services/provenance/provenance.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Questionnaire: {
      service: './src/services/questionnaire/questionnaire.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    QuestionnaireResponse: {
      service: './src/services/questionnaireresponse/questionnaireresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    RelatedPerson: {
      service: './src/services/relatedperson/relatedperson.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    RequestGroup: {
      service: './src/services/requestgroup/requestgroup.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ResearchDefinition: {
      service: './src/services/researchdefinition/researchdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ResearchElementDefinition: {
      service: './src/services/researchelementdefinition/researchelementdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ResearchStudy: {
      service: './src/services/researchstudy/researchstudy.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ResearchSubject: {
      service: './src/services/researchsubject/researchsubject.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    RiskAssessment: {
      service: './src/services/riskassessment/riskassessment.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    RiskEvidenceSynthesis: {
      service: './src/services/riskevidencesynthesis/riskevidencesynthesis.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Schedule: {
      service: './src/services/schedule/schedule.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    SearchParameter: {
      service: './src/services/searchparameter/searchparameter.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ServiceRequest: {
      service: './src/services/servicerequest/servicerequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Slot: {
      service: './src/services/slot/slot.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Specimen: {
      service: './src/services/specimen/specimen.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    SpecimenDefinition: {
      service: './src/services/specimendefinition/specimendefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    StructureDefinition: {
      service: './src/services/structuredefinition/structuredefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    StructureMap: {
      service: './src/services/structuremap/structuremap.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Subscription: {
      service: './src/services/subscription/subscription.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Substance: {
      service: './src/services/substance/substance.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    SubstanceSpecification: {
      service: './src/services/substancespecification/substancespecification.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    SupplyDelivery: {
      service: './src/services/supplydelivery/supplydelivery.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    SupplyRequest: {
      service: './src/services/supplyrequest/supplyrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    Task: {
      service: './src/services/task/task.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    TerminologyCapabilities: {
      service: './src/services/terminologycapabilities/terminologycapabilities.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    TestReport: {
      service: './src/services/testreport/testreport.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    TestScript: {
      service: './src/services/testscript/testscript.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    ValueSet: {
      service: './src/services/valueset/valueset.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    VerificationResult: {
      service: './src/services/verificationresult/verificationresult.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
    VisionPrescription: {
      service: './src/services/visionprescription/visionprescription.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'validate',
          route: '/$validate',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/resource-operation-validate.html',
        },
      ],
    },
};

module.exports = {
    profiles
};
