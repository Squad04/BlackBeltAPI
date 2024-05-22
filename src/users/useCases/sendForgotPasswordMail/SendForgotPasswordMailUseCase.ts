import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { ITokensRepository } from "@tokens/repositories/ITokensRepository";
import { addHours } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "@shared/errors/AppError";
import { transporter } from "@config/mail";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TokensRepository")
    private tokensRepository: ITokensRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist.");
    }

    const token = uuidv4();
    const expiresAt = addHours(new Date(), 1);

    await this.tokensRepository.create({
      userId: user.id,
      token,
      expiresAt,
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Password recovery",
        template: "forgotPassword",
        context: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      } as MailOptions);
    } catch (error) {
      console.log(error);
      throw new AppError("Error sending email.");
    }
  }
}
