export const convertDate = (str) => {
    if(str) {
        const arr = str.split('-');
        let year = arr[0];
        let day = arr[2];
        let month = '';
        switch(arr[1]){
            case '1':
                month = "January";
                break
            case '2':
                month = "Feburary";
                break
            case '3':
                month = "March";
                break
            case '4':
                month = "April";
                break
            case '5':
                month = "May";
                break
            case '6':
                month = "June";
                break
            case '7':
                month = "July";
                break
            case '8':
                month = "August";
                break
            case '9':
                month = "September";
                break
            case '10':
                month = "October";
                break
            case '11':
                month = "November";
                break
            case '12':
                month = "December";
                break
        }
        return month + " " + day + " " + year   
    }
    else return ""
}