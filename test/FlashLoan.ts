import { expect } from "chai";
import { ethers } from "hardhat";


const tokens = (n: number) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}
describe("FlashLoan", function () {
    let FlashLoan: any;
    let FlashLoanReceiver: any;
    let Token: any;
    let token: any;
    let flashLoan: any;
    let flashLoanReceiver: any;
    let accounts: any;
    let deployer: any;
    beforeEach(async () => {
        // Setup account 
        accounts = await ethers.getSigners();
        deployer = accounts[0];


        FlashLoan = await ethers.getContractFactory("FlashLoan");
        FlashLoanReceiver = await ethers.getContractFactory("FlashLoanReceiver");
        Token = await ethers.getContractFactory("Token");

        // deploy flashLoan
        token = await Token.deploy("Token", "TKN", "1000000");

        flashLoan = await FlashLoan.deploy(token.address);

        const transaction = await token.connect(deployer).approve(flashLoan.address, tokens(1000000));
        await transaction.wait();

        const transaction2 = await flashLoan.connect(deployer).depositTokens(tokens(1000000));
        await transaction2.wait();

        // deploy flashLoanReceiver
        flashLoanReceiver = await FlashLoanReceiver.deploy(flashLoan.address);


    })


    describe("Deployment", function () {
        it("send tokens to flashloan", async function () {
            expect(await token.balanceOf(flashLoan.address)).to.equal(tokens(1000000));
        })
    })

    describe("Borrowing", function () {
        it("Should borrow tokens", async function () {
            let amount = tokens(100);
            const transaction = await flashLoanReceiver.connect(deployer).executeFlashLoan(amount);
            await transaction.wait();

            await expect(transaction).to.emit(flashLoanReceiver, "LoanReceived").withArgs(token.address, amount);
        })
    })
});