import Store from 'electron-store';
import fetch from 'node-fetch';
import Errors from '../common/Errors';
//// "https://cdn.jsdelivr.net/gh/OhMyGuus/BetterCrewlink-Offsets@main/"; // "https://raw.githubusercontent.com/OhMyGuus/BetterCrewlink-Offsets/main"
const BASE_URL = "https://raw.githubusercontent.com/OhMyGuus/BetterCrewlink-Offsets/main";
const BASE_URL_error = "https://cdn.jsdelivr.net/gh/OhMyGuus/BetterCrewlink-Offsets@main";
const store = new Store({ name: "offsets" });
const lookupStore = new Store({ name: "lookup" });
async function fetchOffsetLookupJson(error = false) {
    const url = error ? BASE_URL_error : BASE_URL;
    return fetch(`${url}/lookup.json`)
        .then((response) => response.json())
        .then((data) => { return data; })
        .catch((_) => {
        if (!error) {
            return fetchOffsetLookupJson(true);
        }
        else {
            throw Errors.LOOKUP_FETCH_ERROR;
        }
    });
}
export async function fetchOffsetLookup() {
    try {
        const lookups = await fetchOffsetLookupJson();
        lookupStore.set(lookups);
        return lookups;
    }
    catch (_a) {
        // Check if cache file has never been generated
        if (!lookupStore.get('patterns'))
            throw Errors.LOOKUP_FETCH_ERROR;
        return lookupStore.store;
    }
}
async function fetchOffsetsJson(is_64bit, filename, error = false) {
    const url = error ? BASE_URL_error : BASE_URL;
    const OFFSETS_URL = `${url}/offsets`;
    return fetch(`${OFFSETS_URL}/${is_64bit ? 'x64' : 'x86'}/${filename}`)
        .then((response) => response.json())
        .then((data) => { return data; })
        .catch((_) => {
        if (!error) {
            return fetchOffsetsJson(is_64bit, filename, true);
        }
        else {
            throw Errors.OFFSETS_FETCH_ERROR;
        }
    });
}
export async function fetchOffsets(is_64bit, filename, offsetsVersion) {
    // offsetsVersion in case we need to update people's cached file
    // >= version to allow testing with local file updates (eg remote vers 2, local vers 3)
    // no need to host local http server
    if (store.get('filename') == filename && store.get('is_64bit') == is_64bit && store.get('offsetsVersion') >= offsetsVersion) {
        console.log("Loading cached offsets");
        return store.get('IOffsets');
    }
    const offsets = await fetchOffsetsJson(is_64bit, filename);
    store.set('filename', filename);
    store.set('is_64bit', is_64bit);
    store.set('offsetsVersion', offsetsVersion ? offsetsVersion : 0);
    store.set('IOffsets', offsets);
    return offsets;
}
//# sourceMappingURL=offsetStore.js.map