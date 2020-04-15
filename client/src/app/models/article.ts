export class Article {
    _id: string;
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    published: Date;

    constructor(_id, title, description, url, imageUrl, published){
        this._id = _id
        this.title = title
        this.description = description
        this.url = url
        this.imageUrl = imageUrl
        this.published = new Date(published)
    }
}
