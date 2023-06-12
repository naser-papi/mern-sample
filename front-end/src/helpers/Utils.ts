export function maskEmail(email: string) {
  let arr = email.split("@");
  arr[0] = arr[0].substring(0, 2) + arr[0].substring(3).replace(/./g, "*");
  const arr2 = arr[1].split(".");
  arr[1] = arr2[0].replace(/./g, "*") + "." + arr2[1];

  return arr.join("@");
}
