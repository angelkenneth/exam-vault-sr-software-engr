import { isDockerNetwork } from '@/lib/shared/network/is-docker-network';

// TODO convert this to service discovery
export enum MxOrigin {
  authBe = `http://localhost:3001`,
  authFe = 'http://localhost:5001',
  contactBe = 'http://localhost:3002',
  contactFe = 'http://localhost:5002',
}

const mxDockerNetworkOriginMap: Partial<Record<MxOrigin, string>> = {
  [MxOrigin.authBe]: 'http://auth-be-mx:3001',
};

// TODO rethink this
export const getOriginFromMx = (mx: MxOrigin): string => {
  if (isDockerNetwork()) {
    return mxDockerNetworkOriginMap[mx] || mx as string;
  }
  return mx as string;
};
