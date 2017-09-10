export function getPopularProjectOfLanguage(lang, page) {
  let url = `https://api.github.com/search/repositories?q=stars:>500+language:${lang}&sort=stars&order=desc&page=${page}`

  return fetch(url).then((res) => res.json());
}
export function getUserInfoByName(name) {
  let url = `https://api.github.com/users/${name}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_SECRET_ID`

  return fetch(url).then((res) => res.json());
}
export function getGreatPeopleList(page) {
  let url = `https://api.github.com/search/users?q=followers:>1000&page=${page}`

  return fetch(url).then((res) => res.json());
}
