export function validateEmailProvider(email: string) {
  const lowerEmail = email.toLowerCase();

  switch (true) {
    case lowerEmail.includes("@gmail.com"):
      return "Google Account detected";
    case lowerEmail.includes("@yahoo.com"):
      return "Yahoo Account detected";
    case lowerEmail.includes("@outlook.com"):
      return "Microsoft Account detected";
    default:
      return "Unknown or Private Provider";
  }
}

// export function ValidatePassword(password: string) {
//   // Regex: 1+ Number, 1+ Special Char, 1+ Letter
//   const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

//   if (regex.test(password)) {
//     return { valid: true, message: "Strong password" };
//   } else {
//     return {
//       valid: false,
//       message: "Password must be 8+ chars and include a number and a symbol.",
//     };
//   }
// }

export function ValidatePassword(password: string) {
  const errors: string[] = [];

  // 1. Length Check
  if (password.length < 8) {
    errors.push("at least 8 characters");
  }

  // 2. Number Check
  if (!/\d/.test(password)) {
    errors.push("at least one number");
  }

  // 3. Special Character Check
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("at least one symbol (!@#$%^&*)");
  }

  // 4. Letter Check (Optional but recommended)
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("at least one letter");
  }

  if (errors.length === 0) {
    return {
      valid: true,
      message: "Strong password",
    };
  } else {
    // Joins errors into a readable sentence: "Password must include at least 8 characters, at least one number..."
    return {
      valid: false,
      message: `Password must include ${errors.join(", ")}.`,
      errorList: errors, // You can also return the raw array for UI bullets
    };
  }
}

export function validateUsername(username: string) {
  if (username.length < 3) return "Username too short";
  if (username.length > 15) return "Username too long";

  const isAlphanumeric = /^[a-zA-Z0-9_]+$/.test(username);
  return isAlphanumeric
    ? "Valid username"
    : "Username can only contain letters, numbers, and underscores";
}
