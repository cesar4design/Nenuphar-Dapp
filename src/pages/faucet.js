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

    // Mint Function
    const { config } = usePrepareContractWrite({
        ...EFrogsContract,
        functionName: 'safeMint',
        args: [address]
    });
    const { data, write: Mint, isSuccess: isSuccessM } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    // Get minted
    const [isMinted, setIsMinted] = React.useState(0n);

    const { data: dataIsMinted } = useContractRead({
        ...EFrogsContract,
        functionName: 'addressMinted',
        watch: true,
        args: [address]
    });

    React.useEffect(() => {
        if (dataIsMinted) {
            setIsMinted(dataIsMinted);
        }
    }, [dataIsMinted]);


    const walletMinted = isMinted.toString();

    return (
        <>
            <div className="textSection">
                <h2> <span className="rainbowText">Claim NFT</span> to test the dapp</h2>
            </div>

            <div class="padded-boxes">
                <section>
                    <h3 class="heading">eFrogs NFT testnet faucet</h3>
                    <div class="padded">
                        {!isConnected && (
                            <>
                                <button className="ConnectButton" onClick={() => open()}>Connect Wallet</button>
                            </>
                        )}
                        {isConnected && (
                            <>
                                <button className="ConnectButton" onClick={() => open()}>Log out</button>

                                <div> {walletMinted == "true" && (<button className="ConnectButton"> Already claimed </button>)} </div>

                                <div> {walletMinted == ! "true" && (<button onClick={() => Mint?.()} className="ConnectButton"> {isLoading ? 'Claimed!' : 'Claim NFT'} </button>)} </div>



                            </>
                        )}
                    </div>
                </section>

            </div>





        </>
    );
}