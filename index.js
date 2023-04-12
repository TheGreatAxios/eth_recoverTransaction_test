const Web3 = require("web3");
require("dotenv").config();

async function main() {

	const web3 = new Web3("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar");
	const wallet = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

	const signedTx = await wallet.signTransaction({
		to: "0xe78DEA63FEe24477e31854215E86781c909DAff4",
		value: "10000",
		gas: 2000000,
		chainId: 344106930
	});

	const recovered = await web3.eth.accounts.recoverTransaction(signedTx.rawTransaction);

	if (recovered !== wallet.address) throw new Error("Recovered Address Does Not Match");
	else return "Successfully Recovered to " + wallet.address;

}

main()
	.then((res) => console.log(res))
	.catch((err) => {
		console.error(err);
		process.exitCode = 1;
	});
