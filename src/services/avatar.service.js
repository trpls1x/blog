
const imageExists = (image_url) => {
    let http = new XMLHttpRequest()
    http.open('GET', process.env.VUE_APP_API_URL + image_url, false)
    http.send()

    return http.status != 404
}

export default imageExists