import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}
  async createQuestions(question: CreateQuestionDto) {
    const newQuestion = await this.questionRepo.create(question);
    const exists = await this.questionRepo.findOneBy(question);
    if (exists) {
      throw new ConflictException('Question title already exists');
    }
    try {
      await this.questionRepo.save(newQuestion);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return newQuestion;
  }
  async getAllQuestions() {
    return this.questionRepo.find();
  }
}
