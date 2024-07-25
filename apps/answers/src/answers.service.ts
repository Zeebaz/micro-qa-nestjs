import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Question)
    private answerRepo: Repository<Question>,
  ) {}
  async getAllAnswers(id: number) {
    const found = await this.answerRepo.find({ where: { questionId: id } });
    return found;
  }
}
