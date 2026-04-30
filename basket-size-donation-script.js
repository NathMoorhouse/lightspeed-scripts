var output = {
    rewards: []
};

var sku = "CFD1";

var accountName = (ikContext.account && ikContext.account.name) || "";
var isSplitChild = !ikContext.account.isDraft && /\.\d+$/.test(accountName);

var itemPresent = ikContext.account.transactionLines.find(function (line) {
    return line.itemSku === sku && line.amount > 0;
});

var itemVoided = ikContext.account.transactionLines.find(function (line) {
    return line.itemSku === sku && line.amount < 0;
});

if (ikContext.account.isDraft === true && ikContext.account.totalAmount > 3000 && !isSplitChild && !itemPresent && !itemVoided) {
    output.rewards.push({
        type: "ADD",
        sku: sku,
        insertionPhase: 0
    });
}

JSON.stringify(output);
