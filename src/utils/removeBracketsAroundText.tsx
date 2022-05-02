export function removeBracketsAroundText(string: string) {
  return string[0] === "(" && string[string.length - 1] === ")"
    ? string.slice(1, -1)
    : string;
}
