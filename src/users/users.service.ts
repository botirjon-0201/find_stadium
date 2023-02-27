import { User } from './models/user.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll() {
    const users = await this.userModel.findAll();
    if (!users) throw new NotFoundException(`No any users`);

    const response = { users, message: `All users` };
    return response;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const response = { user, message: `User information` };
    return response;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const updatedUser = await this.userModel.update(
      { ...updateUserDto },
      {
        where: { id },
        returning: true,
      },
    );

    const response = {
      message: `User updated successfully`,
      user: updatedUser[1][0],
    };
    return response;
  }

  async updatePassword(id: number, passwordUserDto: PasswordUserDto) {
    const { password, new_password, confirm_new_password } = passwordUserDto;
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass)
      throw new UnauthorizedException(`Password is not correct`);

    if (new_password !== confirm_new_password)
      throw new BadRequestException(`Password and confirm not match`);

    const hashed_password = await bcrypt.hash(new_password, 7);
    const updatedUser = await this.userModel.update(
      { hashed_password },
      { where: { id: user.id }, returning: true },
    );

    const response = {
      message: `Password updated successfully`,
      user: updatedUser[1][0],
    };
    return response;
  }

  async activate(link: string) {
    const updatedUser = await this.userModel.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      },
    );

    const response = {
      message: `User activate successfully`,
      user: updatedUser[1][0],
    };
    return response;
  }

  async deactivate(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const updatedUser = await this.userModel.update(
      { is_active: false },
      {
        where: { id },
        returning: true,
      },
    );

    const response = {
      user: updatedUser[1][0],
      message: `User deactivate successfully`,
    };
    return response;
  }

  async isOwner(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const updatedUser = await this.userModel.update(
      { is_owner: !user.is_owner },
      {
        where: { id },
        returning: true,
      },
    );
    const response = { user: updatedUser[1][0], message: `User is_owner` };
    return response;
  }

  async remove(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);
    await this.userModel.destroy({ where: { id } });

    const response = { user: id, message: `User deleted successfully` };
    return response;
  }
}
