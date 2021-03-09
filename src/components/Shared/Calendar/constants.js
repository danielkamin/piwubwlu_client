import {pl} from 'date-fns/locale'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import { dateFnsLocalizer  } from 'react-big-calendar'

const locales = {
    'pl': pl
}
export const messages = {
    month: 'Miesiąc',
    day: 'Dzień',
    today: 'Dzisiaj',
    next:'Późniejsze',
    week:'Tydzień',
    work_week:'Tydzień roboczy',
    previous:'Wcześniejsze',
    agenda:'Lista',
    date:'Data',
    time:'Godzina',
    event:'Opis',
    noEventsInRange:'Brak rezerwacji w tym zakresie'
}
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })