import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
    let Counter: any;
    let counter: any;

    beforeEach(async function () {
        Counter = await ethers.getContractFactory("Counter");
        counter = await Counter.deploy('My Counter' , 1);
    });


    it("Should return the new counter value after increment", async function () {
       await counter.increment();
         expect(await counter.getCount()).to.equal(2);
    });
    it("Should return the new counter value after decrement", async function () {
        await counter.decrement();
        expect(await counter.getCount()).to.equal(0);
    })

    it("Should return new Name after setName", async function () {
        await counter.setName("Dimanche");
        expect(await counter.getName()).to.equal("Dimanche");
    })
        
});
