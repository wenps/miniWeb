export function fetchResource(url) {
    return fetch(url).then(res => res.text())
}