export const buildAuthLink = (clientId: string, redirectUrl: string = 'https%3A%2F%2Fblackboxquant.com.com%2Ftrading-algorithms') => {
    return `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=account:write%20trading`
}