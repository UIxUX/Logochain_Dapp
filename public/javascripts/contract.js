//Test only for now.

metaFrontAddress = "0x1d0d034f39c162eddd28934d85bd1cc5ba7bb1b2";

metaFrontAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "myid",
                "type": "bytes32"
            },
            {
                "name": "result",
                "type": "string"
            }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "myid",
                "type": "bytes32"
            },
            {
                "name": "result",
                "type": "string"
            },
            {
                "name": "proof",
                "type": "bytes"
            }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "receiver",
                "type": "address"
            },
            {
                "name": "subID",
                "type": "string"
            }
        ],
        "name": "purchaseLogo",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];