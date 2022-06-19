import {environment} from "./environments/environment";
import axios from "axios";
import {providerData} from "./data";
import * as readline from 'readline';
import * as fs from 'fs';
import {
  EditProviderInfoBody, ProviderProfile,
  ProviderProfileSection,
  RegisterProviderRequestBody,
  SectionType,
  Performance
} from "@ull/api-interfaces";
import FormData from "form-data";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu(){
  rl.question(
    "Please select the script you wish to run :\n" +
    "\t1. Initialize provider (web) database with dummy data\n" +
    "\t2. Initialize customer (mobile app) database with dummy data\n",
    (result) => {
      const choice = Number.parseInt(result, 10);
      switch (choice){
        case 1:
          initProviderDatabase();
          break;
        case 2:
          initCustomerDatabase().then();
          break;
        default:
          console.log("Invalid input, please enter a valid option.");
          menu();
      }
    }
  );
}
menu()

/**
 * Uploads each provider profile from ./data.providerData
 */
function initProviderDatabase() : void {
  // Handle each profile independently in parallel
  providerData.forEach(profile => handleProvider(profile));
}

/**
 * Uploads a provider to the backend.
 *
 * 1. Registers the provider
 * 2. Logins to get the token
 * 3. Sets the provider's company information
 * 4. Adds all the sections to the provider's profile
 * 5. Adds all the performances to the sections
 * @param providerData
 */
async function handleProvider(providerData) : Promise<void> {
  try {
    await registerProvider(providerData.register);
  } catch (e) {
    console.error(`An error occured while registering the user ${providerData.company_info.company_name} : ${e}`);
    return;
  }
  console.log(`Registered user ${providerData.company_info.company_name}`);

  const userToken = await loginProvider(providerData.register);
  if(userToken){
    console.log(`Logged in user ${providerData.company_info.company_name} with token : '${userToken}'`);

    setProviderInfos(userToken, providerData.company_info, providerData.profile_picture, providerData.cover_picture);
    setProviderCategorization(userToken, providerData.category, providerData.tags);
    setProviderServices(userToken, providerData.profile_content);
  } else {
    console.error(`Couldn't login user ${providerData.company_info.company_name}`);
  }
}

/**
 * Register the provider with the given information
 * @param body
 */
function registerProvider(body: RegisterProviderRequestBody) : Promise<void> {
  return axios.post(environment.baseServerURL + environment.providerServiceURL + '/register', body);
}

/**
 * Logins the user and returns a Promise that resolves with the access token
 * @param body
 */
function loginProvider(body: RegisterProviderRequestBody) : Promise<string> {
  try {
    return axios.post(environment.baseServerURL + environment.authenticationServiceURL + '/login', {
      email: body.email,
      password: body.password
    });
  } catch (e) {
    console.error(`Error while logging in user : ${e}`);
    return new Promise(resolve => resolve(""));
  }
}

/**
 * Sets all the provided provider information, as well as the given pictures
 *
 * Fetches the pictures from disk with fs.readFileSync() to get a Buffer compatible with FormData
 * @param userToken
 * @param newInfo
 * @param profilePicture
 * @param coverPicture
 */
async function setProviderInfos(userToken: string, newInfo: EditProviderInfoBody, profilePicture: string, coverPicture: string) : Promise<void> {
  try {
    // Not the real FormData from the browser, but a polyfill library for node
    const formData = new FormData();
    formData.append('company_name', newInfo.company_name);
    formData.append('company_description', newInfo.company_description);
    formData.append('email', newInfo.email);
    formData.append('phone', newInfo.phone);
    formData.append('area_served', newInfo.area_served);
    formData.append('address_number', newInfo.address.number);
    formData.append('address_street', newInfo.address.street);
    formData.append('address_city', newInfo.address.city);
    formData.append('address_postal_code', newInfo.address.postal_code);

    if (newInfo.address.complement) {
      formData.append('address_complement', newInfo.address.complement);
    }

    // This FormData accepts buffers for files instead of requiring a Blob which doesn't exist in node
    formData.append('profile_picture', fs.readFileSync(profilePicture));
    formData.append('cover_picture', fs.readFileSync(coverPicture));

    // Specify that the content is of type form-data
    const config = {headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${userToken}`}};

    await axios.post(environment.baseServerURL + environment.providerServiceURL + '/profile', formData, config);

    console.log(`Set infos for user ${newInfo.company_name} (token : ${userToken})`);
  } catch (e) {
    console.error(`Couldn't set infos for user ${newInfo.company_name} (token : ${userToken}) : ${e}`);
  }
}

/**
 * Sets the provider's category and tags to be the ones given as arguments
 * @param userToken
 * @param category
 * @param tags
 */
async function setProviderCategorization(userToken: string, category: string, tags: string[]) : Promise<void> {
  try {
    const config = { headers: { 'Authorization' : `Bearer ${userToken}` } };

    await axios.put(environment.baseServerURL + environment.discoveryServiceURL + '/provider_category', {name: category}, config);
    await axios.put(environment.baseServerURL + environment.discoveryServiceURL + '/provider_tags', tags, config);

    console.log(`Set category and tags for user ${userToken}`);
  } catch (e) {
    console.error(`Couldn't set category and tags for user ${userToken} : ${e}`);
  }
}

/**
 * Adds all the sections and performances to the user profile.
 *
 * 1. It adds all the sections in order, but doesn't fill them at first.
 * 2. Then, it fetches the user's profile from the server to get the sections ids. This is needed as we do not know
 *    what those ids will be before the backend creates the sections, but we need the ids to add the performances.
 * 3. It goes through both lists in order, this way it has both the information about the content of the section
 *    and its id. In the loop, it delegates to addPerformancesToSection() to do the actual work of adding all the
 *    performances in order.
 * @param userToken
 * @param sections
 */
async function setProviderServices(userToken: string, sections: ProviderProfileSection[]) : Promise<void> {
  /**
   * Parses the provider's access token to extract its id
   * @param token
   */
  function getProviderId(token: string) : string {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))
    return parsedToken.sub || parsedToken.id;
  }

  try {
    // 1. Post the sections in the order they come in
    for(const section of sections){
      const config = { headers: { 'Content-Type': 'multipart/form-data', 'Authorization' : `Bearer ${userToken}` } };

      const data = new FormData();
      data.append('type', section.type);
      data.append('section_title', section.section_title);
      data.append('section_description', section.section_description || " ");
      data.append('purchasable', section.purchasable.toString());

      if (section.type === SectionType.small) {
        data.append('preview_amount', JSON.stringify(section.preview_amount));
      }

      if (section.type === SectionType.big) {
        for (const picture of section.pictures || []) {
          // Append all the files to the same name to create an array
          data.append('pictures', fs.readFileSync(picture));
        }
      }

      // Very important await to make sure every addition is sequential
      await axios.post(environment.baseServerURL + environment.providerServiceURL + '/section', data, config);
    }

    // 2. Fetch the user's profile
    const config = { headers: { 'Authorization' : `Bearer ${userToken}` } };
    const profile : ProviderProfile = await axios.get(environment.baseServerURL + environment.providerServiceURL + '/profile/' + getProviderId(userToken), config);
    const profileSections : ProviderProfileSection[] = profile.services;

    // 3. Run through both lists in order and add the relevant performances sequentially
    for(let i = 0; i < profileSections.length; i++){
      // The appending to sections is paralellized though as only the order of addition inside a section matter
      // Therefore, no await here
      addPerformancesToSection(userToken, profileSections[i].id_section, sections[i].content);
    }

    console.log(`Set profile sections and performances for user ${userToken}`);
  } catch (e) {
    console.error(`Couldn't set profile sections and performances for user ${userToken} : ${e}`);
  }
}

/**
 * Adds the given list of performances to the section with the given id. It respects the order.
 * @param userToken
 * @param sectionId
 * @param performances
 */
async function addPerformancesToSection(userToken: string, sectionId: string, performances: Performance[]) : Promise<void> {
  /*
   No try-catch here to let errors propagate to caller, in an attempt to cancel the process if an error occurs
   */

  // Add every performance in order
  const config = { headers: { 'Content-Type': 'multipart/form-data', 'Authorization' : `Bearer ${userToken}` } };
  for(const performance of performances){
    const data = new FormData();
    data.append('performance_title', performance.performance_title);
    data.append('performance_description', performance.performance_description);
    data.append('performance_picture', fs.readFileSync(performance.picture));
    data.append('price_value', JSON.stringify(performance.price.value));
    data.append('price_unit', performance.price.unit);
    data.append('id_section', sectionId);

    // Very important await to ensure sequentiality
    await axios.post(environment.baseServerURL + environment.providerServiceURL + '/performance', data, config)
  }
}










async function initCustomerDatabase() : Promise<void> {

}
