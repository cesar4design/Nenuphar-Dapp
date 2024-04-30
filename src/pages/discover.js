import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

import System_ABI from "../pages/abi/nenuphar_abi.json";

export default function Home() {
    // Contracts
    const [nenupharContract, setNenupharContract] = useState({ address: '0xfB841de94010ae0818fb681A0f3415bA76052a50', abi: System_ABI });

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
            <div className="textSection">
                <h2> <span className="rainbowText">Discover & meet</span>  new community users!</h2>
            </div>


            <div className='ShowSection'>
                {usersData && usersData[0].map((userAddress, index) => (
                    <div key={index} className='cardNFT'>
                        <div className="userInfoNFT">
                            <img src={"https://bafybeiaqsxxudfwl6knsu7mnnhcb4pwou2g5cjhsjmaew3ah7l3wkog53q.ipfs.nftstorage.link/" + eFrogIdToString(usersData[3][index]) + ".webp"} alt="" />
                            <h3>Ethereum Frogs #{eFrogIdToString(usersData[3][index])}</h3>
                        </div>
                        <div className="userInfoSocial">
                            <p>Owned by</p>
                            <img src={usersData[2][index]} />
                            <a href={`https://twitter.com/${usersData[1][index]}`} target="_blank" className="blueColor">@{usersData[1][index]}</a>
                        </div>

                    </div>
                ))}
            </div>




        </>
    );
}