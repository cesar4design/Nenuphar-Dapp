
import React, { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {

    return (
        <>

            <div className="background">
                <img className="bg-left" src="Bg-left.png" alt="" />
                <img className="bg-right" src="Bg-rigth.png" alt="" />
            </div>

            <section className="homeSection">
                <div className="topHome">
                    <img class="logo" src="Logo.png" alt="" />
                    <p>Discover and connect with other social frogs!</p>
                    <Link href="discover" className="discoverButton" >Discover</Link>
                </div>
                <div className="bottomHome">


                    <div>
                        <h3>About</h3>
                        <p>
                            Based on the principles and primary utility of a PFP collection: the community.
                            In addition to the ideas provided by the community aimed at rapid and fair expansion on social networks.
                            I designed and developed Nenuphar, the first dapp connecting the web3 community with the most popular traditional social networks.
                        </p>
                    </div>
                    <div>
                        <h3>Designed and developed for The Linea Dev Cook-Off: April 2024</h3>
                        <p>
                            As a pilot test and for the participation of the Linea hackahton, I have created a user verification system for the eFrogs collection and their Twitter profiles.
                            Designed and developed by <a target="_blank" href="https://linktr.ee/itsCesar" className="blueColor">cesar4design</a> , from scratch during the month of April.
                            The dapp is developed in Next.js, it includes partner tooling such as Wagmi for the interaction with the smart contract and Wallet connect for the connection to the site.
                            Auth.js is also used for the verification of social networks. You can find the repo <a target="_blank" href="https://github.com/cesar4design/Nenuphar-Dapp" className="blueColor">here.</a> 
                        </p>
                    </div>
                    <div>
                        <h3>What next? Use cases!</h3>
                        <p>
                            Add new projects and social networks available for registration.
                            Create engagament competitions, create sweepstakes, missions, all fully transparent with verified social and holders.
                            Possibility to send nfts or tokens using the social network nameuser as the recipient?!
                        </p>
                    </div>

                </div>

            </section>

        </>
    );
}