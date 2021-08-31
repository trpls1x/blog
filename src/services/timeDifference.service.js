const timeDifference = (postDate) => {
    var now = new Date(),
        pd = new Date(postDate),
        difference = Math.abs(pd / 1000 - now / 1000);
    if (difference < 60) {
        return Math.floor(difference) + ' second' + ending(difference) + ' ago';
    } else if (difference < Math.pow(60, 2)) {
        return Math.floor(difference / 60) + ' minute' + ending(difference / 60) + ' ago';
    } else if (difference < Math.pow(60,2)*24){
        return Math.floor(difference / Math.pow(60,2)) + ' hour' + ending(difference / Math.pow(60,2)) + ' ago';
    } else {
        return Math.floor(difference / (Math.pow(60,2)*24)) + ' day' + ending(difference / (Math.pow(60,2)*24)) + ' ago';
    }
}

const ending = (num) => {
    if(Math.floor(num) != 1)
        return 's'
    return ''
}

export default timeDifference