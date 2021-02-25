import useSWR from 'swr'

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
}

export function getEntry(id: string) {
    return useSWR(`/api/get-entry?email=${id}`, fetcher);
}