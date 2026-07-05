"use client";

export const LEAD_STORE_KEY = "fortenLeads";
export const TICKET_STORE_KEY = "fortenV2Tickets";

export function readStoredArray(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : []));
    return true;
  } catch {
    return false;
  }
}

export function nextServiceTicketNumber(existingLeads = [], date = new Date()) {
  const year = date.getFullYear();
  const max = existingLeads.reduce((highest, lead) => {
    const match = String(lead.ticketNumber || "").match(new RegExp(`^FS-${year}-(\\d{6})$`));
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);
  return `FS-${year}-${String(max + 1).padStart(6, "0")}`;
}

export function createWebsiteLead(form, existingLeads = []) {
  const now = new Date();
  const created = now.toISOString();
  return {
    ...form,
    id: `lead-${now.getTime()}`,
    ticketNumber: nextServiceTicketNumber(existingLeads, now),
    createdAt: created,
    created,
    source: "Website",
    status: "NEW LEAD",
    priority: "Normal",
    assigned: "Dispatcher Queue"
  };
}

export function leadToTicket(lead, index = 0) {
  const createdAt = lead.createdAt ? new Date(lead.createdAt) : new Date();
  const ticketNumber = lead.ticketNumber || `FS-${createdAt.getFullYear()}-${String(index + 1).padStart(6, "0")}`;

  return {
    id: `website-${lead.id || ticketNumber}`,
    ticketNumber,
    status: "NEW LEAD",
    source: "Website",
    priority: lead.priority || "Normal",
    assigned: lead.assigned || "Dispatcher Queue",
    created: lead.created || lead.createdAt || createdAt.toISOString(),
    customerId: "",
    customer: lead.contact || lead.contactName || "",
    businessName: lead.businessName || "",
    phone: lead.phone || "",
    email: lead.email || "",
    address: lead.address || lead.serviceAddress || "",
    equipment: lead.equipment || lead.equipmentType || "",
    equipmentId: "",
    brand: lead.brand || lead.manufacturer || "",
    manufacturer: lead.brand || lead.manufacturer || lead.brandModel || lead.equipmentBrandModel || "",
    model: lead.model || lead.brandModel || lead.equipmentBrandModel || "",
    serial: "",
    problem: lead.issue || lead.problemDescription || "",
    preferredContactMethod: lead.preferredContactMethod || "Phone",
    preferredServiceTime: lead.preferredServiceTime || lead.notes || "",
    appointmentDate: lead.appointmentDate || "",
    technician: "",
    mentor: "Senior Mentor",
    dispatcher: lead.dispatcher || "Dispatcher Queue",
    internalNotes: "",
    dispatcherNotes: "Website lead waiting for dispatcher review.",
    mentorNotes: "",
    technicianNotes: "",
    diagnosticNotes: lead.notes || lead.preferredServiceTime || "Website request waiting for dispatch.",
    temperatureReadings: "-",
    pressureReadings: "-",
    voltageReadings: "-",
    photos: "Photos pending",
    videos: "Videos pending",
    mentorDiagnosis: "Pending diagnostic and mentor review.",
    quoteTotal: 0,
    invoiceStatus: "Not generated",
    gpsTime: "Not started",
    beforeAfter: "Pending",
    attachments: { photos: ["Upload placeholder"], videos: ["Upload placeholder"], documents: ["Website request"] },
    timeline: [
      ["Created", createdAt.toLocaleString()],
      ["Edited", "Pending"],
      ["Status Changed", "Pending"],
      ["Assigned", lead.assigned || "Dispatcher Queue"],
      ["Technician Assigned", "Pending"],
      ["Mentor Assigned", "Pending"],
      ["On The Way", "Pending"],
      ["Arrived", "Pending"],
      ["Diagnostic", "Pending"],
      ["Mentor Review", "Pending"],
      ["Quote Generated", "Pending"],
      ["Invoice Generated", "Pending"],
      ["Approved", "Pending"],
      ["Invoice Sent", "Pending"],
      ["Paid", "Pending"],
      ["Repair Started", "Pending"],
      ["Completed", "Pending"],
      ["Closed", "Pending"]
    ]
  };
}

export function storeWebsiteLeadAndTicket(lead) {
  const leads = readStoredArray(LEAD_STORE_KEY, []);
  writeStoredArray(LEAD_STORE_KEY, [lead, ...leads.filter((item) => item.id !== lead.id)]);

  const ticket = leadToTicket(lead);
  const tickets = readStoredArray(TICKET_STORE_KEY, []);
  writeStoredArray(TICKET_STORE_KEY, [ticket, ...tickets.filter((item) => item.ticketNumber !== ticket.ticketNumber)]);
  return ticket;
}
