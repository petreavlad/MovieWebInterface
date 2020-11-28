var profile;

export function storeProfile(newProfile) {
  profile = newProfile;
}

export function getCurrentProfile() {
  return profile;
}
