
export default function templatize<T>(
  value: T
) {
  return Object.assign(
    (input: TemplateStringsArray) => ({
      ...value,
      docs: (input as TemplateStringsArray).join(""),
    }),
    value
  );
}
