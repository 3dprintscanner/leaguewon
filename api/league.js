import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { WinstonLogger } from '@imtbl/imlogging';
import { ImmutableXClient } from '@imtbl/imx-sdk';

import env from './_client';
// import { loggerConfig } from '../config/logging';

const provider = new AlchemyProvider(env.ethNetwork, env.alchemyApiKey);
// const log = new WinstonLogger(loggerConfig);

const component = '[IMX-CREATE-COLLECTION]';

const createCollection = async (projectId, leagueName, leagueDescription) => {
  const privateKey = process.env.OWNER_ACCOUNT_PRIVATE_KEY;
  const collectionContractAddress = process.env.
    COLLECTION_CONTRACT_ADDRESS;

  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);
  const ownerPublicKey = wallet.publicKey;

  const user = await ImmutableXClient.build({
    ...env.client,
    signer,
    enableDebug: true,
  });

//   log.info(component, 'Creating collection...', collectionContractAddress);

  /**
   * Edit your values here
   */
  const params = {
    name: leagueName,
    description: leagueDescription,
    contract_address: collectionContractAddress,
    owner_public_key: ownerPublicKey,
    icon_url: 'https://leaguewon.vercel.app/leaguewon_basic.png',
    metadata_api_url: `https://leaguewon.vercel.app/api/metadata/${projectId}`,
    collection_image_url: 'https://leaguewon.vercel.app/leaguewon_basic.png',
    project_id: parseInt(projectId, 10),
  };
  console.log(params)

  let collection;
  try {
    collection = await user.createCollection(params);
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }

//   log.info(component, 'Created collection');
  return collection;
}




export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const body = req.body

    if(!(body.project_id && body.name && body.description)){
        res.status(422).send({ message: 'Input fields incorrect' })
        return
    }

    try {
        const collection = await createCollection(body.project_id, body.name, body.description);
        console.log(collection, "collection")
        res.json(collection);
    }catch(error){
        console.log(error)
        throw new Error(JSON.stringify(error, null, 2));
    }

}