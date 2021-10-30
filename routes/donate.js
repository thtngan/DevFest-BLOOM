const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const project = require('../src/models/Project');
const donor = require('../src/models/Donor');
const Web3 = require('web3');

const { verifyToken, isDonor, isFundraiser } = require("../middlewares/auth.jwt");
const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/7771ec896eed44338f3debadbf6e047f")
);
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const bytecode = {
    "functionDebugData": {
        "@_13": {
            "entryPoint": null,
            "id": 13,
            "parameterSlots": 1,
            "returnSlots": 0
        },
        "abi_decode_t_uint256_fromMemory": {
            "entryPoint": 101,
            "id": null,
            "parameterSlots": 2,
            "returnSlots": 1
        },
        "abi_decode_tuple_t_uint256_fromMemory": {
            "entryPoint": 122,
            "id": null,
            "parameterSlots": 2,
            "returnSlots": 1
        },
        "allocate_unbounded": {
            "entryPoint": null,
            "id": null,
            "parameterSlots": 0,
            "returnSlots": 1
        },
        "cleanup_t_uint256": {
            "entryPoint": 68,
            "id": null,
            "parameterSlots": 1,
            "returnSlots": 1
        },
        "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db": {
            "entryPoint": null,
            "id": null,
            "parameterSlots": 0,
            "returnSlots": 0
        },
        "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b": {
            "entryPoint": 63,
            "id": null,
            "parameterSlots": 0,
            "returnSlots": 0
        },
        "validator_revert_t_uint256": {
            "entryPoint": 78,
            "id": null,
            "parameterSlots": 1,
            "returnSlots": 0
        }
    },
    "generatedSources": [
        {
            "ast": {
                "nodeType": "YulBlock",
                "src": "0:1048:1",
                "statements": [
                    {
                        "body": {
                            "nodeType": "YulBlock",
                            "src": "47:35:1",
                            "statements": [
                                {
                                    "nodeType": "YulAssignment",
                                    "src": "57:19:1",
                                    "value": {
                                        "arguments": [
                                            {
                                                "kind": "number",
                                                "nodeType": "YulLiteral",
                                                "src": "73:2:1",
                                                "type": "",
                                                "value": "64"
                                            }
                                        ],
                                        "functionName": {
                                            "name": "mload",
                                            "nodeType": "YulIdentifier",
                                            "src": "67:5:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "67:9:1"
                                    },
                                    "variableNames": [
                                        {
                                            "name": "memPtr",
                                            "nodeType": "YulIdentifier",
                                            "src": "57:6:1"
                                        }
                                    ]
                                }
                            ]
                        },
                        "name": "allocate_unbounded",
                        "nodeType": "YulFunctionDefinition",
                        "returnVariables": [
                            {
                                "name": "memPtr",
                                "nodeType": "YulTypedName",
                                "src": "40:6:1",
                                "type": ""
                            }
                        ],
                        "src": "7:75:1"
                    },
                    {
                        "body": {
                            "nodeType": "YulBlock",
                            "src": "177:28:1",
                            "statements": [
                                {
                                    "expression": {
                                        "arguments": [
                                            {
                                                "kind": "number",
                                                "nodeType": "YulLiteral",
                                                "src": "194:1:1",
                                                "type": "",
                                                "value": "0"
                                            },
                                            {
                                                "kind": "number",
                                                "nodeType": "YulLiteral",
                                                "src": "197:1:1",
                                                "type": "",
                                                "value": "0"
                                            }
                                        ],
                                        "functionName": {
                                            "name": "revert",
                                            "nodeType": "YulIdentifier",
                                            "src": "187:6:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "187:12:1"
                                    },
                                    "nodeType": "YulExpressionStatement",
                                    "src": "187:12:1"
                                }
                            ]
                        },
                        "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                        "nodeType": "YulFunctionDefinition",
                        "src": "88:117:1"
                    },
                    {
                        "body": {
                            "nodeType": "YulBlock",
                            "src": "300:28:1",
                            "statements": [
                                {
                                    "expression": {
                                        "arguments": [
                                            {
                                                "kind": "number",
                                                "nodeType": "YulLiteral",
                                                "src": "317:1:1",
                                                "type": "",
                                                "value": "0"
                                            },
                                            {
                                                "kind": "number",
                                                "nodeType": "YulLiteral",
                                                "src": "320:1:1",
                                                "type": "",
                                                "value": "0"
                                            }
                                        ],
                                        "functionName": {
                                            "name": "revert",
                                            "nodeType": "YulIdentifier",
                                            "src": "310:6:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "310:12:1"
                                    },
                                    "nodeType": "YulExpressionStatement",
                                    "src": "310:12:1"
                                }
                            ]
                        },
                        "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
                        "nodeType": "YulFunctionDefinition",
                        "src": "211:117:1"
                    },
                    {
                        "body": {
                            "nodeType": "YulBlock",
                            "src": "379:32:1",
                            "statements": [
                                {
                                    "nodeType": "YulAssignment",
                                    "src": "389:16:1",
                                    "value": {
                                        "name": "value",
                                        "nodeType": "YulIdentifier",
                                        "src": "400:5:1"
                                    },
                                    "variableNames": [
                                        {
                                            "name": "cleaned",
                                            "nodeType": "YulIdentifier",
                                            "src": "389:7:1"
                                        }
                                    ]
                                }
                            ]
                        },
                        "name": "cleanup_t_uint256",
                        "nodeType": "YulFunctionDefinition",
                        "parameters": [
                            {
                                "name": "value",
                                "nodeType": "YulTypedName",
                                "src": "361:5:1",
                                "type": ""
                            }
                        ],
                        "returnVariables": [
                            {
                                "name": "cleaned",
                                "nodeType": "YulTypedName",
                                "src": "371:7:1",
                                "type": ""
                            }
                        ],
                        "src": "334:77:1"
                    },
                    {
                        "body": {
                            "nodeType": "YulBlock",
                            "src": "460:79:1",
                            "statements": [
                                {
                                    "body": {
                                        "nodeType": "YulBlock",
                                        "src": "517:16:1",
                                        "statements": [
                                            {
                                                "expression": {
                                                    "arguments": [
                                                        {
                                                            "kind": "number",
                                                            "nodeType": "YulLiteral",
                                                            "src": "526:1:1",
                                                            "type": "",
                                                            "value": "0"
                                                        },
                                                        {
                                                            "kind": "number",
                                                            "nodeType": "YulLiteral",
                                                            "src": "529:1:1",
                                                            "type": "",
                                                            "value": "0"
                                                        }
                                                    ],
                                                    "functionName": {
                                                        "name": "revert",
                                                        "nodeType": "YulIdentifier",
                                                        "src": "519:6:1"
                                                    },
                                                    "nodeType": "YulFunctionCall",
                                                    "src": "519:12:1"
                                                },
                                                "nodeType": "YulExpressionStatement",
                                                "src": "519:12:1"
                                            }
                                        ]
                                    },
                                    "condition": {
                                        "arguments": [
                                            {
                                                "arguments": [
                                                    {
                                                        "name": "value",
                                                        "nodeType": "YulIdentifier",
                                                        "src": "483:5:1"
                                                    },
                                                    {
                                                        "arguments": [
                                                            {
                                                                "name": "value",
                                                                "nodeType": "YulIdentifier",
                                                                "src": "508:5:1"
                                                            }
                                                        ],
                                                        "functionName": {
                                                            "name": "cleanup_t_uint256",
                                                            "nodeType": "YulIdentifier",
                                                            "src": "490:17:1"
                                                        },
                                                        "nodeType": "YulFunctionCall",
                                                        "src": "490:24:1"
                                                    }
                                                ],
                                                "functionName": {
                                                    "name": "eq",
                                                    "nodeType": "YulIdentifier",
                                                    "src": "480:2:1"
                                                },
                                                "nodeType": "YulFunctionCall",
                                                "src": "480:35:1"
                                            }
                                        ],
                                        "functionName": {
                                            "name": "iszero",
                                            "nodeType": "YulIdentifier",
                                            "src": "473:6:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "473:43:1"
                                    },
                                    "nodeType": "YulIf",
                                    "src": "470:63:1"
                                }
                            ]
                        },
                        "name": "validator_revert_t_uint256",
                        "nodeType": "YulFunctionDefinition",
                        "parameters": [
                            {
                                "name": "value",
                                "nodeType": "YulTypedName",
                                "src": "453:5:1",
                                "type": ""
                            }
                        ],
                        "src": "417:122:1"
                    },
                    {
                        "body": {
                            "nodeType": "YulBlock",
                            "src": "608:80:1",
                            "statements": [
                                {
                                    "nodeType": "YulAssignment",
                                    "src": "618:22:1",
                                    "value": {
                                        "arguments": [
                                            {
                                                "name": "offset",
                                                "nodeType": "YulIdentifier",
                                                "src": "633:6:1"
                                            }
                                        ],
                                        "functionName": {
                                            "name": "mload",
                                            "nodeType": "YulIdentifier",
                                            "src": "627:5:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "627:13:1"
                                    },
                                    "variableNames": [
                                        {
                                            "name": "value",
                                            "nodeType": "YulIdentifier",
                                            "src": "618:5:1"
                                        }
                                    ]
                                },
                                {
                                    "expression": {
                                        "arguments": [
                                            {
                                                "name": "value",
                                                "nodeType": "YulIdentifier",
                                                "src": "676:5:1"
                                            }
                                        ],
                                        "functionName": {
                                            "name": "validator_revert_t_uint256",
                                            "nodeType": "YulIdentifier",
                                            "src": "649:26:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "649:33:1"
                                    },
                                    "nodeType": "YulExpressionStatement",
                                    "src": "649:33:1"
                                }
                            ]
                        },
                        "name": "abi_decode_t_uint256_fromMemory",
                        "nodeType": "YulFunctionDefinition",
                        "parameters": [
                            {
                                "name": "offset",
                                "nodeType": "YulTypedName",
                                "src": "586:6:1",
                                "type": ""
                            },
                            {
                                "name": "end",
                                "nodeType": "YulTypedName",
                                "src": "594:3:1",
                                "type": ""
                            }
                        ],
                        "returnVariables": [
                            {
                                "name": "value",
                                "nodeType": "YulTypedName",
                                "src": "602:5:1",
                                "type": ""
                            }
                        ],
                        "src": "545:143:1"
                    },
                    {
                        "body": {
                            "nodeType": "YulBlock",
                            "src": "771:274:1",
                            "statements": [
                                {
                                    "body": {
                                        "nodeType": "YulBlock",
                                        "src": "817:83:1",
                                        "statements": [
                                            {
                                                "expression": {
                                                    "arguments": [],
                                                    "functionName": {
                                                        "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                                                        "nodeType": "YulIdentifier",
                                                        "src": "819:77:1"
                                                    },
                                                    "nodeType": "YulFunctionCall",
                                                    "src": "819:79:1"
                                                },
                                                "nodeType": "YulExpressionStatement",
                                                "src": "819:79:1"
                                            }
                                        ]
                                    },
                                    "condition": {
                                        "arguments": [
                                            {
                                                "arguments": [
                                                    {
                                                        "name": "dataEnd",
                                                        "nodeType": "YulIdentifier",
                                                        "src": "792:7:1"
                                                    },
                                                    {
                                                        "name": "headStart",
                                                        "nodeType": "YulIdentifier",
                                                        "src": "801:9:1"
                                                    }
                                                ],
                                                "functionName": {
                                                    "name": "sub",
                                                    "nodeType": "YulIdentifier",
                                                    "src": "788:3:1"
                                                },
                                                "nodeType": "YulFunctionCall",
                                                "src": "788:23:1"
                                            },
                                            {
                                                "kind": "number",
                                                "nodeType": "YulLiteral",
                                                "src": "813:2:1",
                                                "type": "",
                                                "value": "32"
                                            }
                                        ],
                                        "functionName": {
                                            "name": "slt",
                                            "nodeType": "YulIdentifier",
                                            "src": "784:3:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "784:32:1"
                                    },
                                    "nodeType": "YulIf",
                                    "src": "781:119:1"
                                },
                                {
                                    "nodeType": "YulBlock",
                                    "src": "910:128:1",
                                    "statements": [
                                        {
                                            "nodeType": "YulVariableDeclaration",
                                            "src": "925:15:1",
                                            "value": {
                                                "kind": "number",
                                                "nodeType": "YulLiteral",
                                                "src": "939:1:1",
                                                "type": "",
                                                "value": "0"
                                            },
                                            "variables": [
                                                {
                                                    "name": "offset",
                                                    "nodeType": "YulTypedName",
                                                    "src": "929:6:1",
                                                    "type": ""
                                                }
                                            ]
                                        },
                                        {
                                            "nodeType": "YulAssignment",
                                            "src": "954:74:1",
                                            "value": {
                                                "arguments": [
                                                    {
                                                        "arguments": [
                                                            {
                                                                "name": "headStart",
                                                                "nodeType": "YulIdentifier",
                                                                "src": "1000:9:1"
                                                            },
                                                            {
                                                                "name": "offset",
                                                                "nodeType": "YulIdentifier",
                                                                "src": "1011:6:1"
                                                            }
                                                        ],
                                                        "functionName": {
                                                            "name": "add",
                                                            "nodeType": "YulIdentifier",
                                                            "src": "996:3:1"
                                                        },
                                                        "nodeType": "YulFunctionCall",
                                                        "src": "996:22:1"
                                                    },
                                                    {
                                                        "name": "dataEnd",
                                                        "nodeType": "YulIdentifier",
                                                        "src": "1020:7:1"
                                                    }
                                                ],
                                                "functionName": {
                                                    "name": "abi_decode_t_uint256_fromMemory",
                                                    "nodeType": "YulIdentifier",
                                                    "src": "964:31:1"
                                                },
                                                "nodeType": "YulFunctionCall",
                                                "src": "964:64:1"
                                            },
                                            "variableNames": [
                                                {
                                                    "name": "value0",
                                                    "nodeType": "YulIdentifier",
                                                    "src": "954:6:1"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        "name": "abi_decode_tuple_t_uint256_fromMemory",
                        "nodeType": "YulFunctionDefinition",
                        "parameters": [
                            {
                                "name": "headStart",
                                "nodeType": "YulTypedName",
                                "src": "741:9:1",
                                "type": ""
                            },
                            {
                                "name": "dataEnd",
                                "nodeType": "YulTypedName",
                                "src": "752:7:1",
                                "type": ""
                            }
                        ],
                        "returnVariables": [
                            {
                                "name": "value0",
                                "nodeType": "YulTypedName",
                                "src": "764:6:1",
                                "type": ""
                            }
                        ],
                        "src": "694:351:1"
                    }
                ]
            },
            "contents": "{\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_uint256_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_uint256_fromMemory(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n}\n",
            "id": 1,
            "language": "Yul",
            "name": "#utility.yul"
        }
    ],
    "linkReferences": {},
    "object": "608060405234801561001057600080fd5b506040516102b33803806102b38339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b6101fd806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637cf5dab0146100465780638381f58a14610062578063d826f88f14610080575b600080fd5b610060600480360381019061005b91906100eb565b61008a565b005b61006a6100a1565b6040516100779190610127565b60405180910390f35b6100886100a7565b005b806000546100989190610171565b60008190555050565b60005481565b60008081905550565b600080fd5b6000819050919050565b6100c8816100b5565b81146100d357600080fd5b50565b6000813590506100e5816100bf565b92915050565b600060208284031215610101576101006100b0565b5b600061010f848285016100d6565b91505092915050565b610121816100b5565b82525050565b600060208201905061013c6000830184610118565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061017c826100b5565b9150610187836100b5565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156101bc576101bb610142565b5b82820190509291505056fea26469706673582212205baee4d08a141e63c34c4224ce401464adbc84446fea4a83687099b0ae645fc564736f6c63430008090033",
    "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH2 0x2B3 CODESIZE SUB DUP1 PUSH2 0x2B3 DUP4 CODECOPY DUP2 DUP2 ADD PUSH1 0x40 MSTORE DUP2 ADD SWAP1 PUSH2 0x32 SWAP2 SWAP1 PUSH2 0x7A JUMP JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP PUSH2 0xA7 JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x57 DUP2 PUSH2 0x44 JUMP JUMPDEST DUP2 EQ PUSH2 0x62 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0x74 DUP2 PUSH2 0x4E JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x90 JUMPI PUSH2 0x8F PUSH2 0x3F JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x9E DUP5 DUP3 DUP6 ADD PUSH2 0x65 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x1FD DUP1 PUSH2 0xB6 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x7CF5DAB0 EQ PUSH2 0x46 JUMPI DUP1 PUSH4 0x8381F58A EQ PUSH2 0x62 JUMPI DUP1 PUSH4 0xD826F88F EQ PUSH2 0x80 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x60 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x5B SWAP2 SWAP1 PUSH2 0xEB JUMP JUMPDEST PUSH2 0x8A JUMP JUMPDEST STOP JUMPDEST PUSH2 0x6A PUSH2 0xA1 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x77 SWAP2 SWAP1 PUSH2 0x127 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x88 PUSH2 0xA7 JUMP JUMPDEST STOP JUMPDEST DUP1 PUSH1 0x0 SLOAD PUSH2 0x98 SWAP2 SWAP1 PUSH2 0x171 JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 DUP2 SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xC8 DUP2 PUSH2 0xB5 JUMP JUMPDEST DUP2 EQ PUSH2 0xD3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xE5 DUP2 PUSH2 0xBF JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x101 JUMPI PUSH2 0x100 PUSH2 0xB0 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x10F DUP5 DUP3 DUP6 ADD PUSH2 0xD6 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x121 DUP2 PUSH2 0xB5 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x13C PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x118 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH2 0x17C DUP3 PUSH2 0xB5 JUMP JUMPDEST SWAP2 POP PUSH2 0x187 DUP4 PUSH2 0xB5 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH2 0x1BC JUMPI PUSH2 0x1BB PUSH2 0x142 JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 JUMPDEST 0xAE 0xE4 0xD0 DUP11 EQ 0x1E PUSH4 0xC34C4224 0xCE BLOCKHASH EQ PUSH5 0xADBC84446F 0xEA 0x4A DUP4 PUSH9 0x7099B0AE645FC56473 PUSH16 0x6C634300080900330000000000000000 ",
    "sourceMap": "74:294:0:-:0;;;133:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;189:14;180:6;:23;;;;133:78;74:294;;88:117:1;197:1;194;187:12;334:77;371:7;400:5;389:16;;334:77;;;:::o;417:122::-;490:24;508:5;490:24;:::i;:::-;483:5;480:35;470:63;;529:1;526;519:12;470:63;417:122;:::o;545:143::-;602:5;633:6;627:13;618:22;;649:33;676:5;649:33;:::i;:::-;545:143;;;;:::o;694:351::-;764:6;813:2;801:9;792:7;788:23;784:32;781:119;;;819:79;;:::i;:::-;781:119;939:1;964:64;1020:7;1011:6;1000:9;996:22;964:64;:::i;:::-;954:74;;910:128;694:351;;;;:::o;74:294:0:-;;;;;;;"
};

const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_initialNumber",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "number",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "reset",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

/* GET donate of project page*/
router.get('/', (req, res, next) => {
    project.find({}, (err, prj) => {
        res.render('donate', { projectList: prj });
    })
});



router.get('/success/:prj/:hashID', (req, res) => {
    var transactionHash = req.params['hashID'];
    const projectName = req.params['prj'];
    console.log('/' + transactionHash + '/');
    var returnValue;
    web3.eth.getTransaction(transactionHash, function (error, result) {
        console.log(result);
        returnValue = web3.utils.fromWei(result.value, 'ether')
        console.log(result)
        web3.eth.getBlock(result.blockNumber, function (error, receipt) {
            console.log(receipt);
            var date1 = receipt.timestamp;
            var date = new Date(date1 * 1000);
            var fullDate = date.getDate() +
                "/" + (date.getMonth() + 1) +
                "/" + date.getFullYear() +
                " " + date.getHours() +
                ":" + date.getMinutes() +
                ":" + date.getSeconds();

            // //Balance from
            var balanceFrom;
            const balances = async () => {
                balanceFrom = web3.utils.fromWei(
                    await web3.eth.getBalance(result.from),
                    'ether'
                );

            };
            balances()
                .then(function (data) {
                    console.log(data);
                    hashTxn = data
                })
                .catch(function (err) { console.log(err) })
                .finally(function () {
                    res.render('../views/success', {
                        hashPrj: transactionHash,
                        sendNumber: result.from,
                        sendTime: fullDate,
                        project: projectName,
                        fundNumber: result.to,
                        sendMoney: returnValue,
                        sendLeft: balanceFrom
                    });
                })


        });

    });


})

router.get('/success', (req, res) => {
    res.render('../views/success')
})

router.get('/:name', verifyToken, isDonor, (req, res) => {
    var projectName = req.params.name;
    let users = JSON.parse(req.query.user);
    var userID = users.id;
    // console.log(userID)
    project.find({ Name: projectName }, (err, prj) => {
        donor.find({ _id: userID }, (err, donors) => {
            // console.log(prj);
            const addressFrom = donors[0].NumberMetaMask;
            const balances = async () => {
                const balanceFrom = web3.utils.fromWei(
                    await web3.eth.getBalance(addressFrom),
                    'ether'
                );
                // console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH`);
                res.render('donate', { project: prj, user: donors, money: balanceFrom });
            };
            balances();


        })
    })
});

async function deploy(addressFrom, addressTo, privateKey, moneyDonate) {
    console.log(
        `Attempting to send transaction from ${addressFrom} to ${addressTo} with ${moneyDonate}`
    );
    // Create Contract Instance
    const incrementer = new web3.eth.Contract(abi, contractAddress);

    // Create Constructor Tx
    const incrementerTx = incrementer.deploy({
        data: bytecode,
        arguments: [5],
    });

    // Sign Tx with PK
    const createTransaction = await web3.eth.accounts.signTransaction({
        gas: 53000,
        value: web3.utils.toWei(moneyDonate, 'ether'),
    },
        privateKey
    );

    // Send Tx and Wait for Receipt
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    )
    let hash = createReceipt.transactionHash;
    console.log(
        `Transaction successful with hash: ${hash}`
    );
    return hash;

}

router.post('/:name', async (req, res, next) => {
    let userId = req.body.userId;
    const namePrj = req.params.name;
    var donateMoney = req.body.moneyDonate;
    donateMoney /= 70000000;
    donatePrj = donateMoney.toString();
    console.log(donatePrj);
    donor.findOne({ _id: userId }, (err, donors) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        var pass = donors.Password == req.body.password;
        if (!pass) {
            return res.status(401).send({ message: "Sai mật khẩu!" });
        }
        const privateKey = donors.PrivateKey;
        const addressFrom = donors.NumberMetaMask;

        /*Transaction*/
        var hashTxn;
        project.find({ Name: namePrj }, (err, prj) => {
            const addressTo = prj[0].MetaMask;
            deploy(addressFrom, addressTo, privateKey, donatePrj)
                .then(function (data) {
                    console.log(data);
                    hashTxn = data
                })
                .catch(function (err) { console.log(err) })
                .finally(function () {
                    console.log('Done')
                    res.status(200).send({
                        message: "Giao dịch thành công",
                        hash: hashTxn
                    });
                })
        });

    });
});


module.exports = router;