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
            const len = list.length;

            if (len) {
                let allGas = 0;
                for (let i = 0; i < len; i++) {
                    const latestTransaction = list[i].gas_used ?? 0;
                    allGas += Number(latestTransaction);
                }
                
                const gasUseAverage = allGas / len;
                const STCDECIMALS = 1000000000;
                
                const gasPrice = Number((gasUseAverage / STCDECIMALS).toFixed(6));
                let gasUsd = (rate * gasPrice).toFixed(6);
                gasUsd = gasUsd.replace('.', ',');
                $('#avgGas').html(`$${gasUsd}`);
            }
            else {
                $('#avgGas').html(0);
            }
        });
    });
}

function getBlockTime() {
    $.ajax({
        url: "https://main-seed.starcoin.org",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: '{"id":44, "jsonrpc":"2.0","method":"contract.get_resource", "params":["0x1", "0x1::Epoch::Epoch"]}',
        success: function (data) {
            const blockTimeTarget = data.result.value[4];
            const [bttKey, bttValue] = blockTimeTarget;

            if (bttKey === 'block_time_target') {
                const times = ((bttValue.U64 ?? 0) / 1000).toFixed(0);
                $('#targetBlockTime').html(times);
            }
            else {
                $('#targetBlockTime').html(0);
            }
        },
        error: function () {
            console.log("Cannot get data");
        }
    });
}

$(function () {
    getChainInfo();
    getAverageHashRate();
    getStcToUsd();
    getBlockTime();

    setInterval(() => {
        getChainInfo();
        getAverageHashRate();
    }, 10000);

    setInterval(() => {
      getStcToUsd();
    }, 60000);
});