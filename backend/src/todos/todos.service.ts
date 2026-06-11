import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    // Only copy fields that were actually sent, so optional DTO fields
    // (undefined) don't wipe existing values
    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }
    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }
    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }
}
