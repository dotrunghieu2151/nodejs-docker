export const regexMatchAll = (
  str: string,
  regex: RegExp,
  onMatchCb?: <T>(result: {
    match: string;
    matchAtIndex?: number;
    capturedGroups?: string[];
  }) => T,
) =>
  Array.from(str.matchAll(regex), (m) => {
    const result = {
      match: m[0],
      matchAtIndex: m.index,
      capturedGroups: m.length > 1 ? m.slice(1) : undefined,
    };
    return onMatchCb ? onMatchCb(result) : result;
  });

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const pascalCaseToSnakeCase = (value: string) => {
  return value
    .replace(/^([A-Z])/, ($1) => $1.toLowerCase())
    .replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
};

export const snakeCaseToPascalCase = (value: string) => {
  return value
    .replace(/^([a-z])/, ($1) => $1.toUpperCase())
    .replace(/(_[a-z])/g, ($1) => $1.slice(1).toUpperCase());
};

export const camelCaseToSnakeCase = (value: string) => {
  return value.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
};

export const snakeCaseToCamelCase = (value: string) => {
  return value.replace(/(_[a-z])/g, ($1) => $1.slice(1).toUpperCase());
};

export const compareVersion = (
  v1: string,
  v2: string,
  options: {
    lexicographical: boolean;
    zeroExtend: boolean;
  } = {
    lexicographical: false,
    zeroExtend: true,
  },
) => {
  // lexicographical means version has letters and numbers;
  // zeroExtends means we allow '1.0' === '1.0.0'
  const { lexicographical, zeroExtend } = options;
  const v1parts = v1.split('.');
  const v2parts = v2.split('.');

  function isValidPart(x: string) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push('0');
    while (v2parts.length < v1parts.length) v2parts.push('0');
  }

  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
};

export const replaceAt = (str: string, index: number, replacement: string) => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};
