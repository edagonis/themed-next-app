import sha1 from "js-sha1"

export function encrypt(str) {
  return sha1(str)
}
