import axios from 'axios';
import { CATALOG_API } from '../constant/config';
import { IBrand } from '../interface/brand.interface';

const getBrandListAPI = async (): Promise<IBrand | null> => {
  const response = await axios.get(`${CATALOG_API}/brand`);

  if ((response.status = 200)) {
    return response.data;
  }

  return null;
};

export { getBrandListAPI };
