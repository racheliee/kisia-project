import {
    BadRequestException,
    Controller,
    Get,
    Logger,
    Post,
    Query,
  } from '@nestjs/common';
  import { ModelService } from './model.service';
  
  @Controller('admin/model')
  export class ModelController {
    private readonly logger = new Logger(ModelController.name);
    constructor(private readonly modelService: ModelService) {}
  
    // test api
    @Get('test')
    async test() {
      return {
        statusCode: 200,
        message: 'Test successful',
      };
    }
  
    // confusion matrix logic
    @Get('confusion-matrix')
    async getConfusionMatrix(@Query('model') model?: string) {
      const validModels = ['url', 'dynamic', 'static'];
  
      if (model && !validModels.includes(model)) {
        this.logger.error(`Invalid model for confusion matrix: ${model}`);
        throw new BadRequestException(
          'Invalid model for confusion matrix. Must be url, dynamic, or static',
        );
      }
  
      try {
        this.logger.log(`Getting confusion matrix`);
  
        if (model) {
          return {
            statusCode: 200,
            message: 'Successfully retrieved confusion matrix',
            data: await this.modelService.getConfusionMatrix(model),
          };
        } else {
          return {
            statusCode: 200,
            message: 'Successfully retrieved confusion matrix',
            data: await this.modelService.getConfusionMatrix(),
          };
        }
      } catch (error) {
        this.logger.error(`Error getting confusion matrix`, error);
        throw new BadRequestException('Error getting confusion matrix');
      }
    }
  
    // confidence hit rate logic
    @Get('confidence-hit-rate')
    async getConfidenceHitRate() {
      try {
        this.logger.log(`Getting confidence hit rate`);
  
        return {
          statusCode: 200,
          message: 'Successfully retrieved confidence hit rate',
          data: await this.modelService.getConfidenceHitRate(),
        };
      } catch (error) {
        this.logger.error(`Error getting confidence hit rate`, error);
        throw new BadRequestException('Error getting confidence hit rate');
      }
    }
  }
  