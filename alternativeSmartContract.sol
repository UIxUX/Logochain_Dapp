pragma solidity ^0.4.21;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
//import "./usingOraclize.sol";


import "github.com/willitscale/solidity-util/lib/Strings.sol";
import "github.com/willitscale/solidity-util/lib/Integers.sol";
import "github.com/willitscale/solidity-util/lib/Addresses.sol";

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

//For reference: https://ethereum.stackexchange.com/questions/25933/issues-running-oraclize-callback-function

contract Purchasing is usingOraclize {

using strings for *;

    string[] public subIDsBought;
    uint256 public price;
    string public query1;
    string public query2;
    string public query3;
    address public author;
    address public buyer;
    uint256 public sentValue;
    uint256 public contractBalance;
    bool public thisTransactionIsValid = false;

    string debugString;
    string[] authorandvoters;
    uint256 public rewardauthor;
    uint256 public rewardeachvoter;
    uint256 public amountVoters = 0;

    uint256 public debugCheck = 0;


    mapping (bytes32 => uint) queries;

    event newOraclizeQuery(string description);

    //Helpful tips:
    //function parseAddr(string _a) internal returns (address); // is already implemented - can be called
    //destination_address.send(amount);
    //node bridge -H localhost:8545 -a 1

    function Purchasing () public {
        //OAR = OraclizeAddrResolverI("enterAddressHere"); //not needed: https://ethereum.stackexchange.com/questions/23301/oraclize-with-private-blockchain-generate-custom-address-for-oar
        //OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        oraclize_setNetwork(networkID_testnet);
    }

    function __callback(bytes32 myid, string result) {
           // if (msg.sender != oraclize_cbAddress()) throw;

        //author.send(sentValue);

       if (queries[myid] == 1){

           var s = result.toSlice();
           debugString = s.toString();
           var delim = " ".toSlice();
            var parts = new string[](s.count(delim) + 1);
            for(uint256 i = 0; i < parts.length; i++) {
                //var t = s.toSlice();
                parts[i] = s.split(delim).toString();
            }
            authorandvoters = parts;

          author = parseAddr( parts[0] );

       }   if (queries[myid] == 2) {
                price = parseInt(result);

               //Last query, transfer to authorwallet
               if (sentValue >= price) {
                   thisTransactionIsValid = true;



                    debugCheck = 1;
                    string[] storage voters = split(result, " ");

                    debugCheck = 2;
                    amountVoters = voters.length;

                    //determine amount for voters and author
                    rewardauthor = price * 95 / 100;

                    author.send(rewardauthor);

                    if (amountVoters > 1) {
                        rewardeachvoter = price * 5 / 100 / amountVoters;

                        for(uint256 j = 1; j < voters.length; i++){
                            if( parseAddr(voters[j]) != address(0)){
                                parseAddr(voters[j]).send(rewardeachvoter);
                             }
                        }
                    }




               } else {
                   //Transfer back to buyer - failure didnt send enough
                   thisTransactionIsValid = false;
                   buyer.send(sentValue);
               }




               }


    }

    //Helper Function by:  "github.com/willitscale/solidity-util/lib/Strings.sol";
    function split(string _base, string _value)
        internal
        returns (string[] storage splitArr) {
        bytes memory _baseBytes = bytes(_base);
        uint _offset = 0;

        while(_offset < _baseBytes.length-1) {

            int _limit = _indexOf(_base, _value, _offset);
            if (_limit == -1) {
                _limit = int(_baseBytes.length);
            }

            string memory _tmp = new string(uint(_limit)-_offset);
            bytes memory _tmpBytes = bytes(_tmp);

            uint j = 0;
            for(uint i = _offset; i < uint(_limit); i++) {
                _tmpBytes[j++] = _baseBytes[i];
            }
            _offset = uint(_limit) + 1;
            splitArr.push(string(_tmpBytes));
        }
        return splitArr;
    }

    //Helper Function by:  "github.com/willitscale/solidity-util/lib/Strings.sol";
    function _indexOf(string _base, string _value, uint _offset)
        internal
        returns (int) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        assert(_valueBytes.length == 1);

        for(uint i = _offset; i < _baseBytes.length; i++) {
            if (_baseBytes[i] == _valueBytes[0]) {
                return int(i);
            }
        }

        return -1;
    }

    function purchaseLogo( string subID ) public payable returns (bool success) {

            buyer = msg.sender;

            sentValue = uint256(msg.value);
            contractBalance = uint256(this.balance);

            query1 = strConcat("json(", "https://wise-robin-27.localtunnel.me/api/getallpurchasedata/", subID, ")", ".purchase.authorvoterstring");
            query2 = strConcat("json(", "https://wise-robin-27.localtunnel.me/api/getallpurchasedata/", subID, ")", ".purchase.endprice");



            newOraclizeQuery("Oraclize query was sent, standing by for the answer..");

            //oraclize_query("URL", query);
            queries[oraclize_query( "URL", query1)] = 1; // ask for recipientWallet & voters
            queries[oraclize_query( "URL", query2)] = 2; // ask for endprice


            return     thisTransactionIsValid;
    }

    //Transfer Eth to Contract
    function pay() payable {}


    //Helper functions to concatenate strings in solidity
    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string _a, string _b, string _c) internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string _a, string _b) internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }

}