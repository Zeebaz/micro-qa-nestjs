import { Controller, Get } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @MessagePattern({ cmd: 'get-all-answers' })
  getAllAnswers(data: any) {
    return this.answersService.getAllAnswers(data.id);
  }
}
