import { createPublicClient, EIP1193Provider, PublicClient, http } from "viem";
import { getEntryPoint, KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { getKernelAddressFromECDSA, signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createKernelAccount } from "@zerodev/sdk/accounts";
import { chain, rpc } from "@/web3/config";

const publicClient = createPublicClient({
  chain,
  transport: http(rpc),
}) as PublicClient;
const entryPoint = getEntryPoint("0.7");
const kernelVersion = KERNEL_V3_1;

export async function getSmartAccountAddress(address: `0x${string}`, index: bigint = BigInt(0)) {
  const kernelAddress = await getKernelAddressFromECDSA({
    publicClient,
    entryPoint,
    kernelVersion,
    eoaAddress: address,
    index,
  });
  return kernelAddress;
}

export async function createSmartAccount(provider: EIP1193Provider, index: bigint = BigInt(0)) {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: provider,
    entryPoint,
    kernelVersion,
  });

  const kernelAccount = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint,
    kernelVersion,
    index,
  });

  return kernelAccount;
}
