function toCamel(key: string) {
  return key.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/**
 * Recursively converts snake_case object keys to camelCase, and aliases
 * any "id" field to "_id" (to match the shape the frontend expects).
 */
export function camelize(value: any): any {
  if (Array.isArray(value)) {
    return value.map(camelize);
  }

  if (value !== null && typeof value === "object" && !(value instanceof Date)) {
    const result: any = {};
    for (const [key, val] of Object.entries(value)) {
      result[toCamel(key)] = camelize(val);
    }
    if (Object.prototype.hasOwnProperty.call(result, "id")) {
      result._id = result.id;
      delete result.id;
    }
    return result;
  }

  return value;
}
