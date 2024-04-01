import {create_list as create_notes_list } from "./page/my_notes/create_list.js";
import {create_note} from "./page/create_note.js";
import {sendRequest} from "./lib/server.func.js";
import {edit_note} from "./page/edit_note.js";

class Index{
    constructor() {
        this.initEvents()
    }

    initEvents(){
        const __this = this
        $('.nav-link').on('click', function (e) {
            e.preventDefault()
            if(!$(this).hasClass('active')){
                $('.nav-link')
                __this.openPage($(this).attr('data-value'))
            }
        })
        __this.openPage()
    }

    openPage(page = 'my-notes'){
        const $notes_container = $('.notes-container')
        $('.nav-link').removeClass('active')
        $('.nav-link[data-value="'+page+'"]').addClass('active')
        switch (page) {
            case 'my-notes':
                (async () => {
                    const notes = await create_notes_list()
                    $notes_container.html(notes)
                })()
                break;
            case 'create-note':
                $notes_container.html(create_note())
                break;
        }
    }

    createNote(e, _this){
        e.preventDefault()
        const $button = $(_this).find('[type="submit"]')
        const btn_text = $button.text()
        const form_data = new FormData($(_this).get(0))
        form_data.append('action', 'create_note');
        $button.attr('disabled', true);
        (async () => {
           let json_response = await sendRequest(form_data)
            if(json_response){
                const {success, message} = json_response
                if(success){
                    $button.removeClass('btn-primary').addClass('btn-success').text(message)
                    setTimeout(function () {
                        $button.removeClass('btn-success').addClass('btn-primary')
                    }, 1500)
                }else{
                    $button.removeClass('btn-primary').addClass('btn-danger').text(message)
                    setTimeout(function () {
                        $button.removeClass('btn-danger').addClass('btn-primary')
                    }, 1500)
                }
                setTimeout(function () {
                    $button.removeAttr('disabled').text(btn_text)
                }, 1500)
            }
        })()
    }

    openPageEditNote(e, id, title, content){
        e.preventDefault()
        const $notes_container = $('.notes-container')
        $('.nav-link').removeClass('active')
        $notes_container.html(edit_note(id, title, content))
    }

    editNote(e, _this){
        e.preventDefault()
        const __this = this
        const $button = $(_this).find('[type="submit"]')
        const btn_text = $button.text()
        const form_data = new FormData($(_this).get(0))
        form_data.append('action', 'edit_note');
        $button.attr('disabled', true);
        (async () => {
            let json_response = await sendRequest(form_data)
            if(json_response){
                const {success, message} = json_response
                if(success){
                    $button.removeClass('btn-primary').addClass('btn-success').text(message)
                    setTimeout(function () {
                        __this.openPage()
                    }, 1500)
                }else{
                    $button.removeClass('btn-primary').addClass('btn-danger').text(message)
                    setTimeout(function () {
                        $button.removeClass('btn-danger').addClass('btn-primary')
                    }, 1500)
                }
                setTimeout(function () {
                    $button.removeAttr('disabled').text(btn_text)
                }, 1500)
            }
        })()
    }

    deleteNote(_this){
        const $note = $(_this).closest('.note')
        const form_data = new FormData()
        form_data.append('action', 'delete_note');
        form_data.append('note_id', $note.attr('id'));
        (async () => {
            let json_response = await sendRequest(form_data)
            if(json_response){
                const {success} = json_response
                if(success){
                    $note.remove()
                }
            }
        })()
    }
}

export default new Index();