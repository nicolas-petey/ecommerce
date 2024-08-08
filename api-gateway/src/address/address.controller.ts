import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from 'src/model/addressDto';

@Controller('addresses')
export class AddressController {

  constructor(private service: AddressService) { }

  @Post()
  createAddress(@Body() newAddress: CreateAddressDto) {
    const userResponse = this.service.createAddress(newAddress);
    return userResponse;
  }

  @Get()
  async getAllAddresses(@Query() query: any) {
    const userResponse = await this.service.getAllAddresses(query);
    return userResponse;
  }

  @Get(':id')
  async getAddressById(@Param('id') id: string, @Query() query: any) {
    const userResponse = await this.service.getAddressById(query, id);
    return userResponse;
  }

}