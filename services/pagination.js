module.exports = {
    getPagination: (page, size) => {
        const limit = size ? +size : 10
        const offset = page ? page * limit : 0
        return { limit, offset }
    },
    getPagingData: (data, page, limit) => {
        const { count: totalItems, rows: Data } = data
        const current_page = page ? +page : 0
        let total_pages = Math.ceil(totalItems / limit)
        if(total_pages < 0){
            total_pages = 1;
        }
        return { totalItems, Data, total_pages, current_page }
    },
    formatResult: (data) => {
        data = JSON.parse(JSON.stringify(data))
        return data
    }
}
