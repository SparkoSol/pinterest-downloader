import axios from 'axios';

export class DownloadService {
  async create(url) {
    console.log((await axios.post('/pinterest', url)).data);
    return (await axios.post('/pinterest', url)).data;
  }
}
