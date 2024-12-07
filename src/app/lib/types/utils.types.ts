export enum ContentType {
  PDF = "application/pdf",
  JPEG = "image/jpeg",
  PNG = "image/png",
}

export enum AIToolNames { 
  AFFAIRS_QUEST = "AFFAIRS_QUEST",
}

export function formatToolsName(name: AIToolNames) {  
  switch (name) {
    case AIToolNames.AFFAIRS_QUEST: {
      return "Affairs Quest";
    }
  }
}