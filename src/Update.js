import { Signer, Contracts, RuntimeArgs, CLPublicKey, DeployUtil, CLValueBuilder } from 'casper-js-sdk';
import axios from 'axios';

function Update(props) {
var disabled = true;
if (props.publicKey != null) {
    disabled = false;
}

  return (
    <div>
        <input type="text"/>
        <button disabled={disabled} onClick={() => sendUpdate(props.publicKey)}>Update Message</button>
    </div>
  );
}

async function sendUpdate(publicKey) {
    const contract = new Contracts.Contract();
    contract.setContractHash("hash-f8e1006c69d4060d2aec149a082f57224d9b48f363280cf176c9d1a2bf2f36a9");
    const value = document.querySelector("input[type=text]").value;
    const deploy = contract.callEntrypoint(
        "update_msg",
        RuntimeArgs.fromMap({
            "message": CLValueBuilder.string(value)
        }),
        CLPublicKey.fromHex(publicKey),
        "casper-test",
        "1000000000"
    );
    const jsonDeploy = DeployUtil.deployToJson(deploy);
    try {
        const signedDeploy = await Signer.sign(jsonDeploy, publicKey);
        const response = await axios.post("http://localhost:3001/update_msg", signedDeploy, { headers: { 'Content-Type': 'application/json' }});
        alert(response.data)
    } catch(error) {
        alert(error.message);
    }
}

export default Update;