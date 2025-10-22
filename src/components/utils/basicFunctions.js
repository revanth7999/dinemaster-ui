/**
 *
 * @param {*} a
 * @returns
 * Checks if the input a is empty (null, undefined, empty string, empty array, or empty object).
 */
export function isEmpty(a) {
  // Check if a is null, undefined, or empty
  if (a == null) {
    return true;
  }

  // Check if a b is an empty string
  if (a === "") {
    return true;
  }

  // Check if a is an empty array
  if (Array.isArray(a) && a.length === 0) {
    return true;
  }

  // Check if a or b is an empty object
  if (
    typeof a === "object" &&
    Object.keys(a).length === 0 &&
    a.constructor === Object
  ) {
    return true;
  }

  return false;
}

export function formValidation(email, password) {
  if (isEmpty(email) && isEmpty(password)) {
    alert("Please enter Email and Password");
    return false;
  } else if (isEmpty(email) || isEmpty(password)) {
    alert("Please enter details");
    return false;
  }
  return true;
}

export const isPublicRoute = (pathname) =>
  ["/login", "/oauth-success"].some((path) => pathname.includes(path));
