

  export const formatDate = (dateString: string) : string=> {
    if (!dateString) return ""; 
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return dateString.split(" ").slice(0, 4).join(" ");
      }
      
      return date.toUTCString().split(" ").slice(0, 4).join(" ");
    } catch (error) {
      return dateString.split(" ").slice(0, 4).join(" ");
    }
  };

