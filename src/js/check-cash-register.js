function checkCashRegister(price, cash, cid) {
    let result = {};
    let total = cid.reduce((sum, bill) => sum + bill[1], 0);
    total = Math.round(total * 100) / 100;
    let difference = cash - price;

    let valueArr = [["ONE HUNDRED", 100], ["TWENTY", 20], ["TEN", 10], ["FIVE", 5], ["ONE", 1], ["QUARTER", 0.25], ["DIME", 0.1], ["NICKEL", 0.05], ["PENNY", 0.01]];

    let reverseCid = [];
    for (let j = 0; j < cid.length; j++) {
        reverseCid.push([...cid[j]]);
    }
    reverseCid.reverse();

    let changeArr = [];
    let change = difference;
    for (let i = 0; i < reverseCid.length; i++) {
        let count = 0;
        while (reverseCid[i][1] > 0 && change >= valueArr[i][1]) {
            reverseCid[i][1] -= valueArr[i][1];
            change -= valueArr[i][1];
            change = Math.round(change * 100) / 100;
            count++;
        }

        if (count !== 0) {
            changeArr.push([valueArr[i][0], valueArr[i][1] * count]);
        }
    }

    let changeSum = changeArr.reduce((sum, amount) => sum + amount[1], 0);
    changeSum = Math.round(changeSum * 100) / 100;
    if (changeSum !== difference) {
        changeArr = [];
    }

    if (difference > total || changeArr.length === 0) {
        result.status = "INSUFFICIENT_FUNDS";
        result.change = [];
    } else if (difference === total) {
        result.status = "CLOSED";
        result.change = cid;
    } else {
        result.status = "OPEN";
        result.change = changeArr;
    }

    console.log(result)
    return result;
}
