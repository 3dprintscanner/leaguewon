import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { WinstonLogger } from '@imtbl/imlogging';
import { ImmutableXClient } from '@imtbl/imx-sdk';

import env from './_client';
import { loggerConfig } from '../config/logging';

const provider = new AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_API_KEY);
// const log = new WinstonLogger(loggerConfig);

const component = '[IMX-CREATE-PROJECT]';

const doWork = async (gameName, company) => {
  const privateKey = process.env.OWNER_ACCOUNT_PRIVATE_KEY;

  const signer = new Wallet(privateKey).connect(provider);

  const user = await ImmutableXClient.build({
    ...env.client,
    signer,
    enableDebug: true,
  });

//   log.info(component, 'Creating project...');

  /**
   * Edit your values here
   */
  const params = {
    name: gameName,
    company_name: company,
    contact_email: 'mogglin@gmail.com',
  };

  let project;
  try {
    project = await user.createProject(params);
    console.log(project);
    return project;
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }

//   log.info(component, `Created project with ID: ${project.id}`);
}

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    console.log('body', req.body)

    const body = req.body

    if(!(body && body.name && body.company)){
        res.status(400).send({ message: 'Missing request fields' })
        return
    }

    let makeContract;

    try {
        makeContract = await doWork(body.name, body.company)
        console.log(makeContract)
        res.json(makeContract);
    }catch(error){
        throw new Error(JSON.stringify(error, null, 2));
    }

    
}