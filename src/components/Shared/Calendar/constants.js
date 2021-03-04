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
    back:'xd',
    agenda:'Lista',
    date:'Data',
    time:'Godzina',
    event:'Opis'
}
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })