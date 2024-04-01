import {changeTitle} from "../../lib/func.js";
import {get_notes} from "./get_notes.js";
import Index from '../../index.js'

const create_list = async () => {
    changeTitle('Мои заметки')
    return $('<div>', {
        class: 'create-content',
        html: [
            $('<h5>')
                .text('Мои заметки'),
            $('<p>')
                .text('Просматривайте сохраненные заметки'),
            $('<div>', {
                class: 'notes',
                html: async function () {
                    const create_note_html = (data) => {
                        return $('<div>', {
                            class: 'note',
                            id: data['id'],
                            html: $('<div>', {
                                class: 'alert alert-warning alert-dismissible fade show',
                                role: 'alert',
                                html: function () {
                                    $(this).append(
                                        $('<strong>')
                                            .text(data['title'])
                                    )
                                    $(this).append(' - ')
                                    $(this).append(
                                        $('<a>', {
                                            href: '#',
                                            text: 'Редактировать'
                                        }).on('click', function (e) {
                                            Index.openPageEditNote(e, data['id'], data['title'], data['content'])
                                        })
                                    )
                                    $(this).append(
                                        '<br>' + data['content']
                                    )
                                    $(this).append(
                                        $('<button>', {
                                            type: 'button',
                                            class: 'btn-close',
                                        }).on('click', function () {
                                            Index.deleteNote(this)
                                        })
                                    )
                                }
                            })
                        })
                    }
                    const html = [];
                    const notes = await get_notes()
                    if (notes) {
                        const {success, message, data} = notes
                        if(success === true){
                            for(const val of notes['data']){
                                html.push(create_note_html(val))
                            }
                        }else{
                            html.push(
                                $('<div>', {
                                    class: 'alert alert-warning',
                                    role: 'alert',
                                    text: message
                                })
                            )
                        }
                    }
                    $(this).append(html)
                }
            })
        ]
    })
}

export {create_list}