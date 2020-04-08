class Note {

    constructor (name, text, video_link, audio_link, created_at = '', accessed_at = '', favorite = false ){

    
        this.name = name;
        this.text = text;
        this.video_link = video_link;
        this.audio_link = audio_link;
        this.created_at = created_at;
        this.accessed_at = accessed_at;
        this.favorite = favorite;
    }
}

export default Note;