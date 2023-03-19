import { expect } from "chai";
import { ethers } from "hardhat";


const tokens = (n: any) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}




describe("RealEstate", function () {
    let realEstate: any;
    let deployer: any;
    let nftId = 1;
    let escrow: any;
    let seller: any;
    let lender: any;
    let inspector: any;

    let accounts, buyer: any;

    beforeEach(async function () {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        seller = deployer;
        buyer = accounts[1];
        lender = accounts[3];
        inspector = accounts[2];




        const RealEstate = await ethers.getContractFactory("RealEstate");
        realEstate = await RealEstate.deploy();
        const Escrow = await ethers.getContractFactory("Escrow");
        // escrow = await Escrow.deploy(
        //     realEstate.address,
        //     nftId,
        //     tokens(100),
        //     tokens(20),
        //     seller.address,
        //     buyer.address,
        //     lender.address,
        //     inspector.address
        // );
        // let transaction = await realEstate.connect(seller).approve(escrow.address, nftId);
        // await transaction.wait();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await realEstate.ownerOf(nftId)).to.equal(deployer.address);
        });
    });

    describe("Selling RealEstate", () => {
        it("Execute a succefull sale", async () => {
            expect(await realEstate.ownerOf(nftId)).to.equal(seller.address);
            // let transaction = await escrow.connect(buyer).finalizeSale();
            // await transaction.wait();
        })
    })

})