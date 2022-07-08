import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { FetchAsyncApi } from './api'

class Users {
    static all() {
        return axios.get('/users.json').then((resp) => resp.data)
    }
}

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Блок тестов
describe('app', () => {
    // Проверяем есть ли нужный текс на странице, т.е. отрендерился ли он
    test('it renders', () => {
        render(<App />)
        expect(
            screen.getByText('Тестирования JavaScript и TypeScript кода.')
        ).toBeInTheDocument()
    })
    // Проверяем отрендерилась ли определенная кнопка
    test('button', () => {
        render(<App />)
        expect(screen.getByText('Кнопка')).toBeInTheDocument()
    })
    // Проверяем пришли ли данные с API
    test('display valute', async () => {
        render(<App />)
        const userList = await waitFor(() =>
            screen.getByText('Китайских юаней')
        )
        expect(userList).toBeInTheDocument()
    })
    test('axios', async () => {
        const users = [{ name: 'Alexander' }]
        const resp = { data: users }
        mockedAxios.get.mockResolvedValue(resp)

        return Users.all().then((data) => expect(data).toEqual(users))
    })
    test('test-api', async () => {
        const data = await FetchAsyncApi().then((response) => response?.json())
        expect(data.Valute.CNY.Name).toBe('Китайских юаней')
    })
})
