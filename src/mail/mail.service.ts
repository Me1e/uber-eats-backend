import { Inject, Injectable } from '@nestjs/common';
import * as FromData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from 'src/common/common.contants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FromData();
    form.append('from', `우버 이츠 <mailgun@${this.options.domain}>`);
    form.append('to', 'mele0404@naver.com');
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'ubereats', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
