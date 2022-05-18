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
function getChainInfo() {
    $.ajax({
        url: "https://main-seed.starcoin.org",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: '{"id":101, "jsonrpc":"2.0","method":"chain.info", "params":[]}',
        success: function (data) {
            const totalTransactions = formatNumber(data.result.block_info.txn_accumulator_info.num_leaves)
            $('#totalTransactions').html(totalTransactions)
        },
        error: function () {
            console.log("Cannot get data");
        }
    });
}
function getAverageHashRate() {
    $.getJSON('https://api.stcscan.io/v2/block/main/start_height/', function (blockList) {
        const blocksHit = blockList && blockList.contents && blockList.contents ? blockList.contents : [];
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

function getStcToUsd() {
    $.getJSON('https://price-api.starcoin.org/main/v1/toUsdPriceFeeds?t=STC', function (data) {
        const stc2usd = data && data.length ? data[0] : {};
        const {latestPrice: price, decimals} = stc2usd;
        const rate = Number((price / Number('1'.padEnd(decimals + 1, 0))).toFixed(3));
        
        $.getJSON('https://api.stcscan.io/v2/transaction/main/page/1', function (transactions) {
            const list = transactions && transactions.contents ? transactions.contents : [];
            const latestTransaction = list[0];
            const gasUse = latestTransaction.gas_used ?? undefined;
            const STCDECIMALS = 1000000000;

            if (gasUse) {
                const gasPrice = Number((Number(gasUse) / STCDECIMALS).toFixed(6));
                const gasUsd = (rate * gasPrice).toFixed(6);
                $('#avgGas').html(gasUsd);
            }
        });
    });
}

$(function () {
    getChainInfo();
    getAverageHashRate();
    getStcToUsd();
    setInterval(() => {
        getChainInfo();
        getAverageHashRate();
        getStcToUsd();
    }, 10000);
});