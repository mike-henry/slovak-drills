export const loadWords = async <T>(
  resourceName: string,
  words: T[],
  defaultWords: T[],
  fromRaw: (raw: any) => T,
  filterFn?: (arg: T) => boolean, // optional: (item) => boolean
): Promise<T[]> => {
  if (words.length > 0) return words;

  // Start with defaults (filtered if a filter function is provided)
  words = typeof filterFn === 'function' ? defaultWords.filter(filterFn) : defaultWords;

  try {
    const res = await fetch(`/${resourceName}`);
    if (res.ok) {
      const data = await res.json().then((rawArray) => rawArray.map(fromRaw));
      // Apply filter automatically if provided
      words = typeof filterFn === 'function' ? data.filter(filterFn) : data;
      console.info(`✅ Loaded ${words.length} words from ${resourceName}`);
    } else {
      console.warn(`⚠️ Could not load ${resourceName}, using defaults.`);
    }
  } catch (error) {
    console.error(`❌ Error loading ${resourceName}:`, error);
  }

  return words;
};
