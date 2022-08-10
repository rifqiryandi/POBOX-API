function dateNow() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return tdy = yyyy + '/' + mm + '/' + dd + " " + time;

}

function dateNowCustom() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let time = today.getHours() + today.getMinutes() + today.getSeconds();
    return tdy = yyyy + mm + dd + time;

}

function dateCustom() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return tdy = yyyy + mm + dd;

}


module.exports = {
    dateNow,
    dateCustom,
    dateNowCustom
}