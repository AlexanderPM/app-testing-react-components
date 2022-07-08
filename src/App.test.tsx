import { act, render, screen } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { FetchAsyncApi } from './api'
import React from 'react'
import userEvent from '@testing-library/user-event'

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
            screen.getByText(/Тестирования JavaScript и TypeScript кода./i)
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
        const userList = await screen.findByRole('option', {
            name: /Китайских юаней/i,
        })
        expect(userList).toBeInTheDocument()
    })
    // Тестируем выделенный элемент в списке
    test('should allow user to change country', async () => {
        render(<App />)
        userEvent.selectOptions(
            // Find the select element
            await screen.findByRole('combobox'),
            // Find and select the Ireland option
            await screen.findByRole('option', { name: 'Доллар США' })
        )
        expect(
            (screen.getByText('Доллар США') as HTMLOptionElement).selected
        ).toBeTruthy()
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
