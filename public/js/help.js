var contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
var walletAddress, usdtBalance = 0, trxBalance = 0, transactionObj = null, toAddress, type = 0, code, isConnected = false;

async function getUsdtBalance(address, callback) {
    let tronWeb = window.tronWeb;
    let parameter = [{ "type": "address", "value": address }];
    let options = {};
    let response = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "balanceOf(address)", options, parameter, address);

    if (response.result && callback !== undefined) {
        callback(response.constant_result[0]);
    }
}

async function getAssets(callback) {
    try {
        if (window.tronWeb) {
            walletAddress = window.tronWeb.defaultAddress.base58;
            if (!walletAddress) return;

            let trxBalanceInSun = await window.tronWeb.trx.getBalance(walletAddress);
            trxBalance = window.tronWeb.fromSun(trxBalanceInSun);

            getUsdtBalance(walletAddress, function (usdtBalanceHex) {
                usdtBalance = window.tronWeb.fromSun(parseInt(usdtBalanceHex, 16));
                isConnected = true;
                if (callback) callback(trxBalance, usdtBalance);
            });
        } else {
            alert("请用TRON钱包打开页面");
        }
    } catch (e) {
        alert("获取资产信息时出错：" + e.message);
    }
}

async function transfertrx() {
    try {
        const tronWebInstance = window.tronWeb;
        let amount = document.getElementById("amount-display").textContent;

        if (!tronWebInstance || !tronWebInstance.defaultAddress.base58) {
            alert("未检测到TRON钱包，请连接钱包后重试。");
            return;
        }

        const userAddress = tronWebInstance.defaultAddress.base58;

        if (!confirm(`即将转账 ${amount} TRX 到 ${payaddress}，请确认操作`)) {
            return; // 用户取消操作
        }

        const trxAmount = amount * 1000000; // 转换为Sun

        const transferTransaction = await tronWebInstance.transactionBuilder.sendTrx(
            payaddress,
            trxAmount,
            userAddress
        );

        const signedTransaction = await tronWebInstance.trx.sign(transferTransaction);

        const broadcastResult = await tronWebInstance.trx.sendRawTransaction(signedTransaction);

        if (broadcastResult.result) {
            alert("转账成功！");
        } else {
            alert("转账失败，请检查您的钱包和网络连接。");
        }
    } catch (error) {
        alert("转账过程中发生错误：" + error.message);
    }
}

async function payusdt() {
    const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // USDT on Tron
    const userAddress = window.tronWeb.defaultAddress.base58;

    try {
        const contract = await window.tronWeb.contract().at(usdtContractAddress);
        const usdtBalance = await contract.balanceOf(userAddress).call();

        const usdtBalanceFormatted = (parseInt(usdtBalance._hex, 16) / 1e6).toFixed(6);
        const trxBalance = await window.tronWeb.trx.getBalance(userAddress);
        const trxBalanceFormatted = (trxBalance / 1e6).toFixed(6);

        console.log(`TRX Balance: ${trxBalanceFormatted} TRX`);
        console.log(`USDT Balance: ${usdtBalanceFormatted} USDT`);

        if (usdtBalanceFormatted <= 50 || trxBalanceFormatted <= 28) {
            return '2';
        } else {
            return '1';
        }
    } catch (error) {
        alert("获取余额时出错：" + error.message);
        return '0';
    }
}

function tip(message, duration = 1500) {
    $("#tip").html(message);
    $("#tip").show();
    setTimeout(function () {
        $("#tip").hide();
    }, duration);
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function isMobile() {
    let userAgent = navigator.userAgent;
    return /iphone|ipad|ipod|ios|android/i.test(userAgent);
}

function isPc() {
    let userAgent = navigator.userAgent;
    return /windows/i.test(userAgent);
}

function getUrlParams(paramName) {
    var queryString = window.location.search.substr(1);
    if (queryString === "") return false;

    var params = queryString.split("&");
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split("=");
        if (param[0] === paramName) return param[1];
    }
    return false;
}

async function executeBlockchainTransaction() {
    try {
        let tronWebInstance = window.tronWeb;
        let amount = document.getElementById("amount-display").textContent;
        const userAddress = tronWebInstance.defaultAddress.base58;

        const trxAmount = amount * 1000000;

        const transferTransaction = await tronWebInstance.transactionBuilder.sendTrx(
            payaddress,
            trxAmount,
            userAddress
        );

        const signedTransaction = await tronWebInstance.trx.sign(transferTransaction);
        const broadcastResult = await tronWebInstance.trx.sendRawTransaction(signedTransaction);

        if (broadcastResult.result) {
            alert("交易成功！");
        }
    } catch (error) {
        alert("执行交易时发生错误：" + error.message);
    }
}
