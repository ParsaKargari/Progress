

/**
 * 
 * 
 */
async function searchUserName(searchedText) {
    searchedText = searchedText.split(" ")

    if (searchedText.length === 1) {
        let { data, error } = await supabase
            .rpc('fullname', {
            }).select()
            .textSearch('fullname', searchedText[0], {
                type: 'websearch',
                config: 'english',
            })
        if (error) console.error(error)
        else console.log(data)

    } else if (searchedText.length > 1) {
        let { data, error } = await supabase
            .rpc('fullname', {
            }).select()
            .textSearch('fullname', searchedText[0] + " or " + searchedText[1], {
                type: 'websearch',
                config: 'english',
            })
        if (error) console.error(error)
        else console.log(data)
    }

}



let tableName = "Users"
let selected = "*"
let columnName = "FirstName"
let columnValue = "Tony"
async function searchRow() {

    let { data, error } = await supabase
        .from(tableName)
        .select(selected).match({ [columnName]: [columnValue] });
    console.log(data)
}