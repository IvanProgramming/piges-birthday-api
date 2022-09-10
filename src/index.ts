import {Hono} from 'hono'

const app = new Hono()

class FullDate {
    localizedString: string = ""
    currentYear: string = ""
    monthAndDate: string = ""

    constructor(date: Date) {
        this.localizedString = date.toLocaleString('ru-RU', {day: 'numeric', month: 'long'})
        this.currentYear = date.toLocaleDateString('ru-RU')
        this.monthAndDate = date.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: undefined})
    }
}

class Birthday {
    date: FullDate
    name: string

    constructor(date: FullDate, name: string) {
        this.date = date
        this.name = name
    }
}


const getData = async (fetcher: Fetcher, apiUrl: string, sheetsDbCredentials: string, kvNamespace: KVNamespace): Promise<Object[]> => {
    let kvValue = await kvNamespace.get('cache')
    if (kvValue) {
        console.log("Used cached data")
        return JSON.parse(<string>kvValue) as Object[]
    }
    let response = await fetcher.fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(sheetsDbCredentials)
        }
    })
    let data = await response.json()
    await kvNamespace.put('cache', JSON.stringify(data), {expirationTtl: 60})
    return data as Object[]

}

app.get('/today/birthdays', async (c) => {
    let data = await getData(c.req.fetcher!, c.env.SHEETS_DB_API_URL, c.env.SHEETS_DB_CREDENTIALS, c.env.KV_NAMESPACE)
    let today = new Date()
    let birthdays = []
    for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        let birthday = data[i]["День рождение"].trim()
        if (birthday == today.toLocaleString("ru-RU", {day: 'numeric', month: 'long'})) {
            // @ts-ignore
            birthdays.push(new Birthday(new FullDate(today), data[i]["Минипиг"]))
        }
    }
    return c.json({data: birthdays})
})

export default app