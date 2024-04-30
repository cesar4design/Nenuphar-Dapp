import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { useWeb3Modal } from '@web3modal/wagmi/react'
import {
  useDisconnect,
  useAccount,
  usePrepareContractWrite,
  usePrepareContractRead,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import NFT_ABI from "../pages/abi/efrogs_abi.json";
import System_ABI from "../pages/abi/nenuphar_abi.json";

export default function Home() {
  const { data: session } = useSession();
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const { open, close } = useWeb3Modal();

  useEffect(() => {
    console.log("session object is", session);
  }, []);

  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  // Contracts
  const [EFrogsContract, setEFrogsContract] = useState({ address: '0x03E111ab07a1fAa863BCebe8DE96792d65FC2373', abi: NFT_ABI });
  const [nenupharContract, setNenupharContract] = useState({ address: '0xfB841de94010ae0818fb681A0f3415bA76052a50', abi: System_ABI });

  // Get user NFTs
  const [userNFTs, setUserNFTs] = React.useState(0n);

  const { data: dataUserNFTs } = useContractRead({
    ...EFrogsContract,
    functionName: 'getOwnedTokenIds',
    watch: true,
    args: [address]
  });

  React.useEffect(() => {
    if (dataUserNFTs) {
      setUserNFTs(dataUserNFTs);
    }
  }, [dataUserNFTs]);

  const getUserNFTs = userNFTs.toString();

  const user = session && session.user && session.user.name ? session.user.name : "null";
  const avatar = session && session.user && session.user.image ? session.user.image : "null";

  // Confirm ownership Function
  const { config } = usePrepareContractWrite({
    ...nenupharContract,
    functionName: 'registerUser',
    args: [user, avatar, getUserNFTs]
  });
  const { data, write: Confirm, isSuccess: isSuccessM } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Read users
  const { data: usersData } = useContractRead({
    ...nenupharContract, // Reemplaza "tuContrato.abi" con la ABI de tu contrato
    functionName: "getUsers",
  });

  function eFrogIdToString(eFrogId) {
    return eFrogId.toString();
  }


  return (
    <>
      <div class="padded-boxes">
        <section>
          <h3 class="heading">1. Connect your wallet </h3>
          <div class="padded">
            {!isConnected && (
              <>
                <button className="ConnectButton" onClick={() => open()}>Connect Wallet</button>
              </>
            )}
            {isConnected && (
              <>
                <button className="ConnectButton" onClick={() => open()}>Log out</button>


                <p>Your NFTs:</p>

                {getUserNFTs == 0 ? (
                  <>
                    <br></br>
                    <p>Sorry, you do not have any NFT available.</p>
                    <br></br>
                    <p>Use the <a href="faucet" className="blueColor">faucet</a> to get one</p>
                    <br></br>
                  </>
                ) : (
                  <>
                    <div className="userInfo">
                      <img src={"https://bafybeiaqsxxudfwl6knsu7mnnhcb4pwou2g5cjhsjmaew3ah7l3wkog53q.ipfs.nftstorage.link/" + getUserNFTs + ".webp"} alt="Descripción de la imagen" />
                      <p>Ethereum Frogs #{getUserNFTs}</p>
                    </div>
                  </>)}



              </>
            )}
          </div>
        </section>
        <section>
          <h3 class="heading">2. Connect your twitter</h3>
          <div class="padded">
            {!session && (
              <>
                <button className="ConnectButton" onClick={() => popupCenter("/google-signin", "Sample Sign In")} >
                  Sign In with twitter
                </button>
              </>
            )}

            {session && (
              <>

                <button className="ConnectButton" onClick={() => signOut()}>Log out</button>
                <p>Connected account:</p>
                <div className="userInfo">
                  <img src={session.user.image} alt="User Image" />
                  <p> @{session.user.name} <br /></p>
                </div>


              </>
            )}
          </div>
        </section>
        <section>
          <h3 class="heading">3. Verify your ownership!</h3>
          <div class="padded">
            <button className="ConnectButton" onClick={() => Confirm?.()}>Confirm in wallet</button>
            {isSuccess && (
              <p>

                Transaction confirmed! <br></br><br></br>

                <a className="blueColor" target="_blank" href={`https://sepolia.lineascan.build/tx/${data?.hash}`}>Check in explorer</a>

              </p>
            )}
          </div>
        </section>
      </div>

      <div className='ShowSection'>
        {usersData && usersData[0].map((userAddress, index) => (
          <div key={index} className='cardNFT'>
            <div className="userInfoNFT">
              <img src={"https://bafybeiaqsxxudfwl6knsu7mnnhcb4pwou2g5cjhsjmaew3ah7l3wkog53q.ipfs.nftstorage.link/" + eFrogIdToString(usersData[3][index]) + ".webp"} alt="" />
              <h3>Ethereum Frogs #{eFrogIdToString(usersData[3][index])}</h3>
            </div>
            <div className="userInfoSocial">
              <p>Owner by</p>
              <img src={usersData[2][index]} />
              <a href={`https://twitter.com/${usersData[1][index]}`} target="_blank" className="blueColor">@{usersData[1][index]}</a>
            </div>

          </div>
        ))}
      </div>




    </>
  );
}