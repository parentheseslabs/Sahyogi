export const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicy"][0] {
  _id,
  title,
  lastUpdated,
  content,
  sections[] {
    title,
    content
  }
}`;

export const TERMS_OF_SERVICE_QUERY = `*[_type == "termsOfService"][0] {
  _id,
  title,
  lastUpdated,
  content,
  sections[] {
    title,
    content
  }
}`;
