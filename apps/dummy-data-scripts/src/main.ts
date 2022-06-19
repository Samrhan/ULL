import {environment} from "./environments/environment";
import axios from "axios";
import {providerData} from "./data";
import * as fs from 'fs';
import {
  EditProviderInfoBody, ProviderProfile,
  ProviderProfileSection,
  RegisterProviderRequestBody,
  SectionType,
  Performance
} from "@ull/api-interfaces";
import FormData from "form-data";

initProviderDatabase();

/**
 * Uploads each provider profile from ./data.providerData
 */
async function initProviderDatabase() : Promise<void> {
  // Handle each profile independently in parallel
  console.log("========= Starting upload of users =========");
  await Promise.all(providerData.map(profile => handleProvider(profile)));
  console.log("========= Finished script =========");
  process.exit(0);
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
    console.error(`An error occured while registering the user '${providerData.company_info.company_name}' :`, e,'\n--------------------------------');
    return;
  }
  console.log(`Registered user '${providerData.company_info.company_name}'`,'\n--------------------------------');

  const userToken = (await loginProvider(providerData.register)).data.access_token;
  if(userToken){
    console.log(`Logged in user '${providerData.company_info.company_name}' with token : `, userToken,'\n--------------------------------');

    const promiseList = [];

    promiseList.push(setProviderInfos(userToken, providerData.company_info, providerData.profile_picture, providerData.cover_picture));
    promiseList.push(setProviderCategorization(userToken, providerData.category, providerData.tags));
    promiseList.push(setProviderServices(userToken, providerData.profile_content));

    await Promise.all(promiseList);
    console.log(`============= Finished adding user '${providerData.company_info.company_name}' to the database =============`);
  } else {
    console.error(`Couldn't login user '${providerData.company_info.company_name}'`,'\n--------------------------------');
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
function loginProvider(body: RegisterProviderRequestBody) : Promise<any> {
  try {
    return axios.post(environment.baseServerURL + environment.authenticationServiceURL + '/login', {
      email: body.email,
      password: body.password
    });
  } catch (e) {
    console.error(`Error while logging in user '${body.email}'`, e,'\n--------------------------------');
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
    // We must specify the Content-Type of the image, otherwise form-data will put the default 'application/octet-stream'
    // type which will be refused by the backend
    // Instead, we must set a type of 'image/{file extension}'
    // https://github.com/form-data/form-data#alternative-submission-methods
    formData.append('profile_picture', fs.readFileSync(__dirname + profilePicture), {
      filepath: __dirname + profilePicture,                                      // Important, don't know why
      contentType: `image/${profilePicture.split('.').at(-1)}`   // Set the Content-Type property
    })
    // We must specify the Content-Type of the image, otherwise form-data will put the default 'application/octet-stream'
    // type which will be refused by the backend
    // Instead, we must set a type of 'image/{file extension}'
    formData.append('cover_picture', fs.readFileSync(__dirname + coverPicture), {
      filepath: __dirname + coverPicture,                                      // Important, don't know why
      contentType: `image/${coverPicture.split('.').at(-1)}`   // Set the Content-Type property
    })

    // Specify that the content is of type form-data
    const config = {headers: formData.getHeaders()};
    config.headers['Authorization'] = `Bearer ${userToken}`;

    await axios.put(environment.baseServerURL + environment.providerServiceURL + '/profile', formData.getBuffer(), config);

    console.log(`Set infos for user '${newInfo.company_name}' (token : '${userToken.toString()}')`, '\n--------------------------------');
  } catch (e) {
    console.error(`Couldn't set infos for user '${newInfo.company_name}' (token : '${userToken.toString()}') : `, e, '\n--------------------------------');
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

    console.log(`Set category and tags for user '${userToken.toString()}'`, '\n--------------------------------');
  } catch (e) {
    console.error(`Couldn't set category and tags for user '${userToken.toString()}' : `, e, '\n--------------------------------');
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
          // We must specify the Content-Type of the image, otherwise form-data will put the default 'application/octet-stream'
          // type which will be refused by the backend
          // Instead, we must set a type of 'image/{file extension}'
          // https://github.com/form-data/form-data#alternative-submission-methods
          data.append('pictures', fs.readFileSync(__dirname + picture), {
            filepath: __dirname + picture,                                      // Important, don't know why
            contentType: `image/${picture.split('.').at(-1)}`   // Set the Content-Type property
          })
        }
      }

      const config = {headers: data.getHeaders()};
      config.headers['Authorization'] = `Bearer ${userToken}`;

      // Very important await to make sure every addition is sequential
      await axios.post(environment.baseServerURL + environment.providerServiceURL + '/section', data.getBuffer(), config);
    }

    // 2. Fetch the user's profile
    const config = { headers: { 'Authorization' : `Bearer ${userToken}` } };
    const profile : ProviderProfile = (await axios.get(environment.baseServerURL + environment.providerServiceURL + '/profile/' + getProviderId(userToken), config)).data;
    const profileSections : ProviderProfileSection[] = profile.services;

    const promiseList = [];
    // 3. Run through both lists in order and add the relevant performances sequentially
    for(let i = 0; i < profileSections.length; i++){
      // The appending to sections is paralellized though as only the order of addition inside a section matter
      // Therefore, no await here
      promiseList.push(addPerformancesToSection(userToken, profileSections[i].id_section, sections[i].content));
    }

    await Promise.all(promiseList);
    console.log(`Set profile sections and performances for user '${userToken.toString()}'`, '\n--------------------------------');
  } catch (e) {
    console.error(`Couldn't set profile sections and performances for user '${userToken.toString()}' : `, e, '\n--------------------------------');
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
  for(const performance of performances){
    const data = new FormData();
    data.append('performance_title', performance.performance_title);
    data.append('performance_description', performance.performance_description);
    // We must specify the Content-Type of the image, otherwise form-data will put the default 'application/octet-stream'
    // type which will be refused by the backend
    // Instead, we must set a type of 'image/{file extension}'
    // https://github.com/form-data/form-data#alternative-submission-methods
    data.append('performance_picture', fs.readFileSync(__dirname + performance.picture), {
      filepath: __dirname + performance.picture,                                      // Important, don't know why
      contentType: `image/${performance.picture.split('.').at(-1)}`   // Set the Content-Type property
    })
    data.append('price_value', JSON.stringify(performance.price.value));
    data.append('price_unit', performance.price.unit);
    data.append('id_section', sectionId);

    const config = {headers: data.getHeaders()};
    config.headers['Authorization'] = `Bearer ${userToken}`;

    // Very important await to ensure sequentiality
    await axios.post(environment.baseServerURL + environment.providerServiceURL + '/performance', data.getBuffer(), config)
  }
}
