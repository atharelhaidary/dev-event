
  export function formatDate( dateString: string) : string {
    const date = new Date(dateString);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 
                        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    
    const dayName = dayNames[date?.getDay()];
    const day = date.getDate();
    const month = monthNames[date?.getMonth()];
    const year = date.getFullYear();
    
    const getSuffix = (d : number) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${dayName}, ${day}${getSuffix(day)} ${month} ${year}`;
  }
  
