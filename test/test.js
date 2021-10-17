const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Our Demo Token", function () {

  let demoToken;
  let owner;
  let address1;
  let address2;

  beforeEach(async function () {
    const DemoToken = await ethers.getContractFactory("DemoToken");
    demoToken = await DemoToken.deploy();
    await demoToken.deployed();

    [owner, address1, address2] = await ethers.getSigners()

  })
  it("Should successfully deploy", async function () {
    console.log("success!")
  });
  it("Should be deployed using 1m of tokens for the owner of the contract", async function () {

    const balance = await demoToken.balanceOf(owner.address)
    expect(ethers.utils.formatEther(balance) == 1000000)
  });
  it("Should let you lend tokens to another account", async function () {
    const decimals = await demoToken.decimals()
    await demoToken.transfer(address1.address, ethers.utils.parseEther("100"))
    expect(await demoToken.balanceOf(address1.address)).to.equal(ethers.utils.parseEther("100"))
  });
  it("Should give you permission to another account to send on your behalf", async function () {
    await demoToken.connect(address1).approve(owner.address, ethers.utils.parseEther("1000"))
    await demoToken.transfer(address1.address, ethers.utils.parseEther("1000"))
    await demoToken.transferFrom(address1.address, address2.address, ethers.utils.parseEther("1000"))
    expect(await demoToken.balanceOf(address2.address)).to.equal(ethers.utils.parseEther("1000"))
    expect(await demoToken.balanceOf(address1.address)).to.equal(ethers.utils.parseEther("0"))
  })
});
