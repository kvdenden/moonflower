import { createPublicClient, EIP1193Provider, PublicClient, http } from "viem";
import { getEntryPoint, KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { getKernelAddressFromECDSA, signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { addressToEmptyAccount, createKernelAccount } from "@zerodev/sdk/accounts";
import { serializePermissionAccount, toPermissionValidator } from "@zerodev/permissions";
import { toECDSASigner } from "@zerodev/permissions/signers";

import { chain, rpc } from "@/web3/config";
import { toSudoPolicy } from "@zerodev/permissions/policies";

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

export async function approveSessionKey(address: `0x${string}`, provider: EIP1193Provider, index: bigint = BigInt(0)) {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: provider,
    entryPoint,
    kernelVersion,
  });

  const sessionKeySigner = await toECDSASigner({
    signer: addressToEmptyAccount(address),
  });

  const sudoPolicy = await toSudoPolicy({});

  const permissionPlugin = await toPermissionValidator(publicClient, {
    entryPoint,
    kernelVersion,
    signer: sessionKeySigner,
    policies: [sudoPolicy],
  });

  const kernelAccount = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
      regular: permissionPlugin,
    },
    entryPoint,
    kernelVersion,
    index,
  });

  const approval = await serializePermissionAccount(kernelAccount);

  return approval;
}
