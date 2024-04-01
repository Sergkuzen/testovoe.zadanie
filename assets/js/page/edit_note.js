import {changeTitle} from "../lib/func.js";
import Index from '../index.js'

const edit_note = (id, title, content) => {
    changeTitle('Редактирование заметки')
    return $('<div>', {
        class: 'create-content',
        html: [
            $('<h5>')
                .text('Редактировать заметку'),
            $('<p>')
                .text('Отредактируйте заметку, если есть в этом необходимость'),
            $('<form>', {
                html: $('<div>', {
                    class: 'row g-3',
                    html: [
                        $('<input type="hidden" name="note_id" value="'+id+'">'),
                        $('<div>', {
                            class: 'col-12',
                            html: [
                                $('<label>', {
                                    for: 'note-title',
                                    class: 'form-label',
                                    text: 'Заголовок'
                                }),
                                $('<input>', {
                                    type: 'text',
                                    class: 'form-control',
                                    id: 'note-title',
                                    name: 'title',
                                    placeholder: title,
                                    value: title
                                })
                            ]
                        }),
                        $('<div>', {
                            class: 'col-12',
                            html: [
                                $('<label>', {
                                    for: 'note-content',
                                    class: 'form-label',
                                    text: 'Содержание'
                                }),
                                $('<input>', {
                                    type: 'text',
                                    class: 'form-control',
                                    id: 'note-content',
                                    name: 'content',
                                    placeholder: content,
                                    value: content
                                })
                            ]
                        }),
                        $('<button>', {
                            class: 'w-100 btn btn-primary btn-lg',
                            type: 'submit',
                            text: 'Отредактировать'
                        })
                    ]
                })
            }).on('submit', function (e) {
                Index.editNote(e, this)
            })
        ]
    })
}

export {edit_note}