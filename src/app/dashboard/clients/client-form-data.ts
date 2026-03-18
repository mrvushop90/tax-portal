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

export function normalizeSsn(value: string) {
  return value.replace(/\D/g, "").slice(0, 9);
}

export function formatSsn(value: string) {
  const digits = normalizeSsn(value);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 5) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

export function normalizeZip(value: string) {
  return value.replace(/\D/g, "").slice(0, 5);
}

export function normalizeState(value: string) {
  return value.replace(/[^a-z]/gi, "").toUpperCase().slice(0, 2);
}

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

function getOptionalSsn(formData: FormData, key: string) {
  const value = normalizeSsn(getFormString(formData, key));

  return value === "" ? null : formatSsn(value);
}

function getOptionalDate(formData: FormData, key: string) {
  const value = getFormString(formData, key);

  if (value === "") {
    return null;
  }

  const mmddyyyyMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (mmddyyyyMatch) {
    const [, month, day, year] = mmddyyyyMatch;
    const parsed = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    if (
      !Number.isNaN(parsed.getTime()) &&
      parsed.getUTCFullYear() === Number(year) &&
      parsed.getUTCMonth() + 1 === Number(month) &&
      parsed.getUTCDate() === Number(day)
    ) {
      return parsed;
    }

    return null;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getClientDataFromFormData(formData: FormData) {
  const firstName = getFormString(formData, "firstName");
  const lastName = getFormString(formData, "lastName");
  const state = normalizeState(getFormString(formData, "state"));

  return {
    firstName,
    lastName,
    email: getOptionalString(formData, "email"),
    phone: getOptionalString(formData, "phone"),
    dateOfBirth: getOptionalDate(formData, "dateOfBirth"),
    ssn: getOptionalSsn(formData, "ssn"),
    address: getOptionalString(formData, "address"),
    city: getOptionalString(formData, "city"),
    state: state === "" ? null : state,
    zip: (() => {
      const value = normalizeZip(getFormString(formData, "zip"));

      return value === "" ? null : value;
    })(),
    taxYear:
      getOptionalInteger(formData, "engagementTaxYear") ??
      getOptionalInteger(formData, "taxYear"),
    status: getOptionalString(formData, "status"),
    notes: getOptionalString(formData, "notes"),
  };
}
