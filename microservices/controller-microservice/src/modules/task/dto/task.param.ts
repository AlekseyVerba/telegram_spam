import { IsTaskExist } from '../../../validators/is-task-exist.validator';

export class TaskIdParam {
  @IsTaskExist()
  taskId: number;
}
