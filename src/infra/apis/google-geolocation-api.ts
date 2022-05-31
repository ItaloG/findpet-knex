import { FindGeolocation, Position } from '../../data/protocols/find-geolocation'
import { CEP } from '../../domain/models/cep'
import axios from 'axios'
import dotenv from 'dotenv'
import { resolve } from 'path'

const dotenvFilePath = resolve(__dirname, '..', '..', '..', '.env-development')
dotenv.config({ path: dotenvFilePath })

export class GoogleGeolocationApi implements FindGeolocation<CEP> {
  async find (arg: CEP): Promise<Position> {
    const response = await axios({
      method: 'post',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?',
      params: {
        address: arg,
        key: process.env.GOOGLE_API_KEY
      }
    })
    return {
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng
    }
  }
}
