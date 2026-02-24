// Type definitions for entity schemas

export interface EntityFieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface EntityField {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "enum" | "reference";
  required: boolean;
  default?: string | number | boolean;
  options?: string[];
  searchable?: boolean;
  display?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  ui?: "text" | "textarea" | "select" | "checkbox" | "date" | "number";
  validation?: EntityFieldValidation;
}

export interface EntityOwnership {
  field: string;
  model: "per-user" | "per-org" | "global";
}

export interface EntityApiConfig {
  basePath: string;
  operations: ("list" | "get" | "create" | "update" | "delete")[];
  pagination: boolean;
  defaultSort: { field: string; order: "asc" | "desc" };
  defaultLimit: number;
}

export interface EntityUiConfig {
  listLayout: "table" | "cards" | "kanban";
  detailLayout: "detail-sidebar" | "full-page" | "modal";
  createLayout: "modal" | "page" | "drawer";
  cardFields: string[];
}

export interface EntitySchema {
  name: string;
  displayName: string;
  pluralName: string;
  description: string;
  icon: string;
  fields: EntityField[];
  ownership: EntityOwnership;
  api: EntityApiConfig;
  ui: EntityUiConfig;
}
