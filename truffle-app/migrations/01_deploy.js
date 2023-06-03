const Instagram = artifacts.require('Instagram')

module.exports = async function (deployer) {
    await deployer.deploy(Instagram)
}