const timeDifference = (date) => {
    let now = new Date(),
        usedDate = new Date(date),
        difference = Math.abs(usedDate / 1000 - now / 1000),
        output = "";

    switch (true) {
        case difference < 60:
            output = format(Math.floor(difference), ' second')
            break;
        case difference < Math.pow(60, 2):
            output = format(Math.floor(difference / 60), ' minute')
            break;
        case (difference < Math.pow(60,2)*24):
            output = format(Math.floor(difference / Math.pow(60,2)), ' hour')
            break;
        default:
            output = format(Math.floor(difference / (Math.pow(60,2)*24)), ' day')
            break;
    }
    return output;
}

const format = (value, str) => value + str + (Math.floor(value) != 1? 's ago' : ' ago')

export default timeDifference