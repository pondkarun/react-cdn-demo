import env from '../env'
import devStieAllkons from './devAK'
import uatStieAllkons from './uatAK'

console.log("env file", env.REACT_APP_START_PROJECT);
console.log("env version", env.REACT_APP_VERSION);

const _config = {
    development_allkons: { ...devStieAllkons, version: env.REACT_APP_VERSION },
    uat_allkons: { ...uatStieAllkons, version: env.REACT_APP_VERSION },
}
export default Object.freeze(Object.assign({}, _config[env.REACT_APP_START_PROJECT]));