import { Injectable } from '@nestjs/common';
import { AddressDto, CreateAddressDto } from 'src/model/addressDto';

@Injectable()
export class AddressService {

  async createAddress(newAdress: CreateAddressDto) {

    const url = `http://localhost:3000/api/addresses`

   const response = await fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(newAdress)
   });
   if (response.ok) {
     const data = await response.json();
     return data;
   } else {
     const error = await response.text();
     return new Error(error);
   }

 }

  async getAllAddresses(address: AddressDto) {
    const queryParams = new URLSearchParams(address as any).toString();
    
    const url = `http://localhost:3000/api/addresses?${queryParams}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
        
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      return new Error(error);
    }
  }

  async getAddressById(address: AddressDto, idAddress: string) {
    
    const url = `http://localhost:3000/api/addresses/${idAddress}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
        
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      return new Error(error);
    }
  }
}