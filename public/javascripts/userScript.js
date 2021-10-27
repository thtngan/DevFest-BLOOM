var n = $('#project > a').length;
for (var i = 0; i < n; i++) {
    var all_money = Number($('.cur_money').slice(i, i + 1).text().replace(/\s+/g, '')) / Number($('.all_money').slice(i, i + 1).text().replace(/\s+/g, ''));
    $('.progress-bar').slice(i, i + 1).css({ 'width': all_money * 100 + '%' })
}