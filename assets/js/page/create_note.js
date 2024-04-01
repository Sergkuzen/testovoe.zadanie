import {changeTitle} from "../lib/func.js";
import Index from '../index.js'

const create_note = () => {
    changeTitle('Добавить заметку')
    return $('<div>', {
        class: 'create-content',
        html: [
            $('<h5>')
                .text('Добавить заметку'),
            $('<p>')
                .text('Создайте новую заметку'),
            $('<form>', {
                html: $('<div>', {
                    class: 'row g-3',
                    html: [
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
                                    placeholder: 'Придумайте заголовок',
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
                                    placeholder: 'Напишите содержание вашей заметки',
                                })
                            ]
                        }),
                        $('<button>', {
                            class: 'w-100 btn btn-primary btn-lg',
                            type: 'submit',
                            text: 'Добавить'
                        })
                    ]
                })
            }).on('submit', function (e) {
                Index.createNote(e, this)
            })
        ]
    })
}

export {create_note}