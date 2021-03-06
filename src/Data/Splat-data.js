import refData from "./SICS-refdata";

let typeData = {
  InsuredPeriod: {
    name: "InsuredPeriod",
    propertyMap: {
      TypeOfBusiness: {
        name: "TypeOfBusiness",
        type: "SicsTypeOfBusiness",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      IsCoinsurance: {
        name: "IsCoinsurance",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      BusinessPartners: {
        name: "BusinessPartners",
        type: "Partner[]",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      ReportingUnit: {
        name: "ReportingUnit",
        type: "SicsReportingUnit",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      TypeOfParticipation: {
        name: "TypeOfParticipation",
        type: "SicsTypeOfParticipationMethod",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      UWYear: {
        name: "UWYear",
        type: ":IntegerNumber",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      MainCurrency: {
        name: "MainCurrency",
        type: "SicsCurrency",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      MainClassOfBusiness: {
        name: "MainClassOfBusiness",
        type: "SicsMainClassOfBusiness",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      LifeCycleStatus: {
        name: "LifeCycleStatus",
        type: "OptionsValue",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      StartDate: {
        name: "StartDate",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      EndDate: {
        name: "EndDate",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ClassesOfBusiness: {
        name: "ClassesOfBusiness",
        type: ":Text[]",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  ProgramRef: {
    name: "ProgramRef",
    propertyMap: {
      originalUri: {
        name: "originalUri",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ContractLayers: {
        name: "ContractLayers",
        type: "ContractLayerRef[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ProgramId: {
        name: "ProgramId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "EntityRelation",
  },
  GalaxyCreatePostResultProgramWrapper: {
    name: "GalaxyCreatePostResultProgramWrapper",
    propertyMap: {
      Program: {
        name: "Program",
        type: "ProgramRef",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  Partner: {
    name: "Partner",
    propertyMap: {
      RelationshipCode: {
        name: "RelationshipCode",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  Favourite: {
    name: "Favourite",
    propertyMap: {
      Subsystem: {
        name: "Subsystem",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Uri: {
        name: "Uri",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      View: {
        name: "View",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  UserSubsystemSetting: {
    name: "UserSubsystemSetting",
    propertyMap: {
      Subsystem: {
        name: "Subsystem",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Value: {
        name: "Value",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Key: {
        name: "Key",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  OptionsValue: {
    name: "OptionsValue",
    propertyMap: {
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  GalaxyCreatePostResultInternalError500: {
    name: "GalaxyCreatePostResultInternalError500",
    propertyMap: {
      statusCode: {
        name: "statusCode",
        type: ":IntegerNumber",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      instance: {
        name: "instance",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      detail: {
        name: "detail",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      title: {
        name: "title",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      type: {
        name: "type",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  ReportingUnit: {
    name: "ReportingUnit",
    propertyMap: {
      Id: {
        name: "Id",
        type: ":IntegerNumber",
        isDerived: false,
        validation: {
          mandatory: [
            {
              itemType: "MandatoryValidationItem",
              inherited: true,
            },
          ],
        },
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {
          mandatory: [
            {
              itemType: "MandatoryValidationItem",
              inherited: true,
            },
          ],
        },
        access: "ReadOnly",
      },
      Description: {
        name: "Description",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      SicsId: {
        name: "SicsId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Active: {
        name: "Active",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  ContractPOCoverview: {
    name: "ContractPOCoverview",
    propertyMap: {
      process_IsCoinsurance: {
        name: "process_IsCoinsurance",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      MainClassOfBusinessOptions: {
        name: "MainClassOfBusinessOptions",
        type: "SicsMainClassOfBusiness[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      LifeCycleStatusOptions: {
        name: "LifeCycleStatusOptions",
        type: "OptionsValue[]",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      TypeOfBusinessOptions: {
        name: "TypeOfBusinessOptions",
        type: "SicsTypeOfBusiness[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      ReinsurerOptions: {
        name: "ReinsurerOptions",
        type: "SicsReinsurer[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      _deleted: {
        name: "_deleted",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      process_MainCurrency: {
        name: "process_MainCurrency",
        type: "SicsCurrency",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      root: {
        name: "root",
        type: "Program",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      RelationshipCodes: {
        name: "RelationshipCodes",
        type: "PartnerRelationshipCode",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      ReportingUnitOptions: {
        name: "ReportingUnitOptions",
        type: "SicsReportingUnit[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      result: {
        name: "result",
        type: "GalaxyCreatePostResult",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_BusinessLayer: {
        name: "process_BusinessLayer",
        type: "ContractLayer",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      ShowCedentInUI: {
        name: "ShowCedentInUI",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      process_Insured: {
        name: "process_Insured",
        type: "Partner",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      IsReadOnlyUser: {
        name: "IsReadOnlyUser",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      NrOfBusinessesToCreateOptions: {
        name: "NrOfBusinessesToCreateOptions",
        type: ":IntegerNumber[]",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      CurrentActivity: {
        name: "CurrentActivity",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      CurrentUser: {
        name: "CurrentUser",
        type: "UserRef",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_TypeOfParticipation: {
        name: "process_TypeOfParticipation",
        type: "SicsTypeOfParticipationMethod",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_EndDate: {
        name: "process_EndDate",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      modified: {
        name: "modified",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      process_ReportingUnit: {
        name: "process_ReportingUnit",
        type: "SicsReportingUnit",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_Reinsurer: {
        name: "process_Reinsurer",
        type: "SicsReinsurer",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      IsCreating: {
        name: "IsCreating",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      CoinsuranceIsDisabled: {
        name: "CoinsuranceIsDisabled",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      process_StartDate: {
        name: "process_StartDate",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_UWYear: {
        name: "process_UWYear",
        type: ":IntegerNumber",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      UserAuthorizedToWrite: {
        name: "UserAuthorizedToWrite",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      process_Broker: {
        name: "process_Broker",
        type: "Partner",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_LifeCycleStatus: {
        name: "process_LifeCycleStatus",
        type: "OptionsValue",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_MainClassOfBusiness: {
        name: "process_MainClassOfBusiness",
        type: "SicsMainClassOfBusiness",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      NrOfBusinessesToCreate: {
        name: "NrOfBusinessesToCreate",
        type: ":IntegerNumber",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      TypeOfParticipationOptions: {
        name: "TypeOfParticipationOptions",
        type: "SicsTypeOfParticipationMethod[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      process_TypeOfBusiness: {
        name: "process_TypeOfBusiness",
        type: "SicsTypeOfBusiness",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      MainCurrencyOptions: {
        name: "MainCurrencyOptions",
        type: "SicsCurrency[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      ShowInsuredInUI: {
        name: "ShowInsuredInUI",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      process_Cedent: {
        name: "process_Cedent",
        type: "Partner",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      created: {
        name: "created",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      CanCreateBusiness: {
        name: "CanCreateBusiness",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadWrite",
      },
      IsAdminUser: {
        name: "IsAdminUser",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {
      CloseSidenavAndInit: {
        name: "CloseSidenavAndInit",
        parameters: {},
        guard: null,
        returnType: null,
      },
      GetFilteredReportingUnits: {
        name: "GetFilteredReportingUnits",
        parameters: {},
        guard: null,
        returnType: "SicsReportingUnit[]",
      },
      SetReportingUnitOptionsBasedOnReinsurer: {
        name: "SetReportingUnitOptionsBasedOnReinsurer",
        parameters: {},
        guard: null,
        returnType: null,
      },
      Setup: {
        name: "Setup",
        parameters: {},
        guard: null,
        returnType: null,
      },
      ResetCoinsuranceValue: {
        name: "ResetCoinsuranceValue",
        parameters: {},
        guard: null,
        returnType: null,
      },
      Init: {
        name: "Init",
        parameters: {},
        guard: null,
        returnType: null,
      },
      InitializeRefData: {
        name: "InitializeRefData",
        parameters: {},
        guard: null,
        returnType: null,
      },
      InitializeRoot: {
        name: "InitializeRoot",
        parameters: {},
        guard: null,
        returnType: null,
      },
      SelectCedent: {
        name: "SelectCedent",
        parameters: {
          partner: {
            name: "partner",
            type: "Partner",
          },
        },
        guard: null,
        returnType: null,
      },
      TypeOfBusinessChange: {
        name: "TypeOfBusinessChange",
        parameters: {},
        guard: null,
        returnType: null,
      },
      UserAuthorizedAt: {
        name: "UserAuthorizedAt",
        parameters: {
          level: {
            name: "level",
            type: ":Text",
          },
        },
        guard: null,
        returnType: ":Flag",
      },
      SetUpAuth: {
        name: "SetUpAuth",
        parameters: {},
        guard: null,
        returnType: null,
      },
      DeselectReinsurer: {
        name: "DeselectReinsurer",
        parameters: {},
        guard: null,
        returnType: null,
      },
      UserAuthorizedAtAnyOf: {
        name: "UserAuthorizedAtAnyOf",
        parameters: {
          levels: {
            name: "levels",
            type: ":Text[]",
          },
        },
        guard: null,
        returnType: ":Flag",
      },
      GetReportingUnits: {
        name: "GetReportingUnits",
        parameters: {},
        guard: null,
        returnType: "SicsReportingUnit[]",
      },
      CopyValuesFromProcessToBusinessLayer: {
        name: "CopyValuesFromProcessToBusinessLayer",
        parameters: {},
        guard: null,
        returnType: null,
      },
      SetEndDateAndUWYear: {
        name: "SetEndDateAndUWYear",
        parameters: {},
        guard: null,
        returnType: null,
      },
      ValidateInsuredPeriods: {
        name: "ValidateInsuredPeriods",
        parameters: {},
        guard: null,
        returnType: ":Flag",
      },
      GetReinsurers: {
        name: "GetReinsurers",
        parameters: {},
        guard: null,
        returnType: "SicsReinsurer[]",
      },
      GetTypeOfParticipationMethods: {
        name: "GetTypeOfParticipationMethods",
        parameters: {},
        guard: null,
        returnType: "SicsTypeOfParticipationMethod[]",
      },
      SetTypeOfParticipation: {
        name: "SetTypeOfParticipation",
        parameters: {},
        guard: null,
        returnType: null,
      },
      GetBusinessPartners: {
        name: "GetBusinessPartners",
        parameters: {
          filter: {
            name: "filter",
            type: ":Text",
          },
        },
        guard: null,
        returnType: "Partner[]",
      },
      GetThirdParty: {
        name: "GetThirdParty",
        parameters: {
          filter: {
            name: "filter",
            type: ":Text",
          },
        },
        guard: null,
        returnType: "Partner[]",
      },
      InitializeLifeCycleStatus: {
        name: "InitializeLifeCycleStatus",
        parameters: {},
        guard: null,
        returnType: "OptionsValue",
      },
      SelectBroker: {
        name: "SelectBroker",
        parameters: {
          partner: {
            name: "partner",
            type: "Partner",
          },
        },
        guard: null,
        returnType: null,
      },
      InitializeUserPrefTypeOfBusiness: {
        name: "InitializeUserPrefTypeOfBusiness",
        parameters: {},
        guard: null,
        returnType: null,
      },
      CreateBusiness: {
        name: "CreateBusiness",
        parameters: {},
        guard: "CanCreateBusiness",
        returnType: null,
      },
      SelectInsured: {
        name: "SelectInsured",
        parameters: {
          partner: {
            name: "partner",
            type: "Partner",
          },
        },
        guard: null,
        returnType: null,
      },
      GenerateDummyData: {
        name: "GenerateDummyData",
        parameters: {},
        guard: null,
        returnType: null,
      },
      InitializeProcessVariables: {
        name: "InitializeProcessVariables",
        parameters: {},
        guard: null,
        returnType: null,
      },
      DeselectInsured: {
        name: "DeselectInsured",
        parameters: {},
        guard: null,
        returnType: null,
      },
      ValidateBusinessRoot: {
        name: "ValidateBusinessRoot",
        parameters: {},
        guard: null,
        returnType: ":Flag",
      },
      DeselectCedent: {
        name: "DeselectCedent",
        parameters: {},
        guard: null,
        returnType: null,
      },
      SelectReinsurer: {
        name: "SelectReinsurer",
        parameters: {
          partner: {
            name: "partner",
            type: "SicsReinsurer",
          },
        },
        guard: null,
        returnType: null,
      },
      GetCurrencies: {
        name: "GetCurrencies",
        parameters: {},
        guard: null,
        returnType: "SicsCurrency[]",
      },
      GetMainClassOfBusinesses: {
        name: "GetMainClassOfBusinesses",
        parameters: {},
        guard: null,
        returnType: "SicsMainClassOfBusiness[]",
      },
      GetTypeOfBusinesses: {
        name: "GetTypeOfBusinesses",
        parameters: {},
        guard: null,
        returnType: "SicsTypeOfBusiness[]",
      },
      DeselectBroker: {
        name: "DeselectBroker",
        parameters: {},
        guard: null,
        returnType: null,
      },
      GetReportingUnitsFromReinsurers: {
        name: "GetReportingUnitsFromReinsurers",
        parameters: {
          reinsurer: {
            name: "reinsurer",
            type: "SicsBusinessPartner",
          },
          reinsurersWithRepUnits: {
            name: "reinsurersWithRepUnits",
            type: "SicsReinsurer[]",
          },
        },
        guard: null,
        returnType: ":Text[]",
      },
      CloseSidenav: {
        name: "CloseSidenav",
        parameters: {},
        guard: null,
        returnType: null,
      },
      SetReinsurerBasedOnReportingUnit: {
        name: "SetReinsurerBasedOnReportingUnit",
        parameters: {},
        guard: null,
        returnType: null,
      },
    },
    immutable: false,
    kind: "CrudProcess",
  },
  ContractLayerRef: {
    name: "ContractLayerRef",
    propertyMap: {
      BusinessId: {
        name: "BusinessId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      InsuredPeriods: {
        name: "InsuredPeriods",
        type: "InsuredPeriod[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      BusinessTitle: {
        name: "BusinessTitle",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      originalUri: {
        name: "originalUri",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ProgramId: {
        name: "ProgramId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "EntityRelation",
  },
  GalaxyCreatePostResultErrorWrapper: {
    name: "GalaxyCreatePostResultErrorWrapper",
    propertyMap: {
      BadRequest: {
        name: "BadRequest",
        type: "GalaxyCreatePostResultBadRequest400",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      UnknownError: {
        name: "UnknownError",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      InternalError: {
        name: "InternalError",
        type: "GalaxyCreatePostResultInternalError500",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  SicsBusinessPartner: {
    name: "SicsBusinessPartner",
    propertyMap: {
      IsThirdParty: {
        name: "IsThirdParty",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Location: {
        name: "Location",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      IsBaseCompany: {
        name: "IsBaseCompany",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      BaseCompanyGroup: {
        name: "BaseCompanyGroup",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      AlertReason: {
        name: "AlertReason",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Country: {
        name: "Country",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      IsProvisional: {
        name: "IsProvisional",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      IsBusinessPartner: {
        name: "IsBusinessPartner",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Categories: {
        name: "Categories",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      UpperCaseName: {
        name: "UpperCaseName",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      IsAlert: {
        name: "IsAlert",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Identifier: {
        name: "Identifier",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      IsActive: {
        name: "IsActive",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  Program: {
    name: "Program",
    propertyMap: {
      _deleted: {
        name: "_deleted",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      modified: {
        name: "modified",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ContractLayers: {
        name: "ContractLayers",
        type: "ContractLayerRef[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      ProgramId: {
        name: "ProgramId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      created: {
        name: "created",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: false,
    kind: "Entity",
  },
  SicsReportingUnit: {
    name: "SicsReportingUnit",
    propertyMap: {
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  PartnerRelationshipCode: {
    name: "PartnerRelationshipCode",
    propertyMap: {
      Broker: {
        name: "Broker",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      Reinsurer: {
        name: "Reinsurer",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      OriginalReinsurer: {
        name: "OriginalReinsurer",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      OtherReinsurer: {
        name: "OtherReinsurer",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      FormerBroker: {
        name: "FormerBroker",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      Cedent: {
        name: "Cedent",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      OriginalCedent: {
        name: "OriginalCedent",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      Agent: {
        name: "Agent",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      Administrator: {
        name: "Administrator",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      Insured: {
        name: "Insured",
        type: ":Text",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  ContractLayer: {
    name: "ContractLayer",
    propertyMap: {
      _deleted: {
        name: "_deleted",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      BusinessId: {
        name: "BusinessId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      InsuredPeriods: {
        name: "InsuredPeriods",
        type: "InsuredPeriod[]",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      BusinessTitle: {
        name: "BusinessTitle",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      modified: {
        name: "modified",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ProgramId: {
        name: "ProgramId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadWrite",
      },
      created: {
        name: "created",
        type: ":DateTime",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: false,
    kind: "Entity",
  },
  SicsMainClassOfBusiness: {
    name: "SicsMainClassOfBusiness",
    propertyMap: {
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  Currency: {
    name: "Currency",
    propertyMap: {
      Fullname: {
        name: "Fullname",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Created: {
        name: "Created",
        type: ":Date",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ReplacedFrom: {
        name: "ReplacedFrom",
        type: ":Date",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      RICCode: {
        name: "RICCode",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      ReplacedWith: {
        name: "ReplacedWith",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Replaced: {
        name: "Replaced",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
      Active: {
        name: "Active",
        type: ":Flag",
        isDerived: true,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  GalaxyCreatePostResult: {
    name: "GalaxyCreatePostResult",
    propertyMap: {
      Errormessage: {
        name: "Errormessage",
        type: "GalaxyCreatePostResultErrorWrapper",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      StatusCode: {
        name: "StatusCode",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Body: {
        name: "Body",
        type: "GalaxyCreatePostResultProgramWrapper",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  SicsCurrency: {
    name: "SicsCurrency",
    propertyMap: {
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  Office: {
    name: "Office",
    propertyMap: {
      Id: {
        name: "Id",
        type: ":IntegerNumber",
        isDerived: false,
        validation: {
          mandatory: [
            {
              itemType: "MandatoryValidationItem",
              inherited: true,
            },
          ],
        },
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {
          mandatory: [
            {
              itemType: "MandatoryValidationItem",
              inherited: true,
            },
          ],
        },
        access: "ReadOnly",
      },
      Description: {
        name: "Description",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      AdId: {
        name: "AdId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      SicsId: {
        name: "SicsId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Active: {
        name: "Active",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  UserRole: {
    name: "UserRole",
    propertyMap: {
      Id: {
        name: "Id",
        type: ":Text",
        isDerived: false,
        validation: {
          mandatory: [
            {
              itemType: "MandatoryValidationItem",
              inherited: true,
            },
          ],
        },
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {
          mandatory: [
            {
              itemType: "MandatoryValidationItem",
              inherited: true,
            },
          ],
        },
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  SicsTypeOfParticipationMethod: {
    name: "SicsTypeOfParticipationMethod",
    propertyMap: {
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  SicsReinsurer: {
    name: "SicsReinsurer",
    propertyMap: {
      ReportingUnitCodes: {
        name: "ReportingUnitCodes",
        type: ":Text[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  SicsTypeOfBusiness: {
    name: "SicsTypeOfBusiness",
    propertyMap: {
      TypeOfParticipationCodes: {
        name: "TypeOfParticipationCodes",
        type: ":Text[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Code: {
        name: "Code",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  GalaxyCreatePostResultBadRequest400: {
    name: "GalaxyCreatePostResultBadRequest400",
    propertyMap: {
      traceId: {
        name: "traceId",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      type: {
        name: "type",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      title: {
        name: "title",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      status: {
        name: "status",
        type: ":IntegerNumber",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  OIDCClaims: {
    name: "OIDCClaims",
    propertyMap: {
      roles: {
        name: "roles",
        type: ":Text[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  UserDetailSetting: {
    name: "UserDetailSetting",
    propertyMap: {
      Subsystem: {
        name: "Subsystem",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Value: {
        name: "Value",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Type: {
        name: "Type",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Key: {
        name: "Key",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "ValueObject",
  },
  UserRef: {
    name: "UserRef",
    propertyMap: {
      ReportingUnits: {
        name: "ReportingUnits",
        type: "ReportingUnit[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      NewQuickBusinessMainCurrency: {
        name: "NewQuickBusinessMainCurrency",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      isAdmin: {
        name: "isAdmin",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Role: {
        name: "Role",
        type: "UserRole",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Name: {
        name: "Name",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      email: {
        name: "email",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      MainRate: {
        name: "MainRate",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      MainFX: {
        name: "MainFX",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      idClaims: {
        name: "idClaims",
        type: "OIDCClaims",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Description: {
        name: "Description",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      AltFX: {
        name: "AltFX",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Offices: {
        name: "Offices",
        type: "Office[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      DetailSettings: {
        name: "DetailSettings",
        type: "UserDetailSetting[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      NewQuickBusinessTypeOfBusiness: {
        name: "NewQuickBusinessTypeOfBusiness",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      originalUri: {
        name: "originalUri",
        type: ":Text",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      isUserReadOnly: {
        name: "isUserReadOnly",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      SubsystemSettings: {
        name: "SubsystemSettings",
        type: "UserSubsystemSetting[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      isAuthorized: {
        name: "isAuthorized",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      AltRate: {
        name: "AltRate",
        type: ":Flag",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      Favourites: {
        name: "Favourites",
        type: "Favourite[]",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
      DisplayCurrency: {
        name: "DisplayCurrency",
        type: "Currency",
        isDerived: false,
        validation: {},
        access: "ReadOnly",
      },
    },
    actionMap: {},
    immutable: true,
    kind: "EntityRelation",
  },
};

let currentUser = {
  isAdmin: true,
  Role: {
    Id: "A",
    Name: "Underwriter",
  },
  Name: "katrina",
  email: "katrina@test",
  idClaims: {
    roles: ["A", "gpi-admins"],
  },
  originalUri:
    "spl://user/eda0ea26-6167-4cdb-9db4-1394d7fa2dbd/User/1efd674e-6350-4da4-ac07-959f2015772a",
  isUserReadOnly: false,
  isAuthorized: true,
  Favourites: [],
};

let state = {
  MainClassOfBusinessOptions: refData.mainClassOfBusinessOptions,
  LifeCycleStatusOptions: refData.lifeCycleStatusOptions,
  TypeOfBusinessOptions: refData.typeOfBusinessOptions,
  TypeOfParticipationOptions: refData.typeOfParticipationOptions,
  ReinsurerOptions: refData.reinsurerOptions,
  MainCurrencyOptions: refData.mainCurrencyOptions,
  RelationshipCodes: refData.relationshipCodes,
  ReportingUnitOptions: refData.reportingUnitOptions,
  NrOfBusinessesToCreateOptions: refData.nrOfBusinessesToCreateOptions,
  CommonCurrency: refData.commonCurrency,
  ShowCedentInUI: true,
  IsReadOnlyUser: false,
  CurrentActivity: "contractPOCoverview",
  CurrentUser: currentUser,
  IsCreating: false,
  CoinsuranceIsDisabled: false,
  UserAuthorizedToWrite: true,
  NrOfBusinessesToCreate: 1,
  ShowInsuredInUI: true,
  CanCreateBusiness: false,
  IsAdminUser: true,
  root: {
    created: "2020-05-15T10:39:44.767581Z",
    modified: "2020-05-15T10:39:44.767581Z",
  },
  created: "2020-05-15T10:39:44.610850Z",
  modified: "2020-05-15T11:36:01.839408Z",
  process_IsCoinsurance: false,
  process_MainCurrency: {
    //Name: "MAD",
    //Code: "MAD",
  },
  process_BusinessLayer: {
    created: new Date(), //"2020-05-15T11:33:49.389920Z",
    BusinessTitle: '', //"Some Title",
    modified: undefined, //"2020-05-15T11:35:44.291831Z",
    InsuredPeriods: [
      {
        TypeOfBusiness: {
          TypeOfParticipationCodes: ["EMPTY", "BINDER", "LINESLIP"],
          Name: "Non-Prop Direct",
          Code: "NONPROPDIR",
        },
        IsCoinsurance: true,
        BusinessPartners: [
          {
            RelationshipCode: "RR",
            Name: "Boink",
            Code: "100571",
          },
          {
            RelationshipCode: "BR",
            Name: "Magnafone",
            Code: "14645",
          },
          {
            RelationshipCode: "IR",
            Name: "Pharmacon",
            Code: "66993",
          },
        ],
        ReportingUnit: {
          Name: "CH Zurich Branch",
          Code: "2391",
        },
        TypeOfParticipation: {
          Name: "Binder",
          Code: "BINDER",
        },
        UWYear: 2020,
        MainCurrency: {
          Name: "MAD",
          Code: "MAD",
        },
        MainClassOfBusiness: {
          Name: "Aviation",
          Code: "AVIATION",
        },
        LifeCycleStatus: {
          Name: "New Quote Requested",
          Code: "NQR",
        },
        StartDate: "2020-05-31T22:00Z",
        EndDate: "2021-05-30T22:00Z",
        ClassesOfBusiness: ["HEALTH"],
      },
    ],
  },
  process_Insured: {
    //RelationshipCode: "IR",
    //Name: "Pharmacon",
    //Code: "66993",
  },
  process_TypeOfParticipation: {
  },
  process_StartDate: undefined,
  process_EndDate: undefined,
  process_ReportingUnit: {
    // Name: "CH Zurich Branch",
    // Code: "2391",
  },
  process_Reinsurer: {
    //ReportingUnitCodes: ["2391", "2395"],
    //Name: "Boink",
    //Code: "100571",
  },
  process_UWYear: undefined, //2020
  process_TypeOfBusiness: {
  },
  process_Broker: {
    // RelationshipCode: "BR",
    // Name: "Magnafone",
    // Code: "14645",
  },
  process_LifeCycleStatus: {
    // Name: "New Quote Requested",
    // Code: "NQR",
  },
  process_MainClassOfBusiness: {
  },
};

let event = {
  eventName: "ContractPOCoverviewTouched",
  __eventType: "com.factor10.splat.metamodel.EntityTouched",
  timestamp: "2020-05-15T10:40:47.665232Z",
  eventId: {
    id: "e0e1b2a8-385e-4253-aebd-d4533e3d39c2",
  },
  origin:
    "spl://contract/eda0ea26-6167-4cdb-9db4-1394d7fa2dbd/ContractPOCoverview/d5114fc5-de88-449e-9355-7189793182ec",
  previousEventId: null,
  formatId: "c6b5b82f62a5956d9e4f7d7ce12ca6fe",
  initiator: {
    clientId: "4d9f0705cd92b39aef214f5540798081",
    sessionId: "d2051778-09ca-47c5-8360-fa548017fd74",
    correlationId: "t44e9OwSvN",
    userId: "1efd674e-6350-4da4-ac07-959f2015772a",
    extraId: null,
  },
};

let fakeCompanies = [
  {
    "Name": "Rubadub",
    "Code": 3575
  },
  {
    "Name": "Anacho",
    "Code": 3726
  },
  {
    "Name": "Elentrix",
    "Code": 9869
  },
  {
    "Name": "Parleynet",
    "Code": 6165
  },
  {
    "Name": "Zillar",
    "Code": 1167
  },
  {
    "Name": "Geekol",
    "Code": 2083
  },
  {
    "Name": "Puria",
    "Code": 1871
  },
  {
    "Name": "Polarium",
    "Code": 5760
  },
  {
    "Name": "Zuvy",
    "Code": 3927
  },
  {
    "Name": "Techade",
    "Code": 8240
  },
  {
    "Name": "Futurity",
    "Code": 5970
  },
  {
    "Name": "Insurety",
    "Code": 2176
  },
  {
    "Name": "Netur",
    "Code": 6512
  },
  {
    "Name": "Zenthall",
    "Code": 3574
  },
  {
    "Name": "Solaren",
    "Code": 5012
  },
  {
    "Name": "Accufarm",
    "Code": 4486
  },
  {
    "Name": "Rodeocean",
    "Code": 2157
  },
  {
    "Name": "Corpulse",
    "Code": 8863
  },
  {
    "Name": "Idealis",
    "Code": 3071
  },
  {
    "Name": "Mangelica",
    "Code": 4610
  },
  {
    "Name": "Spherix",
    "Code": 1820
  },
  {
    "Name": "Mazuda",
    "Code": 2192
  },
  {
    "Name": "Opticall",
    "Code": 4096
  },
  {
    "Name": "Uplinx",
    "Code": 7624
  },
  {
    "Name": "Xyqag",
    "Code": 9232
  },
  {
    "Name": "Zomboid",
    "Code": 2468
  },
  {
    "Name": "Insuresys",
    "Code": 4859
  },
  {
    "Name": "Corecom",
    "Code": 4899
  },
  {
    "Name": "Besto",
    "Code": 6096
  },
  {
    "Name": "Isotrack",
    "Code": 9637
  },
  {
    "Name": "Gaptec",
    "Code": 9028
  },
  {
    "Name": "Isoswitch",
    "Code": 1909
  },
  {
    "Name": "Petigems",
    "Code": 7450
  },
  {
    "Name": "Sarasonic",
    "Code": 4731
  },
  {
    "Name": "Zilidium",
    "Code": 2199
  },
  {
    "Name": "Ludak",
    "Code": 9011
  },
  {
    "Name": "Acumentor",
    "Code": 6483
  },
  {
    "Name": "Flexigen",
    "Code": 8256
  },
  {
    "Name": "Maroptic",
    "Code": 9880
  },
  {
    "Name": "Ziore",
    "Code": 4369
  },
  {
    "Name": "Slambda",
    "Code": 2082
  },
  {
    "Name": "Dreamia",
    "Code": 4415
  },
  {
    "Name": "Utara",
    "Code": 5072
  },
  {
    "Name": "Circum",
    "Code": 1891
  },
  {
    "Name": "Plasmox",
    "Code": 3408
  },
  {
    "Name": "Codact",
    "Code": 5621
  },
  {
    "Name": "Voratak",
    "Code": 4414
  },
  {
    "Name": "Apextri",
    "Code": 5573
  },
  {
    "Name": "Brainclip",
    "Code": 6549
  },
  {
    "Name": "Cyclonica",
    "Code": 2111
  },
  {
    "Name": "Comfirm",
    "Code": 7599
  },
  {
    "Name": "Datagen",
    "Code": 9134
  },
  {
    "Name": "Cipromox",
    "Code": 5214
  },
  {
    "Name": "Pawnagra",
    "Code": 8056
  },
  {
    "Name": "Gink",
    "Code": 2353
  },
  {
    "Name": "Insuron",
    "Code": 8053
  },
  {
    "Name": "Isologica",
    "Code": 8746
  },
  {
    "Name": "Tubesys",
    "Code": 6470
  },
  {
    "Name": "Organica",
    "Code": 8852
  },
  {
    "Name": "Kidgrease",
    "Code": 1541
  },
  {
    "Name": "Motovate",
    "Code": 6725
  },
  {
    "Name": "Zentix",
    "Code": 6156
  },
  {
    "Name": "Exostream",
    "Code": 1924
  },
  {
    "Name": "Fleetmix",
    "Code": 1583
  },
  {
    "Name": "Ezentia",
    "Code": 9250
  },
  {
    "Name": "Electonic",
    "Code": 3517
  },
  {
    "Name": "Golistic",
    "Code": 2206
  },
  {
    "Name": "Securia",
    "Code": 4338
  },
  {
    "Name": "Affluex",
    "Code": 8976
  },
  {
    "Name": "Enthaze",
    "Code": 8121
  },
  {
    "Name": "Eclipsent",
    "Code": 1334
  },
  {
    "Name": "Aquasseur",
    "Code": 2105
  },
  {
    "Name": "Enormo",
    "Code": 7771
  },
  {
    "Name": "Zolar",
    "Code": 7168
  },
  {
    "Name": "Columella",
    "Code": 1672
  }
]

export default {
  typeData,
  state,
  event,
  errors: {},
  lastKnownEventId: "e0e1b2a8-385e-4253-aebd-d4533e3d39c2",
  type: "TypeEventWithState",
  fakeCompanies: fakeCompanies
};
