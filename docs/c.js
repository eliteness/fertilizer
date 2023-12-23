function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
let STATE = {
	ts: T_X,
	tb: T_Y
};
let CACHE = {
	oldinp: [,],
	ACTIVEI: 0
}

CHAINDATA = {
	250 : {
		logo: "https://ftm.guru/icons/ftm.svg"
	},
	42161 : {
		logo: "https://ftm.guru/icons/arb1.svg"
	},
	42161 : {
		logo: "https://ftm.guru/icons/base.svg"
	}
}
window.addEventListener('load',async function() {
	//PRE
	pre_stats();
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); await paintBook();}, 3000);
	arf();
}, false);

BL = {
	250:	"0x5a054233e59323e7a58f6b7dae86e6992f1f92e2",
	42161:	"0xc4c807aee35f75c891cb51ef982c98371b1362b4",
	8453:	"0xb62f6095f2afd00702fb79570c9f1aa730510fc4"
}

BUCKETDECIMALS = {
	250: { 0:6, 1:12, 2:6, 3:12 },
	42161: { 0:12, 1:12 },
	8453: { 0:12, 1:12 }
}

MAXORDERBOOKSIZE = 2500;

async function basetrip() {
	//MAIN
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); dexstats();paintBook();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.JsonRpcProvider(RPC_URL); dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
		gubs();
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		//signer = provider.getSigner()
		dexstats();
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null && Number(window.ethereum.chainId!=CHAINID && CHAINID!=-2))
	{
		notice(`<h3>Wrong Network!</h3>You are connectedd to Chain ID ${Number(window.ethereum.chainId)}<br>Please Switch to ${CHAIN_NAME}`);
		_newch = "test";
		console.log("1: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		_newch = window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		console.log("2: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		_newch = await _newch;
		console.log("3: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		if( _newch == null) { window.location.reload(); }
		console.log("4: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		notice(`<h3>Wrong Network!</h3>Please Switch to ${CHAIN_NAME}`);
		console.log("5: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
	}
	//DrefreshFarm()
	//arf()
	//paintBook()
	cw()
	dexstats()
	gubs()
}



/*
function fornum(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(4)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(4)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(4)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(4)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(4)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(4)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+"M"}
	else if(_n>1e3){n_=(_n/1e0).toFixed(2)+""}
	else if(_n>1e1){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>1e0){n_=(_n/1e0).toFixed(6)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(6)+""}
	return(n_);
}


async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact", cs):cw2();
	//cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints");
	gubs();
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) {
		(new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>
		{
			if(rn.length>0){
				$("cw").innerHTML="<span id='cw_ns'>hi, <span style=''>"+rn[0]+"</span> 👋</span>";
				$("cw_ns").onclick="notice(`<h3>GM, ${rn[0]}</h3>${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
			else{
				$("cw").innerHTML= "<span id='cw_ns'>"+(window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34)+"</span>";
				$("cw").onclick="notice(`${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
		})
	}
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	//arf();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(4)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(4)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(4)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(4)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(4)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(4)+" Thousand"}
	else if(_n>1){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

VEABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"locktime","type":"uint256"},{"indexed":false,"internalType":"enum VotingEscrow.DepositType","name":"deposit_type","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"supply","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DELEGATES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"abstain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"attach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attachments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"balanceOfAtNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"balanceOfNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"balanceOfNFTAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"block_number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkpoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"create_lock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"create_lock_for","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"deposit_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"detach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotesIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"get_last_user_slope","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"increase_unlock_time","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token_addr","type":"address"},{"internalType":"address","name":"art_proxy","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"isApprovedOrOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locked","outputs":[{"internalType":"int128","name":"amount","type":"int128"},{"internalType":"uint256","name":"end","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"locked__end","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"merge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownership_change","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_proxy","type":"address"}],"name":"setArtProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_team","type":"address"}],"name":"setTeam","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"setVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"slope_changes","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"team","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_tokenIndex","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"t","type":"uint256"}],"name":"totalSupplyAtT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_idx","type":"uint256"}],"name":"user_point_history__ts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

VMABI = [{"inputs":[{"internalType":"address","name":"ve","type":"address"},{"internalType":"address","name":"e","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"","type":"address"},{"indexed":true,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Deposit","type":"event"},{"inputs":[],"name":"ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"converted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eTHENA","outputs":[{"internalType":"contract IeTHENA","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"uint256","name":"_a","type":"uint256"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"d","type":"address"}],"name":"setDAO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"setID","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplied","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veTHE","outputs":[{"internalType":"contract IVotingEscrow","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

FARABI = [{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_tg","type":"address"},{"internalType":"bytes","name":"_tf","type":"bytes"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"TvlGuru","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"TvlPriceFeed","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"},{"internalType":"bytes","name":"_TvlPriceFeed","type":"bytes"}],"name":"addReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"apr","outputs":[{"internalType":"uint256","name":"_apr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"apr","outputs":[{"internalType":"uint256","name":"_apr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aprs","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_tokens","type":"address[]"}],"name":"earningsList","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feePerMillion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeTaker","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},/* {"constant":false,"inputs":[{"internalType":"address[]","name":"_rewardsTokens","type":"address[]"},{"internalType":"address","name":"_ben","type":"address"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}	,{"constant":false,"inputs":[{"internalType":"address[]","name":"_rewardsTokens","type":"address[]"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},	*/ {"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}	,{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"address","name":"rewardsDistributor","type":"address"},{"internalType":"uint256","name":"rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTokensList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_f","type":"uint256"}],"name":"setFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_f","type":"address"}],"name":"setFeeTaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"}],"name":"setRewardsDistributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"bytes","name":"_d","type":"bytes"}],"name":"setTvlFeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_t","type":"address[]"},{"internalType":"bytes[]","name":"_d","type":"bytes[]"}],"name":"setTvlFeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_tg","type":"address"}],"name":"setTvlGuru","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stakeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"depositAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"_tvl","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

LPABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Fees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve1","type":"uint256"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockTimestampLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"claimed0","type":"uint256"},{"internalType":"uint256","name":"claimed1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimStakingFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"current","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentCumulativePrices","outputs":[{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"},{"internalType":"uint256","name":"blockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"tokenIn","type":"address"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"_reserve0","type":"uint256"},{"internalType":"uint256","name":"_reserve1","type":"uint256"},{"internalType":"uint256","name":"_blockTimestampLast","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isStable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastObservation","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"}],"internalType":"struct Pair.Observation","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadata","outputs":[{"internalType":"uint256","name":"dec0","type":"uint256"},{"internalType":"uint256","name":"dec1","type":"uint256"},{"internalType":"uint256","name":"r0","type":"uint256"},{"internalType":"uint256","name":"r1","type":"uint256"},{"internalType":"bool","name":"st","type":"bool"},{"internalType":"address","name":"t0","type":"address"},{"internalType":"address","name":"t1","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"observationLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"}],"name":"prices","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"granularity","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"},{"internalType":"uint256","name":"window","type":"uint256"}],"name":"sample","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"supplyIndex0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"supplyIndex1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokens","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

function sortit(n,_maintable,_trName,_tdName) {
  var t, r, z, i, x, y, v, b, c = 0;
  t = document.getElementById(_maintable);//.getElementsByTagName("tbody")[0];
  z = true;
  b = "a";
  while (z) {
    z = false;
    r = t.getElementsByClassName(_trName);
    for (i = 0; i < (r.length - 1); i++) {
      v = false;
      x = (r[i].getElementsByTagName(_tdName)[n].textContent)//.replace(/,| |\.|\$|%/g,'');
      if(isFinite(x)){x=Number(x)}else{x=x.toLowerCase()}
      y = (r[i + 1].getElementsByTagName(_tdName)[n].textContent)//.replace(/,| |\.|\$|%/g,'');
      if(isFinite(y)){y=Number(y)}else{y=y.toLowerCase()}
      if (b == "a") {
        if ((x) > (y)) {
          v= true;
          break;
        }
      } else if (b == "d") {
        if ((x) < (y)) {
          v = true;
          break;
        }
      }
    }
    if (v) {
      r[i].parentNode.insertBefore(r[i + 1], r[i]);
      z = true;
      c ++;
    } else {
      if (c == 0 && b == "a") {
        b = "d";
        z = true;
      }
    }
  }
    var t, r, z, i, x, y, v, b, c = 0;
}



function arf(){
	var xfr = setInterval(function() {
		console.log("refreshing farm stats", Date.now() );
		try { if( ethers.utils.isAddress(window.ethereum.selectedAddress) ) {gubs();} }
		catch(e) { console.log('hmm..'); }
		priceFinder()
	}, 15000);
}

async function gubs() {
	gubs_tx = new ethers.Contract(T_X.address, ["function balanceOf(address) public view returns(uint)"], signer);
	gubs_ty = new ethers.Contract(T_Y.address, ["function balanceOf(address) public view returns(uint)"], signer);
	gubs_tf = new ethers.Contract(FTOKEN, ["function balanceOf(address) public view returns(uint)"], signer);
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	//fa_o = new ethers.Contract(FARMOLD, FARABI, signer);
	bal = await Promise.all([
		gubs_tx.balanceOf(window.ethereum.selectedAddress),
		gubs_ty.balanceOf(window.ethereum.selectedAddress),
		gubs_tf.balanceOf(window.ethereum.selectedAddress),
		lp.balanceOf(window.ethereum.selectedAddress),
		fa.balanceOf(window.ethereum.selectedAddress),
		fa.earned(TEARNED[0], window.ethereum.selectedAddress),
		fa.earnings(window.ethereum.selectedAddress, TEARNED[0]),
		fa.tvl(),
		fa.aprs(),
		//fa_o.balanceOf(window.ethereum.selectedAddress)
	]);

	console.log("gubs.bal_", bal);

	_ub_x = (bal[0]/10**STATE.ts.decimals).toFixed(STATE.ts.decimals);
	_ub_y = (bal[1]/10**STATE.tb.decimals).toFixed(STATE.tb.decimals);
	_ub_f = (bal[2]/10**18).toFixed(18);

	$("mint-balance-x").innerHTML = `<span onclick='$("mint-inp-x").value=${_ub_x};quoteMint()'>Balance: `+ _ub_x +" "+ T_X.symbol+"</span>";
	$("mint-balance-y").innerHTML = `<span onclick='$("mint-inp-y").value=${_ub_y};quoteMint()'>Balance: `+ _ub_y +" "+ T_Y.symbol+"</span>";
	$("burn-balance-f").innerHTML = `<span onclick='$("burn-inp-f").value=${_ub_f};quoteBurn()'>Balance: `+ _ub_f +" "+ FTOKEN_TICKER+"</span>";

	$("burn-balance-x").innerHTML = `<span onclick=''>Balance: `+ _ub_x +" "+ T_X.symbol+"</span>";
	$("burn-balance-y").innerHTML = `<span onclick=''>Balance: `+ _ub_y +" "+ T_Y.symbol+"</span>";
	$("mint-balance-f").innerHTML = `<span onclick='$'>Balance: `+ _ub_f +" "+ FTOKEN_TICKER+"</span>";

	$("bal_lp").innerHTML = (bal[3]/1e18).toFixed(8);
	$("bal_fa").innerHTML = (bal[4]/1e18).toFixed(8);
	$("bal_r0").innerHTML = (bal[5]/1e18).toFixed(8);
	$("bal_tr0").innerHTML = (bal[6]/1e18).toFixed(8);
	$("bal_tvl").innerHTML = fornum(bal[7],18);
	$("bal_apr").innerHTML = fornum(bal[8][0],18);
	////////
	////////
	return;
	////////
	////////
}

async function pre_stats() {
	console.log("pre-stat'ing");
	prepro = new ethers.providers.JsonRpcProvider(RPC_URL);
	lp = new ethers.Contract(WRAP, LPABI, prepro);
	fa = new ethers.Contract(FARM, FARABI, prepro);
	bal = await Promise.all([
		fa.tvl(),
		fa.aprs()
	]);
	$("bal_tvl").innerHTML = fornum(bal[0],18);
	$("bal_apr").innerHTML = fornum(bal[1][0],18);

	$("mint-logo-x").src= T_X.logo;
	$("burn-logo-x").src= T_X.logo;
	$("mint-logo-y").src= T_Y.logo;
	$("burn-logo-y").src= T_Y.logo;
	///$("mint-logo-f").src= T_X.logo;
	///$("burn-logo-f").src= T_X.logo;

	////////
	////////
	return;
	////////
	////////
}

function notice(c) {
	window.location = "#note";
	$("content1").innerHTML = c;
	console.log(c);
}

async function dexstats() {
	return;
}

async function paintBook() {
	return;
}

ROUTER = {
	address: "0xB9A64ab6b91F5c7a78c2360CfF759dE8a8a450d5",
	ABI: [{"inputs": [{"internalType": "contract ILBFactory","name": "factory","type": "address"},{"internalType": "contract IJoeFactory","name": "factoryV1","type": "address"},{"internalType": "contract ILBLegacyFactory","name": "legacyFactory","type": "address"},{"internalType": "contract ILBLegacyRouter","name": "legacyRouter","type": "address"},{"internalType": "contract IWNATIVE","name": "wnative","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "AddressHelper__CallFailed","type": "error"},{"inputs": [],"name": "AddressHelper__NonContract","type": "error"},{"inputs": [],"name": "JoeLibrary__InsufficientAmount","type": "error"},{"inputs": [],"name": "JoeLibrary__InsufficientLiquidity","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountSlippage","type": "uint256"}],"name": "LBRouter__AmountSlippageBPTooBig","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"}],"name": "LBRouter__AmountSlippageCaught","type": "error"},{"inputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"name": "LBRouter__BinReserveOverflows","type": "error"},{"inputs": [],"name": "LBRouter__BrokenSwapSafetyCheck","type": "error"},{"inputs": [{"internalType": "uint256","name": "deadline","type": "uint256"},{"internalType": "uint256","name": "currentTimestamp","type": "uint256"}],"name": "LBRouter__DeadlineExceeded","type": "error"},{"inputs": [{"internalType": "address","name": "recipient","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "LBRouter__FailedToSendNATIVE","type": "error"},{"inputs": [{"internalType": "uint256","name": "idDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"}],"name": "LBRouter__IdDesiredOverflows","type": "error"},{"inputs": [{"internalType": "int256","name": "id","type": "int256"}],"name": "LBRouter__IdOverflows","type": "error"},{"inputs": [{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "uint256","name": "activeId","type": "uint256"}],"name": "LBRouter__IdSlippageCaught","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"internalType": "uint256","name": "amountOut","type": "uint256"}],"name": "LBRouter__InsufficientAmountOut","type": "error"},{"inputs": [{"internalType": "address","name": "wrongToken","type": "address"}],"name": "LBRouter__InvalidTokenPath","type": "error"},{"inputs": [{"internalType": "uint256","name": "version","type": "uint256"}],"name": "LBRouter__InvalidVersion","type": "error"},{"inputs": [],"name": "LBRouter__LengthsMismatch","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"internalType": "uint256","name": "amountIn","type": "uint256"}],"name": "LBRouter__MaxAmountInExceeded","type": "error"},{"inputs": [],"name": "LBRouter__NotFactoryOwner","type": "error"},{"inputs": [{"internalType": "address","name": "tokenX","type": "address"},{"internalType": "address","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"}],"name": "LBRouter__PairNotCreated","type": "error"},{"inputs": [],"name": "LBRouter__SenderIsNotWNATIVE","type": "error"},{"inputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"name": "LBRouter__SwapOverflows","type": "error"},{"inputs": [{"internalType": "uint256","name": "excess","type": "uint256"}],"name": "LBRouter__TooMuchTokensIn","type": "error"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "uint256","name": "reserve","type": "uint256"}],"name": "LBRouter__WrongAmounts","type": "error"},{"inputs": [{"internalType": "address","name": "tokenX","type": "address"},{"internalType": "address","name": "tokenY","type": "address"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "msgValue","type": "uint256"}],"name": "LBRouter__WrongNativeLiquidityParameters","type": "error"},{"inputs": [],"name": "LBRouter__WrongTokenOrder","type": "error"},{"inputs": [],"name": "TokenHelper__TransferFailed","type": "error"},{"inputs": [{"components": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "int256[]","name": "deltaIds","type": "int256[]"},{"internalType": "uint256[]","name": "distributionX","type": "uint256[]"},{"internalType": "uint256[]","name": "distributionY","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "address","name": "refundTo","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"internalType": "struct ILBRouter.LiquidityParameters","name": "liquidityParameters","type": "tuple"}],"name": "addLiquidity","outputs": [{"internalType": "uint256","name": "amountXAdded","type": "uint256"},{"internalType": "uint256","name": "amountYAdded","type": "uint256"},{"internalType": "uint256","name": "amountXLeft","type": "uint256"},{"internalType": "uint256","name": "amountYLeft","type": "uint256"},{"internalType": "uint256[]","name": "depositIds","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidityMinted","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"components": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "int256[]","name": "deltaIds","type": "int256[]"},{"internalType": "uint256[]","name": "distributionX","type": "uint256[]"},{"internalType": "uint256[]","name": "distributionY","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "address","name": "refundTo","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"internalType": "struct ILBRouter.LiquidityParameters","name": "liquidityParameters","type": "tuple"}],"name": "addLiquidityNATIVE","outputs": [{"internalType": "uint256","name": "amountXAdded","type": "uint256"},{"internalType": "uint256","name": "amountYAdded","type": "uint256"},{"internalType": "uint256","name": "amountXLeft","type": "uint256"},{"internalType": "uint256","name": "amountYLeft","type": "uint256"},{"internalType": "uint256[]","name": "depositIds","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidityMinted","type": "uint256[]"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint24","name": "activeId","type": "uint24"},{"internalType": "uint16","name": "binStep","type": "uint16"}],"name": "createLBPair","outputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getFactory","outputs": [{"internalType": "contract ILBFactory","name": "lbFactory","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint256","name": "price","type": "uint256"}],"name": "getIdFromPrice","outputs": [{"internalType": "uint24","name": "","type": "uint24"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getLegacyFactory","outputs": [{"internalType": "contract ILBLegacyFactory","name": "legacyLBfactory","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getLegacyRouter","outputs": [{"internalType": "contract ILBLegacyRouter","name": "legacyRouter","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint24","name": "id","type": "uint24"}],"name": "getPriceFromId","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint128","name": "amountOut","type": "uint128"},{"internalType": "bool","name": "swapForY","type": "bool"}],"name": "getSwapIn","outputs": [{"internalType": "uint128","name": "amountIn","type": "uint128"},{"internalType": "uint128","name": "amountOutLeft","type": "uint128"},{"internalType": "uint128","name": "fee","type": "uint128"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint128","name": "amountIn","type": "uint128"},{"internalType": "bool","name": "swapForY","type": "bool"}],"name": "getSwapOut","outputs": [{"internalType": "uint128","name": "amountInLeft","type": "uint128"},{"internalType": "uint128","name": "amountOut","type": "uint128"},{"internalType": "uint128","name": "fee","type": "uint128"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getV1Factory","outputs": [{"internalType": "contract IJoeFactory","name": "factoryV1","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getWNATIVE","outputs": [{"internalType": "contract IWNATIVE","name": "wnative","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint16","name": "binStep","type": "uint16"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "removeLiquidity","outputs": [{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "token","type": "address"},{"internalType": "uint16","name": "binStep","type": "uint16"},{"internalType": "uint256","name": "amountTokenMin","type": "uint256"},{"internalType": "uint256","name": "amountNATIVEMin","type": "uint256"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "removeLiquidityNATIVE","outputs": [{"internalType": "uint256","name": "amountToken","type": "uint256"},{"internalType": "uint256","name": "amountNATIVE","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactNATIVEForTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactNATIVEForTokensSupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMinNATIVE","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForNATIVE","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMinNATIVE","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForNATIVESupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapNATIVEForExactTokens","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountNATIVEOut","type": "uint256"},{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapTokensForExactNATIVE","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"},{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapTokensForExactTokens","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "token","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "sweep","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract ILBToken","name": "lbToken","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"}],"name": "sweepLBToken","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"}],
}

PAIRABI =
[{"inputs":[{"internalType":"contract ILBFactory","name":"factory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AddressHelper__CallFailed","type":"error"},{"inputs":[],"name":"AddressHelper__NonContract","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"BinHelper__CompositionFactorFlawed","type":"error"},{"inputs":[],"name":"BinHelper__LiquidityOverflow","type":"error"},{"inputs":[],"name":"FeeHelper__FeeTooLarge","type":"error"},{"inputs":[],"name":"LBPair__AddressZero","type":"error"},{"inputs":[],"name":"LBPair__AlreadyInitialized","type":"error"},{"inputs":[],"name":"LBPair__EmptyMarketConfigs","type":"error"},{"inputs":[],"name":"LBPair__FlashLoanCallbackFailed","type":"error"},{"inputs":[],"name":"LBPair__FlashLoanInsufficientAmount","type":"error"},{"inputs":[],"name":"LBPair__InsufficientAmountIn","type":"error"},{"inputs":[],"name":"LBPair__InsufficientAmountOut","type":"error"},{"inputs":[],"name":"LBPair__InvalidInput","type":"error"},{"inputs":[],"name":"LBPair__InvalidStaticFeeParameters","type":"error"},{"inputs":[],"name":"LBPair__MaxTotalFeeExceeded","type":"error"},{"inputs":[],"name":"LBPair__OnlyFactory","type":"error"},{"inputs":[],"name":"LBPair__OnlyProtocolFeeRecipient","type":"error"},{"inputs":[],"name":"LBPair__OutOfLiquidity","type":"error"},{"inputs":[],"name":"LBPair__TokenNotSupported","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroAmount","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroAmountsOut","type":"error"},{"inputs":[],"name":"LBPair__ZeroBorrowAmount","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroShares","type":"error"},{"inputs":[],"name":"LBToken__AddressThisOrZero","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LBToken__BurnExceedsBalance","type":"error"},{"inputs":[],"name":"LBToken__InvalidLength","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"LBToken__SelfApproval","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"LBToken__SpenderNotApproved","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LBToken__TransferExceedsBalance","type":"error"},{"inputs":[],"name":"LiquidityConfigurations__InvalidConfig","type":"error"},{"inputs":[],"name":"OracleHelper__InvalidOracleId","type":"error"},{"inputs":[],"name":"OracleHelper__LookUpTimestampTooOld","type":"error"},{"inputs":[],"name":"OracleHelper__NewLengthTooSmall","type":"error"},{"inputs":[],"name":"PackedUint128Math__AddOverflow","type":"error"},{"inputs":[],"name":"PackedUint128Math__MultiplierTooLarge","type":"error"},{"inputs":[],"name":"PackedUint128Math__SubUnderflow","type":"error"},{"inputs":[],"name":"PairParametersHelper__InvalidParameter","type":"error"},{"inputs":[],"name":"ReentrancyGuard__ReentrantCall","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds128Bits","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds24Bits","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds40Bits","type":"error"},{"inputs":[],"name":"TokenHelper__TransferFailed","type":"error"},{"inputs":[],"name":"Uint128x128Math__LogUnderflow","type":"error"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Uint128x128Math__PowUnderflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulDivOverflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulShiftOverflow","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"feeRecipient","type":"address"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"CollectedProtocolFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint24","name":"id","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"CompositionFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"name":"DepositedToBins","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"contract ILBFlashLoanCallback","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint24","name":"activeId","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"amounts","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"FlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint24","name":"idReference","type":"uint24"},{"indexed":false,"internalType":"uint24","name":"volatilityReference","type":"uint24"}],"name":"ForcedDecay","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint16","name":"oracleLength","type":"uint16"}],"name":"OracleLengthIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint16","name":"baseFactor","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"indexed":false,"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"indexed":false,"internalType":"uint16","name":"protocolShare","type":"uint16"},{"indexed":false,"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"name":"StaticFeeParametersSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint24","name":"id","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"amountsIn","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"amountsOut","type":"bytes32"},{"indexed":false,"internalType":"uint24","name":"volatilityAccumulator","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"name":"WithdrawnFromBins","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"approveForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"batchBalances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"batchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amountsToBurn","type":"uint256[]"}],"name":"burn","outputs":[{"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectProtocolFees","outputs":[{"internalType":"bytes32","name":"collectedProtocolFees","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILBFlashLoanCallback","name":"receiver","type":"address"},{"internalType":"bytes32","name":"amounts","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"forceDecay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getActiveId","outputs":[{"internalType":"uint24","name":"activeId","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getBin","outputs":[{"internalType":"uint128","name":"binReserveX","type":"uint128"},{"internalType":"uint128","name":"binReserveY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBinStep","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getFactory","outputs":[{"internalType":"contract ILBFactory","name":"factory","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"getIdFromPrice","outputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bool","name":"swapForY","type":"bool"},{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getNextNonEmptyBin","outputs":[{"internalType":"uint24","name":"nextId","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOracleParameters","outputs":[{"internalType":"uint8","name":"sampleLifetime","type":"uint8"},{"internalType":"uint16","name":"size","type":"uint16"},{"internalType":"uint16","name":"activeSize","type":"uint16"},{"internalType":"uint40","name":"lastUpdated","type":"uint40"},{"internalType":"uint40","name":"firstTimestamp","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint40","name":"lookupTimestamp","type":"uint40"}],"name":"getOracleSampleAt","outputs":[{"internalType":"uint64","name":"cumulativeId","type":"uint64"},{"internalType":"uint64","name":"cumulativeVolatility","type":"uint64"},{"internalType":"uint64","name":"cumulativeBinCrossed","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getPriceFromId","outputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getProtocolFees","outputs":[{"internalType":"uint128","name":"protocolFeeX","type":"uint128"},{"internalType":"uint128","name":"protocolFeeY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint128","name":"reserveX","type":"uint128"},{"internalType":"uint128","name":"reserveY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStaticFeeParameters","outputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"amountOut","type":"uint128"},{"internalType":"bool","name":"swapForY","type":"bool"}],"name":"getSwapIn","outputs":[{"internalType":"uint128","name":"amountIn","type":"uint128"},{"internalType":"uint128","name":"amountOutLeft","type":"uint128"},{"internalType":"uint128","name":"fee","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"amountIn","type":"uint128"},{"internalType":"bool","name":"swapForY","type":"bool"}],"name":"getSwapOut","outputs":[{"internalType":"uint128","name":"amountInLeft","type":"uint128"},{"internalType":"uint128","name":"amountOut","type":"uint128"},{"internalType":"uint128","name":"fee","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenX","outputs":[{"internalType":"contract IERC20","name":"tokenX","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getTokenY","outputs":[{"internalType":"contract IERC20","name":"tokenY","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getVariableFeeParameters","outputs":[{"internalType":"uint24","name":"volatilityAccumulator","type":"uint24"},{"internalType":"uint24","name":"volatilityReference","type":"uint24"},{"internalType":"uint24","name":"idReference","type":"uint24"},{"internalType":"uint40","name":"timeOfLastUpdate","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"newLength","type":"uint16"}],"name":"increaseOracleLength","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"},{"internalType":"uint24","name":"activeId","type":"uint24"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes32[]","name":"liquidityConfigs","type":"bytes32[]"},{"internalType":"address","name":"refundTo","type":"address"}],"name":"mint","outputs":[{"internalType":"bytes32","name":"amountsReceived","type":"bytes32"},{"internalType":"bytes32","name":"amountsLeft","type":"bytes32"},{"internalType":"uint256[]","name":"liquidityMinted","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"name":"setStaticFeeParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"swapForY","type":"bool"},{"internalType":"address","name":"to","type":"address"}],"name":"swap","outputs":[{"internalType":"bytes32","name":"amountsOut","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];


async function quoteMint() {

}

async function quoteBurn() {

}

async function mint() {

	let _aamt = $("mint-inp-x").value;
	let _bamt = $("mint-inp-y").value;
	if(_aamt=="") {_aamt = 0;}
	if(_bamt=="") {_bamt = 0;}
	if(!isFinite(_aamt)) { notice(`<h3>Invalid amount of ${T_X.symbol} input!</h3>`); return;}	_aamt=Number(_aamt);
	if(!isFinite(_bamt)) { notice(`<h3>Invalid amount of ${T_Y.symbol} input!</h3>`); return;}	_bamt=Number(_bamt);
	_T_X = new ethers.Contract(T_X.address, ["function balanceOf(address) public view returns(uint256)","function allowance(address,address) public view returns(uint256)","function approve(address,uint256)"], signer);
	_T_Y = new ethers.Contract(T_Y.address, ["function balanceOf(address) public view returns(uint256)","function allowance(address,address) public view returns(uint256)","function approve(address,uint256)"], signer);
	_FV = new ethers.Contract(FVAULT, ["function deposit(uint,uint,uint)","function withdraw(uint,uint,uint)"],signer);

	notice(`
		Validating your request...<br>
		<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Ask-Side Liquidity: ${_aamt} ${T_X.symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bid-Side Liquidity: ${_bamt} ${T_Y.symbol}
		<br><br>Please wait..
	`);

	let _usernums = await Promise.all([
		"0x0",
		_T_X.balanceOf(window.ethereum.selectedAddress),
		_T_X.allowance(window.ethereum.selectedAddress, FVAULT),
		_T_Y.balanceOf(window.ethereum.selectedAddress),
		_T_Y.allowance(window.ethereum.selectedAddress, FVAULT),
	]);

	console.log("onp-create",_aamt,_bamt,_usernums);

	if( _usernums[1] < (_aamt*10**T_X.decimals) || _usernums[3] < (_bamt*10**T_Y.decimals) ) {
		notice(`
			<h3>Insufficient Balance!</h3>
			<br>Desired ${T_X.symbol}: ${(_aamt).toFixed(6)}
			<br>Available ${T_X.symbol}: ${_usernums[1]/10**T_X.decimals}
			<br>
			<br>Desired ${T_Y.symbol}: ${(_bamt).toFixed(6)}
			<br>Available ${T_Y.symbol}: ${_usernums[3]/10**T_Y.decimals}
		`);
		return;
	};


	if( _usernums[2] < (_aamt*10**T_X.decimals) || _usernums[4] < (_bamt*10**T_Y.decimals) ) {
		notice(`
			<h3>Insufficient Allowances!</h3>
			<br>Desired ${T_X.symbol}: ${(_aamt).toFixed(6)}
			<br>Allowed ${T_X.symbol}: ${_usernums[2]/10**T_X.decimals}
			<br>
			<br>Desired ${T_Y.symbol}: ${(_bamt).toFixed(6)}
			<br>Allowed ${T_Y.symbol}: ${_usernums[4]/10**T_Y.decimals}
			<br><br>E3 Engine needs your approval to open a new	position.
			<br><i>Please confirm approval transactions in your wallet.</i>
		`);

		txh = await Promise.all([
			_usernums[2] < (_aamt*10**T_X.decimals) ? _T_X.approve(FVAULT, BigInt(Math.floor(_aamt*10**T_X.decimals))) : true,
			_usernums[4] < (_bamt*10**T_Y.decimals) ? _T_Y.approve(FVAULT, BigInt(Math.floor(_bamt*10**T_Y.decimals))) : true,
		]);
		txr = await Promise.all([
			txh[0] == true ? true : txh[0].wait(),
			txh[1] == true ? true : txh[1].wait()
		]);

		notice(`
			<h2>Approvals Granted!</h2>
			<img style="vertical-align: bottom;" height="32px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
			<br>Starting Order Creation...
		`);
	};


	//if(_aamt<T_X.minimum/10**T_X.decimals) { notice(`<h3>Amount of ${T_X.symbol} low!</h3>Minimum order size: ${T_X.minimum/10**T_X.decimals}`); return;}
	//if(_bamt<T_Y.minimum/10**T_Y.decimals) { notice(`<h3>Amount of ${T_Y.symbol} low!</h3>Minimum order size: ${T_Y.minimum/10**T_Y.decimals}`); return;}
	notice(`
		<h2>Minting F* tokens</h3>
		<h3>Creating an EⅢ Position</h3>
		<img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
	`);

	txh = await _FV.deposit(
		BigInt(Math.floor(_aamt*10**T_X.decimals)),
		BigInt(Math.floor(_bamt*10**T_Y.decimals)),
		BigInt(Math.floor( ( _aamt*10**T_X.decimals + _bamt*10**T_Y.decimals) * SLIPBPS/1e4 )),
	);
	notice(`
		<h2>Opening a new position</h2>
		<div align="center">
			<img style="vertical-align: bottom;" height="64px" src="${T_X.logo}">
			<img style="vertical-align: bottom;" height="64px" src="${T_Y.logo}">
		</div>
		<br>Minimum ${FTOKEN_TICKER} Received:
		<br>${( (_aamt*10**T_X.decimals + _bamt*10**T_Y.decimals) * (10**(18-Math.floor(T_X.decimals/2+T_Y.decimals/2))) * SLIPBPS / 1e4 / 1e18).toFixed(18)}
		<br>
		<br><b>Awaiting confirmation from the network . . .</b>
		<br<i>Please wait.</i>
		<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	txr = await txh.wait();
	notice(`
		<h2>New Position Opened!</h2>
		Using <b>Ultra-Wide Flat</b> strategy..
		<br>
		<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
		<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	gubs();paintBook();
}




async function redeem() {

	let _aamt = $("burn-inp-f").value;
	if(!isFinite(_aamt)) { notice(`<h3>Invalid amount of ${FTOKEN_TICKER} input!</h3>`); return;}	_aamt=Number(_aamt);
	_T_F = new ethers.Contract(FTOKEN, ["function balanceOf(address) public view returns(uint256)","function allowance(address,address) public view returns(uint256)","function approve(address,uint256)"], signer);
	_FV = new ethers.Contract(FVAULT, ["function deposit(uint,uint,uint)","function withdraw(uint,uint,uint)"],signer);

	notice(`
		Validating your request...<br>
		<br><img style="vertical-align: bottom;" height="20px" src="${FTOKEN_LOGO}"> ${_aamt} ${FTOKEN_TICKER}
		<br><br>Please wait..
	`);

	let _usernums = await Promise.all([
		_T_F.balanceOf(window.ethereum.selectedAddress),
		_T_F.allowance(window.ethereum.selectedAddress, FVAULT)
	]);

	console.log("onp-create",_aamt,_usernums);

	if( _usernums[0] < (_aamt*1e18) ) {
		notice(`
			<h3>Insufficient Balance!</h3>
			<br>Desired ${FTOKEN_TICKER}: ${(_aamt).toFixed(6)}
			<br>Available ${FTOKEN_TICKER}: ${_usernums[0]/1e18}
		`);
		return;
	};


	if( _usernums[1] < (_aamt*1e18) ) {
		notice(`
			<h3>Insufficient Allowances!</h3>
			<br>Desired ${FTOKEN_TICKER}: ${(_aamt).toFixed(6)}
			<br>Allowed ${FTOKEN_TICKER}: ${_usernums[1]/1e18}
			<br><br>E3 Engine needs your approval to Close this position.
			<br><i>Please confirm approval transactions in your wallet.</i>
		`);

		txh = await _T_F.approve(FVAULT, BigInt(Math.floor(_aamt*1e18)));
		txr = await txh.wait();

		notice(`
			<h2>Approvals Granted!</h2>
			<img style="vertical-align: bottom;" height="32px" src="${FTOKEN_LOGO}"> ${_aamt} ${FTOKEN_TICKER}
			<br>Starting F* Redemption...
		`);
	};


	//if(_aamt<T_X.minimum/10**T_X.decimals) { notice(`<h3>Amount of ${T_X.symbol} low!</h3>Minimum order size: ${T_X.minimum/10**T_X.decimals}`); return;}
	//if(_bamt<T_Y.minimum/10**T_Y.decimals) { notice(`<h3>Amount of ${T_Y.symbol} low!</h3>Minimum order size: ${T_Y.minimum/10**T_Y.decimals}`); return;}
	notice(`
		<h2>Redeemin F* tokens</h3>
		<h3>Witdrawing EⅢ Position</h3>
		<br>
		<br><img style="vertical-align: bottom;" height="20px" src="${FTOKEN_LOGO}"> ${_aamt} ${FTOKEN_TICKER}
	`);

	txh = await _FV.withdraw(
		BigInt(Math.floor(_aamt*1e18)),
		0,//BigInt(Math.floor(_aamt*1e18*SLIPBPS/1e4*SLIPBPS/1e4)),
		0,//BigInt(Math.floor(_aamt*1e18*SLIPBPS/1e4*SLIPBPS/1e4)),
	);
	notice(`
		<h2>Closing your position</h2>
		<div align="center">
			<img style="vertical-align: bottom;" height="64px" src="${FTOKEN_LOGO}">
		</div>
		<br>F* Tokens Redeemed:
		<br>${_aamt} ${FTOKEN_TICKER}
		<br>
		<br><b>Awaiting confirmation from the network . . .</b>
		<br<i>Please wait.</i>
		<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	txr = await txh.wait();
	notice(`
		<h2>F* Tokens Redeemed</h2>
		<br>${T_X.symbol} & ${T_Y.symbol} have been credited to your wallet!
		<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	gubs();paintBook();
}



async function deposit(ismax) {
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	al = await Promise.all([
		lp.allowance(window.ethereum.selectedAddress, FARM),
		lp.balanceOf(window.ethereum.selectedAddress)
	]);
	let amt = 0;
	am = $("in_d").value;
	if(ismax) {amt = al[1]; }
	else {
		if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please increase amount!</h2>You have entered an invalid or zero amount.<br><br>Your input: ${am}`);return}
		amt = BigInt(Math.floor(am*1e18));
	}
	if(Number(amt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Stake:</h3>${amt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${WRAPNAME}.`);}
	if(Number(amt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			${WRAPNAME} requires your approval for Staking.<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await lp.approve(FARM,ethers.constants.MaxUint256);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights granted on ${WRAPNAME}.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step your wallet provider now.
		`);
	}
	notice(`
		<h3>Staking ${WRAPNAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = ismax ? await fa.depositAll() : await fa.deposit(amt);
	console.log(_tr);
	notice(`
		<h3>Depositing ${WRAPNAME}!</h3>
		Get ready to start enjoying ${TEARNSYM.join(" + ")} rewards!<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>Deposit Successful!</h3>
		<br>Amount Staked:<br>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}

async function withdraw(ismax) {
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	al = await Promise.all([
		fa.balanceOf(window.ethereum.selectedAddress)
	]);
	let amt = 0;
	am = $("in_w").value;
	if(ismax) {amt = al[0]; }
	else {
		if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please decrease amount!</h2>You have entered an invalid or exaggerated amount.<br><br>Your input: ${am}`);return}
		amt = BigInt(Math.floor(am*1e18));
	}
	if(Number(amt)>Number(al[0])) {notice(`<h2>Insufficient Balance Staked!</h2><h3>Desired Stake:</h3>${amt/1e18}<br><h3>Actual Staked:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again to unstake ${WRAPNAME}.`);}
	notice(`
		<h3>Withdrawing ${WRAPNAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = ismax ? await fa.withdrawAll() : await fa.withdraw(amt);
	console.log(_tr);
	notice(`
		<h3>Unstaking ${WRAPNAME}!</h3>
		We hope you are enjoying your ${TEARNSYM.join(" + ")}     rewards!<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>${WRAPNAME} Received!</h3>
		<br>Amount Unstaked:<br>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}


async function claim() {
	fa = new ethers.Contract(FARM, FARABI, signer);
	voter = new ethers.Contract(VOTER, ["function claimRewards(address[],address[][])"], signer);
	notice(`
		<h3>Claiming Rewards!</h3>
		<img style='height:20px;position:relative;top:4px' src="${TEARNIMG[0]}">
		<u>${ $("bal_r0").innerHTML } ${TEARNSYM.join(" + ")}</u><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await voter.claimRewards([FARM],[[TEARNED[0]]]);
	console.log(_tr);
	notice(`
		<h3>Rewards are on their way!</h3>
		<img style='height:20px;position:relative;top:4px' src="${TEARNIMG[0]}">
		<u>${ $("bal_r0").innerHTML } ${TEARNSYM.join(" + ")}</u><br><br>
		We hope you enjoy staking with us!<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>Rewards Credited!</h3>
		<br><br>
		<img style='height:20px;position:relative;top:4px' src="${TEARNIMG[0]}">
		<u>${ $("bal_r0").innerHTML } ${TEARNSYM.join(" + ")}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}


function notice(c) {
	window.location = "#note";
	$("content1").innerHTML = c;
	console.log(c);
}

async function dexstats() {
	return;
}