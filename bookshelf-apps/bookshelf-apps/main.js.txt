// HELPER
const getId = id => document.getElementById(id)
const getVal = id => getId(id).value
const getData = () => JSON.parse(localStorage.getItem('buku'))
const setData = data => localStorage.setItem('buku', JSON.stringify(data))

// FUNCTIONS
const refreshBookList = () => {
    getId('completeBookshelfList').innerHTML = ""
    getId('incompleteBookshelfList').innerHTML = ""
    const data = getData()
    for (const id in data) {
        getId(data[id].isComplete ? 'completeBookshelfList' : 'incompleteBookshelfList')
            .innerHTML +=
            '<article class="book_item" id="' + id +
            '"> <h3>' + data[id].title +
            '</h3> <p>Penulis: ' + data[id].author +
            '</p> <p>Tahun: ' + data[id].year +
            '</p> <div class="action"> <button class="green" onclick="changeBookStatus(' + id + ')" >' + (data[id].isComplete ? 'Belum Selesai' : 'Selesai') +
            '</button> <button onclick="editBook(' + id + ')" >Edit Buku</button> <button class="red" onclick="deleteBook(' + id + ',\'' + data[id].title + '\')">Hapus buku</button> </div> </article> '
    }

}
const refresFilteredBookList = (data) => {
    getId('completeBookshelfList').innerHTML = ""
    getId('incompleteBookshelfList').innerHTML = ""
    for (const id in data) {
        getId(data[id].isComplete ? 'completeBookshelfList' : 'incompleteBookshelfList')
            .innerHTML +=
            '<article class="book_item" id="' + id +
            '"> <h3>' + data[id].title +
            '</h3> <p>Penulis: ' + data[id].author +
            '</p> <p>Tahun: ' + data[id].year +
            '</p> <div class="action"> <button class="green" onclick="changeBookStatus(' + id + ')" >' + (data[id].isComplete ? 'Belum Selesai' : 'Selesai') +
            '</button> <button onclick="editBook(' + id + ')" >Edit Buku</button> <button class="red" onclick="deleteBook(' + id + ',\'' + data[id].title + '\')">Hapus buku</button> </div> </article> '
    }

}
const clearForm = () => {
    // fungsi reset tidak cukup karena harus mengosongkan setelah edit
    getId('inputBookId').setAttribute('value', "")
    getId('inputBookTitle').setAttribute('value', "")
    getId('inputBookAuthor').setAttribute('value', "")
    getId('inputBookYear').setAttribute('value', "")
    getId('inputBookIsComplete').removeAttribute('checked')
    getId('inputBookIsEditing').removeAttribute('checked')

}
const clearFilter = () => {
    getId('filterBook').reset()
    getId('clearFilterButton').remove()
    refreshBookList()
}


const searchBook = (query) => {
    let result = {}
    const data = getData()
    for (const id in data) {
        for (const key in data[id]) {
            console.log(data[id][key])
            if (typeof data[id][key] === 'string') {
                console.log(data[id][key].indexOf(query))
                if (data[id][key].indexOf(query) != -1) result[id] = data[id]
            }
        }
    }
    console.log(result)
    return result
}
const refreshSearchList = (data) => {
    getId('resultBook').innerHTML = ""
    for (const id in data) {
        getId('resultBook')
            .innerHTML +=
            '<article class="book_item" id="' + id +
            '"> <h3>' + data[id].title +
            '</h3> <p>Penulis: ' + data[id].author +
            '</p> <p>Tahun: ' + data[id].year +
            '</p> <div class="action"> <button class="green" onclick="changeBookStatus(' + id + ')" >' + (data[id].isComplete ? 'Belum Selesai' : 'Selesai') +
            '</button> <button onclick="editBook(' + id + ')" >Edit Buku</button> <button class="red" onclick="deleteBook(' + id + ',\'' + data[id].title + '\')">Hapus buku</button> </div> </article> '
    }
}
const clearSearch = () => {
    getId('searchBook').reset()
    getId('resultBook').innerHTML = ""
    getId('clearSearchButton').remove()

}

const getBookVal = () => {
    return {
        id: getVal('inputBookId') ? getVal('inputBookId') : Date.now(),
        title: getVal('inputBookTitle'),
        author: getVal('inputBookAuthor'),
        year: getVal('inputBookYear'),
        isComplete: getId('inputBookIsComplete').checked
    }
}

const changeBookStatus = (id) => {
    let buku = getData()[id]
    updateBook({
        ...buku,
        isComplete: !buku.isComplete
    })
}
const editBook = (id) => {
    let buku = getData()[id]

    getId('inputBookId').setAttribute('value', buku.id)
    getId('inputBookTitle').setAttribute('value', buku.title)
    getId('inputBookAuthor').setAttribute('value', buku.author)
    getId('inputBookYear').setAttribute('value', buku.year)
    buku.isComplete ? getId('inputBookIsComplete').setAttribute('checked', true) : getId('inputBookIsComplete').removeAttribute('checked')
    getId('inputBookIsEditing').setAttribute('checked', true)

    getId('bookSubmit').innerHTML = "Perbaharui Data Buku"

}

const deleteBook = (id, title) => {

    if (confirm("Apakah Anda yakin ingin menghapus buku " + title + "?") == true) {
        let data = getData()
        delete data[id]
        setData(data)
        refreshBookList()
    }
}

const updateBook = (book) => {
    let data = getData()
    data[book.id] = book
    setData(data)
    refreshBookList()
    if (getVal('searchBookQuery')) refreshSearchList(searchBook(getVal('searchBookQuery')))
    if (getVal('filterBookQuery')) refresFilteredBookList(searchBook(getVal('filterBookQuery')))
}

// ASSIGNER
getId('inputBook').addEventListener('submit', function (event) {
    updateBook(getBookVal())
    if (getVal('inputBookIsEditing')) {
        getId('bookSubmit').innerHTML = "Tambah Buku"
    }
    event.preventDefault()
    clearForm()
});

getId('searchBook').addEventListener('submit', function (event) {
    refreshSearchList(searchBook(getVal('searchBookQuery')))
    if (!getId('clearSearchButton')) getId('searchSubmit').insertAdjacentHTML('afterend', '<button type="button" id="clearSearchButton" onclick="clearSearch()">Kosongkan</button>')
    event.preventDefault()
});

getId('filterBook').addEventListener('submit', function (event) {
    refresFilteredBookList(searchBook(getVal('filterBookQuery')))
    if (!getId('clearFilterButton')) getId('filterSubmit').insertAdjacentHTML('afterend', '<button type="button" id="clearFilterButton" onclick="clearFilter()">Kosongkan</button>')
    event.preventDefault()
});



// STARTER

if (!getData()) setData({})
// try {
//     getData()
// } catch {
//     setData({})
// }
refreshBookList()
