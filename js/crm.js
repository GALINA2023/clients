import { createClientsHeader } from "./header.js";
import { createClientsSection } from "./clientsSection.js";
import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientTable.js";
import { searchClients } from "./searchClient.js";



const createApp = async () => {
    const header = createClientsHeader();
    const clientsSection = createClientsSection();
    document.body.append(header, clientsSection.main);
    const preloader = document.querySelector('.preloader');
    const tableWrapper = document.querySelector('.clients__wrapper');

    try {
        tableWrapper.style.overflow = 'visible';
        const clients = await getClients();
        searchClients(clients);

        for (const client of clients) {
            setTimeout(() => document.querySelector('.clients__tbody').append(createClientItem(client)));
        }
    } catch (error) {

        console.log(error);

    } finally {
        preloader.remove();
        tableWrapper.style.ovwrflow = 'auto';
    }
}

createApp();
document.addEventListener('DOMContentLoaded', sortTable)
sortTable();

