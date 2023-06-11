import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { compare, genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll() {
    const users = await this.userModel.findAll({ include: { all: true } });
    if (!users) throw new NotFoundException('No any Users');

    const response = {
      users: users.map(this.getUserField),
      message: 'All Users',
    };
    return response;
  }

  async findOne(id: number) {
    const user = await this.findById(id);
    if (!user) throw new UnauthorizedException('User Not Found');

    const response = {
      user: this.getUserField(user),
      message: 'User Information',
    };
    return response;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    if (!user) throw new UnauthorizedException('User not found');

    const updatedUser = await this.userModel.update(
      { ...updateUserDto },
      { where: { id }, returning: true },
    );

    const response = {
      user: this.getUserField(updatedUser[1][0]),
      message: 'User information updated successfully!',
    };
    return response;
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) throw new UnauthorizedException('User not found');
    await this.userModel.destroy({ where: { id } });

    const response = { message: `This action removes a #${id} user` };
    return response;
  }

  async activate(link: string): Promise<any> {
    const updatedUser = await this.userModel.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    const response = {
      user: this.getUserField(updatedUser[1][0]),
      message: 'User activated successfully',
    };
    return response;
  }

  async deactivate(id: number): Promise<any> {
    const user = await this.findById(id);
    if (!user) throw new UnauthorizedException('User not found');

    const updatedUser = await this.userModel.update(
      { is_active: false },
      { where: { id }, returning: true },
    );

    const response = {
      user: this.getUserField(updatedUser[1][0]),
      message: 'User deactivated successfully',
    };
    return response;
  }

  async isOwner(id: number): Promise<any> {
    const user = await this.findById(id);
    if (!user) throw new UnauthorizedException('User not found');

    const updatedUser = await this.userModel.update(
      { is_owner: !user.is_owner },
      { where: { id }, returning: true },
    );

    const response = {
      user: this.getUserField(updatedUser[1][0]),
      message: 'User is_owner',
    };
    return response;
  }

  async updatePassword(id: number, passwordUserDto: PasswordUserDto) {
    const { password, new_password, confirm_new_password } = passwordUserDto;

    const user = await this.findById(id);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatchPass = await compare(password, user.password);
    if (!isMatchPass)
      throw new UnauthorizedException('Password is wrong, please try again');

    if (new_password !== confirm_new_password)
      throw new BadRequestException('Password and confirm password not match');

    const salt = await genSalt(10);
    const hashedPassword = await hash(new_password, salt);

    const updatedUser = await this.userModel.update(
      { password: hashedPassword },
      { where: { id: user.id }, returning: true },
    );

    const response = {
      user: this.getUserField(updatedUser[1][0]),
      message: 'Password updated successfully',
    };
    return response;
  }

  async findById(id: number): Promise<User | null> {
    return await this.userModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { phone },
      include: { all: true },
    });
  }

  getUserField(user: User) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      telegram_link: user.telegram_link,
      user_photo: user.user_photo,
      birthday: user.birthday,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
  }
}
