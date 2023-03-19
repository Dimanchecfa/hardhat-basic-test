import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
    let Counter: any;
    let counter: any;

    this.beforeEach(async function () {
        this.Counter = await ethers.getContractFactory("Counter");
        this.counter = await this.Counter.deploy('My Counter' , 1);
    });


    it("Should return the new counter value after increment", async function () {
       await this.counter.increment();
         expect(await this.counter.getCount()).to.equal(2);
    });
    it("Should return the new counter value after decrement", async function () {
        await this.counter.decrement();
        expect(await this.counter.getCount()).to.equal(0);
    })

    it("Should return new Name after setName", async function () {
        await this.counter.setName("Dimanche");
        expect(await this.counter.getName()).to.equal("Dimanche");
    })
        
});
