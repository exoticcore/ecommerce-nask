const API_DOMAIN = process.env.API_DOMAIN;
const MEDIA_DOMAIN = process.env.MEDIA_DOMAIN;

const AUTH_API = API_DOMAIN
  ? `${API_DOMAIN}/auth`
  : 'http://localhost:3000/api/v1/auth';
const CATALOG_API = API_DOMAIN
  ? `${API_DOMAIN}/catlalog`
  : 'http://localhost:3001/api/v1/catalog';
const MEDIA_API = MEDIA_DOMAIN
  ? MEDIA_DOMAIN
  : `http://localhost:3003/api/v1/media`;

export { API_DOMAIN, AUTH_API, CATALOG_API, MEDIA_API };
