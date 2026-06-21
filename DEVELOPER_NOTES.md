# Forten Developer Notes

## Local Port Policy

- Primary Forten CRM development port: `6400`.
- Fallback ports: `6401`, `6402`, `6403`, `6404`, `6405`.
- Use only ports in the `6400-6900` range for Forten development, previews, local verification, and temporary servers.
- Do not use ports `3000-5000`; they are reserved for other internal services.
- Do not use `3003`; it is reserved for a separate document translation service.
