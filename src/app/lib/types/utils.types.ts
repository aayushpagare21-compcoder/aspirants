export enum ContentType {
  PDF = "application/pdf",
  JPEG = "image/jpeg",
  PNG = "image/png",
}

export enum AIToolNames {
  AFFAIRS_QUEST = "AFFAIRS_QUEST",
  SMARTCHECK = "SMARTCHECK",
  QUERY_MAINS = "QUERY_MAINS",
  NOTETALK = "NOTETALK",
}

export function formatToolsName(name: AIToolNames) {
  switch (name) {
    case AIToolNames.AFFAIRS_QUEST: {
      return "Affairs Quest";
    }
    case AIToolNames.SMARTCHECK: {
      return "Smartcheck";
    }
    case AIToolNames.QUERY_MAINS: {
      return "Query Mains";
    }
    case AIToolNames.NOTETALK: {
      return "Notetalk";
    }
  }
}
