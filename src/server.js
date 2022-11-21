const express = require('express');
const app = express()
const cors = require('cors')
const port = 3001
const { CasperClient, Contracts, RuntimeArgs, CLValueBuilder, CLPublicKey, DeployUtil } = require('casper-js-sdk')

app.use(express.json())
app.use(cors())

const client = new CasperClient("http://3.208.91.63:7777/rpc")
const contract = new Contracts.Contract(client)

contract.setContractHash("hash-f8e1006c69d4060d2aec149a082f57224d9b48f363280cf176c9d1a2bf2f36a9")

app.post('/update_msg', async (req, res) => {
    try {
        const deploy = DeployUtil.deployFromJson(req.body).unwrap()
        const deployHash = await client.putDeploy(deploy)
        res.send(deployHash)
    } catch(error) {
        res.status(400).send(error.message)
    }
})

app.get('/query_msg', async(req, res) => {
    return res.send(await contract.queryContractData(["message"]))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})