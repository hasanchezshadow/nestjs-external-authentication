import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  private readonly FRONT_URL: string = process.env.FRONT_URL;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  @Redirect('', 302)
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('', 302)
  async googleLoginRedirect(@Req() req: Request): Promise<any> {
    const { user } = req;
    // todo save the user data in the database and returns the redirection url
    return { url: `${this.FRONT_URL}}` };
  }
}
