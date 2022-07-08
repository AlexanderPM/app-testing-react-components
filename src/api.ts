export async function FetchAsyncApi() {
    try {
        return await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
            method: 'GET',
        })
    } catch (error) {
        console.error('Fetch error: ', error)
    }
}
