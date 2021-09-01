const avatarPlaceholder = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
const postPlaceholder = 'https://nenow.in/wp-content/uploads/2020/04/cat-image-2.jpg'

const imageSrc = (image_url, type) => {
    if(image_url) {
        let http = new XMLHttpRequest()
        http.open('GET', process.env.VUE_APP_API_URL + image_url, false)
        http.send()

        if(http.status != 404) {
            return process.env.VUE_APP_API_URL + image_url
        } 
    } else {
        if(type == 'avatar') {
            return avatarPlaceholder
        }
        return postPlaceholder
    }
    
}

export default imageSrc