import useSWR from 'swr'

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
}

export function getEntry(id: string) {
    //const { data } = useSWR(`/api/get-entry?id=${id}`, fetcher)
    return useSWR(`/api/get-entry?id=${id}`, fetcher)
}