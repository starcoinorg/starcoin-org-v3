AOS.init({
    offset: 200,
    duration: 1000
});
function formatNumber(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
function getAverageHashRate() {
    $.getJSON('https://api.stcscan.io/v2/block/main/start_height/', function (blockList) {
        const blocksHit = blockList && blockList.contents && blockList.contents ? blockList.contents : [];
        const blocks = blocksHit.slice(0, 12);
        const metrics = [];
        if (blocksHit.length) {
            let totalDiff = 0;
            for (let i = 0; i < blocksHit.length; i++) {
                totalDiff += blocksHit[i].header.difficulty_number;
            }
            const averageBlockDiff = Number(totalDiff / blocksHit.length);
            const endTime = blocksHit[0].header.timestamp;
            const startTime = blocksHit[blocksHit.length - 1].header.timestamp;
            const averageBlockTime = Number((endTime - startTime) / blocksHit.length);
            const averageHashRate = formatNumber((averageBlockDiff / averageBlockTime * 1000).toFixed(0));
            $('#averageHashRate').html(averageHashRate)
        }
    });
}

$(function () {
    getAverageHashRate();
    setInterval(() => getAverageHashRate(), 10000);
});