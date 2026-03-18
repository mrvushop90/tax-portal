export type ClientFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  taxYear: string;
  status: string;
  notes: string;
  clientType: string;
  occupation: string;
  spouseFirstName: string;
  spouseLastName: string;
  engagementTaxYear: string;
};

export const defaultClientFormValues: ClientFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  ssn: "",
  address: "",
  city: "",
  state: "CA",
  zip: "",
  taxYear: "2025",
  status: "Intake Started",
  notes: "",
  clientType: "Individual",
  occupation: "",
  spouseFirstName: "",
  spouseLastName: "",
  engagementTaxYear: "2025",
};

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = getFormString(formData, key);

  return value === "" ? null : value;
}

function getOptionalInteger(formData: FormData, key: string) {
  const value = getFormString(formData, key);

  if (value === "") {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  return Number.isNaN(parsed) ? null : parsed;
}

function getOptionalDate(formData: FormData, key: string) {
  const value = getFormString(formData, key);

  if (value === "") {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getClientDataFromFormData(formData: FormData) {
  const firstName = getFormString(formData, "firstName");
  const lastName = getFormString(formData, "lastName");

  return {
    firstName,
    lastName,
    email: getOptionalString(formData, "email"),
    phone: getOptionalString(formData, "phone"),
    dateOfBirth: getOptionalDate(formData, "dateOfBirth"),
    ssn: getOptionalString(formData, "ssn"),
    address: getOptionalString(formData, "address"),
    city: getOptionalString(formData, "city"),
    state: getOptionalString(formData, "state"),
    zip: getOptionalString(formData, "zip"),
    taxYear:
      getOptionalInteger(formData, "engagementTaxYear") ??
      getOptionalInteger(formData, "taxYear"),
    status: getOptionalString(formData, "status"),
    notes: getOptionalString(formData, "notes"),
  };
}
