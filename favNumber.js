const favNumberContractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_number",
                "type": "uint256"
            }
        ],
        "name": "setNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNumber",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const favNumberContractAddress = "0xAb4F51Fb73127303914Bb0FFF1b6CDAA831780E7";

let FavNumberContract = undefined;
let signer = undefined;

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        FavNumberContract = new ethers.Contract(
            favNumberContractAddress,
            favNumberContractABI,
            signer
        );
    });
});

async function getNumber() {
    const number = await FavNumberContract.getNumber();
    document.getElementById("showNumber").innerText = 'Your Favorite Number: ' + number;
    console.log(number);
}

async function setNumber() {
    const number = document.getElementById("number").value;
    await FavNumberContract.setNumber(number);
}