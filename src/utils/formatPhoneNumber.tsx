export function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/ /g, "-").replace(/385-/g, "0");
}
