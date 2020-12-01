export default function classNames(
  ...strings: (string | undefined | null | false)[]
) {
  return strings.filter(Boolean).join(' ');
}
