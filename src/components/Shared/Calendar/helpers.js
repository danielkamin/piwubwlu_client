export const dateRangeOverlaps = (a_start, a_end, b_start, b_end) => {
    let time_a_start = a_start.toLocaleTimeString(navigator.language,{ hour: '2-digit', minute:'2-digit'});
    let time_a_end = a_end.toLocaleTimeString(navigator.language,{ hour: '2-digit', minute:'2-digit'});
    let time_b_start = b_start.toLocaleTimeString(navigator.language,{ hour: '2-digit', minute:'2-digit'});
    let time_b_end = b_end.toLocaleTimeString(navigator.language,{ hour: '2-digit', minute:'2-digit'});
    if (a_start < b_start && b_start < a_end){  
        return `Koniec nowej rezerwacji (${time_a_end}) nachodzi na złożoną już rezerwację, trwającą pomiędzy ${time_b_start}, a ${time_b_end}`;
    }
    if (a_start < b_end  && b_end < a_end){
        return `Początek nowej rezerwacji (${time_a_start}) nachodzi na złożoną już rezerwację, trwającą pomiędzy ${time_b_start}, a ${time_b_end}`;
    }
    if (b_start <  a_start && a_end < b_end){
        return `Nowa rezerwacja w pełni nachodzi na istniejącą już rezerwacją, trwającą pomiędzy ${time_b_start}, a ${time_b_end}`;
    }
    return '';
}

export const calculateEndDate = (units, start_date,timeUnit) => {
let tmpTimeUnit = +timeUnit;
let minutes = units * tmpTimeUnit;
return new Date(start_date.getTime() + 60000 * minutes);
};
