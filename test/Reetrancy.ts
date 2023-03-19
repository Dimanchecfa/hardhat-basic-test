import { expect } from "chai";
import { ethers } from "hardhat";


const tokens = (n: number) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe("Bank", function () {
    let deployer: (object | any)
    let user: (object | any)
    let bank: (object | any)
    let Bank: (object | any)
    let Attacker : (object | any)
    let attacker : (object | any)
    let attackerContract : (object | any)
    this.beforeEach(async () => {
        Bank = await ethers.getContractFactory("Bank");
        bank = await Bank.deploy();
        Attacker = await ethers.getContractFactory("Attacker" , attacker);
        attackerContract = await Attacker.deploy(bank.address);
        [deployer , user , attacker] = await ethers.getSigners();
        await bank.deposit({ value: ethers.utils.parseEther("100.0") });
        await bank.connect(user).deposit({ value: ethers.utils.parseEther("50.0") });
    });

    describe("facilitates deposits and withdrawals", () => {
        it("accepts deposits", async () => {
            const deployerBalance = await bank.balanceOf(deployer.address);
            expect(deployerBalance).to.equal(ethers.utils.parseEther("100.0"));

            const userBalance = await bank.balanceOf(user.address);
            expect(userBalance).to.equal(ethers.utils.parseEther("50.0"));
        });

        it("allows withdrawals", async () => {
            await bank.withdraw();
            const deployerBalance = await bank.balanceOf(deployer.address);
            const userBalance = await bank.balanceOf(user.address);
            expect(deployerBalance).to.equal(ethers.utils.parseEther("0"));
           
            expect(userBalance).to.equal(ethers.utils.parseEther("50.0"));
        });

        it("allows attackers to withdraw", async () => {
            console.log('**before**');
            console.log("Bank balance: " +  ethers.utils.formatEther(await ethers.provider.getBalance(bank.address)));
            console.log("Attacker balance: " +  ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)));

            // Perform the attack
            await attackerContract.attack({value: ethers.utils.parseEther("10")});

            console.log('**After**');
            console.log("Bank balance: " +  ethers.utils.formatEther(await ethers.provider.getBalance(bank.address)));
            console.log("Attacker balance: " +  ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)));
            

            expect(await ethers.provider.getBalance(bank.address)).to.equal(ethers.utils.parseEther("0"));

        });


    })
});