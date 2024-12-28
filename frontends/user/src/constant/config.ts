const API_DOMAIN = process.env.API_DOMAIN;

const MEDIA_DOMAIN =
  process.env.MEDIA_DOMAIN || `http://localhost:3003/api/v1/media`;

const AUTH_API = API_DOMAIN
  ? `${API_DOMAIN}/auth`
  : 'http://localhost:3000/api/v1/auth';

// CATALOG
const CATALOG_API = API_DOMAIN
  ? `${API_DOMAIN}/catalog`
  : 'http://localhost:3001/api/v1/catalog';

export { API_DOMAIN, AUTH_API, CATALOG_API, MEDIA_DOMAIN };
