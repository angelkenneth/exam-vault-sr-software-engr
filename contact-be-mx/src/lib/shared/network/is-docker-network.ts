export const isDockerNetwork = () => process.env.DOCKER_NETWORK?.toLowerCase() === 'true';
