export const buildAuthLink = (clientId: string, redirectUrl: string = 'https://blackboxquant.com/') => {
    return `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=account:write%20trading`
}   