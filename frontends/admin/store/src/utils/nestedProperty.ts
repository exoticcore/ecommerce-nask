// utils/objectUtils.ts
export const getNestedProperty = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => {
    const match = part.match(/(\w+)\[(\d+)\]/);
    if (match) {
      const [, key, index] = match;
      return acc && acc[key] && acc[key][index];
    }
    return acc && acc[part];
  }, obj);
};

export const setNestedProperty = (obj: any, path: string, value: any) => {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((acc, part) => {
    const match = part.match(/(\w+)\[(\d+)\]/);
    if (match) {
      const [, key, index] = match;
      if (!acc[key]) acc[key] = [];
      return (acc[key][index] = acc[key][index] || {});
    }
    return (acc[part] = acc[part] || {});
  }, obj);
  if (target && last) {
    const match = last.match(/(\w+)\[(\d+)\]/);
    if (match) {
      const [, key, index] = match;
      if (!target[key]) target[key] = [];
      target[key][index] = value;
    } else {
      target[last] = value;
    }
  }
};
